import "regenerator-runtime/runtime";
import axios from "axios";
require("dotenv").config();

const REST_URL = process.env.REST_URL;

const recipeList = document.getElementById("recipeList");

async function getRecipes() {
  try {
    const response = await axios.get(`${REST_URL}/users/1`);
    // console.log("data: ", response.data);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
}

async function loadRecipes() {
  const recipeData = await getRecipes();
  console.log("Data: ", recipeData);
  const recipeElement = document.createElement("li");
  //   ingredientElement.id = item.name;
  recipeElement.appendChild(document.createTextNode(recipeData[0].title));
  recipeList.appendChild(recipeElement);
}

loadRecipes();
