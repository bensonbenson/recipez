import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getRecipe } from "../api/getRecipe";
import { Recipe } from "../api/getRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { LoadingText } from "./LoadingText";

export const RecipePage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecipeUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipeUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const recipe: Recipe = await getRecipe(recipeUrl);
      setRecipe(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>recip-ez</h1>
      <TextField
        variant="outlined"
        label="recipe url"
        onChange={handleRecipeUrlChange}
        value={recipeUrl}
        disabled={isLoading}
      />
      <Button onClick={handleButtonClick} disabled={isLoading}>
        find recipe
      </Button>
      {isLoading && <LoadingText />}
      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
};
