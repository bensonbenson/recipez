import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getRecipe } from "../api/getRecipe";
import { Recipe } from "../api/getRecipe";
import { RecipeDetails } from "./RecipeDetails";

export const RecipePage = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const handleRecipeUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipeUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const recipe: Recipe = await getRecipe(recipeUrl);
      setRecipe(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  return (
    <div>
      <h1>recip-ez</h1>
      <TextField
        variant="outlined"
        label="recipe url"
        onChange={handleRecipeUrlChange}
        value={recipeUrl}
      />
      <Button onClick={handleButtonClick}>find recipe</Button>
      {recipe && <RecipeDetails recipe={recipe} />}
    </div>
  );
};
