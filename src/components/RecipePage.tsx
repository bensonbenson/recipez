import { useState, useEffect } from "react";
import { getRecipe, Recipe } from "../api/getRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { LoadingText } from "./LoadingText";
import { isValidUrl } from "../utils/utils";
import { useWakeLock, wakeLockSupported } from "../hooks/useWakeLock";
import "../styles/RecipePage.css";

const updateUrlQuery = (url: string) => {
  const currentUrl = new URL(window.location.href);
  if (url.trim()) {
    currentUrl.searchParams.set('recipeUrl', url);
  } else {
    currentUrl.searchParams.delete('recipeUrl');
  }
  window.history.replaceState({}, '', currentUrl.toString());
};

const getUrlFromQuery = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('recipeUrl') || '';
};

export const RecipePage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlError, setIsUrlError] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [keepAwake, setKeepAwake] = useWakeLock();

  useEffect(() => {
    const urlFromQuery = getUrlFromQuery();
    if (urlFromQuery) {
      setRecipeUrl(urlFromQuery);
      if (isValidUrl(urlFromQuery)) {
        handleRecipeSearch(urlFromQuery);
      }
    }
  }, []);

  const handleRecipeUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setRecipeUrl(value);
    updateUrlQuery(value);
    setIsUrlError(!!value && !isValidUrl(value));
  };

  const handleRecipeSearch = async (urlToSearch?: string) => {
    const targetUrl = urlToSearch || recipeUrl;
    setIsLoading(true);
    setRequestError(false);
    try {
      setRecipe(await getRecipe(targetUrl));
    } catch {
      setRequestError(true);
    }

    setIsLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleRecipeSearch();
  }

  return (
    <div className="basePage">
      <h1>recip-ez</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipeUrl" className="urlLabel">recipe url</label>
        <input
          id="recipeUrl"
          type="text"
          inputMode="url"
          onChange={handleRecipeUrlChange}
          value={recipeUrl}
          disabled={isLoading}
          aria-invalid={isUrlError}
          aria-describedby={isUrlError ? "recipeUrlError" : undefined}
        />
        {isUrlError && <p id="recipeUrlError" className="urlError">invalid url</p>}
        <div className="findRecipeButtonContainer">
          <button type="submit" disabled={isLoading || !isValidUrl(recipeUrl)} className="findRecipeButton">
            give recipe
          </button>
        </div>
      </form>
      {requestError && <h2>unsupported url!</h2>}
      {isLoading && <LoadingText />}
      {recipe && (
        <>
          {wakeLockSupported && (
            <label className="keepAwake">
              <input
                type="checkbox"
                role="switch"
                checked={keepAwake}
                onChange={(e) => setKeepAwake(e.target.checked)}
              />
              keep screen on
            </label>
          )}
          <RecipeDetails recipe={recipe} />
        </>
      )}
    </div>
  );
};
