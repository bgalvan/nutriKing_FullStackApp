import axios from "axios";

export function storeRecipe(recipeData) {
  axios.post("http://localhost:3001/recipes", recipeData);
}
