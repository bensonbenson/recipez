const API_URL = "https://recipe-retriever-green.vercel.app";

export type Recipe = {
  title: string;
  ingredients: string[];
  instructions: string;
  yields?: string;
  total_time?: string;
};

export const getRecipe = async (recipeUrl: string): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/find-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: recipeUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return response.json();
};
