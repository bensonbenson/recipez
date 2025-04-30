import axios from "axios";

const API_URL = "https://recipe-retriever-green.vercel.app";

export type Recipe = {
  title: string;
  ingredients: string[];
  instructions: string;
  yields?: string;
  total_time?: string;
};

export const getRecipe = async (recipeUrl: string) => {
  const requestBody = {
    url: recipeUrl,
  };

  try {
    const response = await axios.post(`${API_URL}/find-recipe`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const recipe: Recipe = response.data;
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};
