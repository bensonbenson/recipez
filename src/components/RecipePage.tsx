import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { getRecipe } from "../api/getRecipe";
import { Recipe } from "../api/getRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { LoadingText } from "./LoadingText";
import { isValidUrl } from "../utils/utils";
import "../styles/RecipePage.css";

export const RecipePage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlError, setIsUrlError] = useState(false);
  const [requestError, setRequestError] = useState(false);

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
    if (value && !isValidUrl(value)) {
      setIsUrlError(true);
    } else {
      setIsUrlError(false);
    }
  };

  const handleRecipeSearch = async (urlToSearch?: string) => {
    const targetUrl = urlToSearch || recipeUrl;
    setIsLoading(true);
    setRequestError(false);
    try {
      const recipe: Recipe = await getRecipe(targetUrl);
      setRecipe(recipe);
    } catch (error) {
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
        <TextField
          variant="outlined"
          label="recipe url"
          onChange={handleRecipeUrlChange}
          value={recipeUrl}
          disabled={isLoading}
          error={isUrlError}
          helperText={isUrlError ? "invalid url" : ""}
          style={{ width: "100%" }}
        />
        <div className="findRecipeButtonContainer">
          <Button
            sx={{ textTransform: "lowercase" }}
            onClick={() => handleRecipeSearch()}
            disabled={isLoading}
            variant="contained"
            className="findRecipeButton"
          >
            give recipe
          </Button>
        </div>
      </form>
      {requestError && <h2>unsupported url!</h2>}
      {isLoading && <LoadingText />}
      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
};
