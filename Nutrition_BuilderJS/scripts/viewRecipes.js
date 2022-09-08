import "regenerator-runtime/runtime";
import axios from "axios";
require("dotenv").config();

const REST_URL = process.env.REST_URL;

const recipeList = document.getElementById("recipeList");

async function getRecipes() {
  try {
    const response = await axios.get(`${REST_URL}/recipe`);
    // console.log("data: ", response.data);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
}

async function loadRecipes() {
  const recipeData = await getRecipes();
  console.log("Data: ", recipeData);
  //   ingredientElement.id = item.name;
  for (var i = 0; i < recipeData.length; i++) {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipeCard");
    const recipeName = document.createElement("h2");
    recipeName.classList.add("recipeName");
    var title = document.createTextNode(recipeData[i].name);
    recipeName.appendChild(title);
    // recipeName.classList.add("recipeTitle");
    const ingredientElement = document.createElement("p");
    ingredientElement.classList.add("ingredients");
    const subtitle = document.createTextNode("Ingredients: ");
    ingredientElement.appendChild(subtitle);
    var content = recipeData[i].name + "<br> Ingredients: <br>";
    for (var j = 0; j < recipeData[i].ingredients.length; j++) {
      const ingredient = document.createTextNode(
        recipeData[i].ingredients[j].qty +
          " " +
          recipeData[i].ingredients[j].unit +
          " " +
          recipeData[i].ingredients[j].name +
          " "
      );
      var br = document.createElement("br");
      ingredientElement.appendChild(br);
      ingredientElement.appendChild(ingredient);

      content +=
        recipeData[i].ingredients[j].qty +
        " " +
        recipeData[i].ingredients[j].unit +
        " " +
        recipeData[i].ingredients[j].name +
        " ";
    }
    const nutritionElement = document.createElement("p");
    nutritionElement.classList.add("nutrition");
    subtitle = document.createTextNode("Nutrition: ");
    var data = document.createTextNode(
      "Calories: " +
        recipeData[i].nutrition.calories +
        " Carbs(g): " +
        recipeData[i].nutrition.carbohydrates_total_g +
        " Protein(g): " +
        recipeData[i].nutrition.protein_g +
        " Total Fat(g): " +
        recipeData[i].nutrition.fat_total_g +
        " Saturated Fat(g): " +
        recipeData[i].nutrition.fat_saturated_g +
        " Fiber(g): " +
        recipeData[i].nutrition.fiber_g +
        " Cholesterol(mg): " +
        recipeData[i].nutrition.cholesterol_mg
    );
    nutritionElement.append(subtitle, data);
    content +=
      "<br> Nutrition: <br> " +
      "Calories: " +
      recipeData[i].nutrition.calories +
      " Carbs(g): " +
      recipeData[i].nutrition.carbohydrates_total_g +
      " Protein(g): " +
      recipeData[i].nutrition.protein_g +
      " Total Fat(g): " +
      recipeData[i].nutrition.fat_total_g +
      " Saturated Fat(g): " +
      recipeData[i].nutrition.fat_saturated_g +
      " Fiber(g): " +
      recipeData[i].nutrition.fiber_g +
      " Cholesterol(mg): " +
      recipeData[i].nutrition.cholesterol_mg;
    // recipeElement.innerHTML = content;
    recipeElement.append(recipeName, ingredientElement, nutritionElement);
    recipeList.appendChild(recipeElement);
  }
}

loadRecipes();
