import { useState } from "react";
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

  const handleRecipeUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setRecipeUrl(value);
    if (value && !isValidUrl(value)) {
      setIsUrlError(true);
    } else {
      setIsUrlError(false);
    }
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    setRequestError(false);
    try {
      const recipe: Recipe = await getRecipe(recipeUrl);
      setRecipe(recipe);
    } catch (error) {
      setRequestError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="basePage">
      <h1>recip-ez</h1>
      <TextField
        variant="outlined"
        label="recipe url"
        onChange={handleRecipeUrlChange}
        value={recipeUrl}
        disabled={isLoading}
        error={isUrlError}
        helperText={isUrlError ? "invalid url" : ""}
      />
      <div className="findRecipeButtonContainer">
        <Button
          sx={{ textTransform: "lowercase" }}
          onClick={handleButtonClick}
          disabled={isLoading}
          variant="contained"
          className="findRecipeButton"
        >
          give recipe
        </Button>
      </div>
      {requestError && <h2>unsupported url!</h2>}
      {isLoading && <LoadingText />}
      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
};
