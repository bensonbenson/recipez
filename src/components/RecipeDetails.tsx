import { Recipe } from "../api/getRecipe";

type RecipeDetailsProps = {
  recipe: Recipe;
};

export const RecipeDetails = (props: RecipeDetailsProps) => {
  const { recipe } = props;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
};
