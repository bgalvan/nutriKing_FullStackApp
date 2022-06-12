import "regenerator-runtime/runtime";
import axios from "axios";
require("dotenv").config();

const REST_URL = process.env.REST_URL;

var ingredientArray = [];
// var recipeArray = [];
var recipeNutrition = {
  calories: 0,
  carbohydrates_total_g: 0,
  cholesterol_mg: 0,
  fat_saturated_g: 0,
  fat_total_g: 0,
  fiber_g: 0,
  potassium_mg: 0,
  protein_g: 0,
  serving_size_g: 0,
  sodium_mg: 0,
};

//function that updates
const mymain = async () => {
  // console.log(REST_URL);
};
mymain();

//initalize dynamic html data elements
const ingredientList = document.getElementById("ingredientList");

const nutritionInfo = document.getElementById("nutrition");

//handle ingredient part of form
const ingredientForm = document.getElementById("form2");
ingredientForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#ingredient").value;
  const qty = document.querySelector("#qty").value;
  const unit = document.querySelector("#unit").value;
  const ingredient = {
    name: name,
    qty: qty,
    unit: unit,
    nutrition: "",
  };
  addIngredient(ingredient);
  document.querySelector("#ingredient").value = "";
  document.querySelector("#qty").value = "";
});

//handle complete recipe form
const recipeForm = document.getElementById("form1");
recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const recipe = {
    name: name,
    ingredients: ingredientArray,
  };
  submitRecipe(recipe);
});

const createIngredientElement = (item) => {
  const ingredientElement = document.createElement("li");
  ingredientElement.id = item.name;
  ingredientElement.appendChild(
    document.createTextNode(item.qty + " " + item.unit + " " + item.name)
  );
  // // ingredientElement.outerHTML = "<div id=";
  return ingredientElement;
};

// adds nutrition from each ingredient into a sum object
function updateNutrition() {
  recipeNutrition.calories = 0;
  recipeNutrition.carbohydrates_total_g = 0;
  recipeNutrition.cholesterol_mg = 0;
  recipeNutrition.fat_saturated_g = 0;
  recipeNutrition.fat_total_g = 0;
  recipeNutrition.fiber_g = 0;
  recipeNutrition.protein_g = 0;
  recipeNutrition.serving_size_g = 0;
  recipeNutrition.sodium_mg = 0;
  recipeNutrition.potassium_mg = 0;
  for (var i = 0; i < ingredientArray.length; i++) {
    recipeNutrition.calories += Math.round(
      ingredientArray[i].nutrition.calories
    );
    recipeNutrition.carbohydrates_total_g += Math.round(
      ingredientArray[i].nutrition.carbohydrates_total_g
    );
    recipeNutrition.cholesterol_mg += Math.round(
      ingredientArray[i].nutrition.cholesterol_mg
    );
    recipeNutrition.fat_saturated_g += Math.round(
      ingredientArray[i].nutrition.fat_saturated_g
    );
    recipeNutrition.fat_total_g += Math.round(
      ingredientArray[i].nutrition.fat_total_g
    );
    recipeNutrition.fiber_g += Math.round(ingredientArray[i].nutrition.fiber_g);
    recipeNutrition.potassium_mg += Math.round(
      ingredientArray[i].nutrition.potassium_mg
    );
    recipeNutrition.protein_g += Math.round(
      ingredientArray[i].nutrition.protein_g
    );
    recipeNutrition.serving_size_g += Math.round(
      ingredientArray[i].nutrition.serving_size_g
    );
    recipeNutrition.sodium_mg += Math.round(
      ingredientArray[i].nutrition.sodium_mg
    );
  }
}

const incrementNutrition = (nutrition) => {
  recipeNutrition.calories += Math.round(nutrition.calories);
  recipeNutrition.carbohydrates_total_g += Math.round(
    nutrition.carbohydrates_total_g
  );
  recipeNutrition.cholesterol_mg += Math.round(nutrition.cholesterol_mg);
  recipeNutrition.fat_saturated_g += Math.round(nutrition.fat_saturated_g);
  recipeNutrition.fat_total_g += Math.round(nutrition.fat_total_g);
  recipeNutrition.fiber_g += Math.round(nutrition.fiber_g);
  recipeNutrition.potassium_mg += Math.round(nutrition.potassium_mg);
  recipeNutrition.protein_g += Math.round(nutrition.protein_g);
  recipeNutrition.serving_size_g += Math.round(nutrition.serving_size_g);
  recipeNutrition.sodium_mg += Math.round(nutrition.sodium_mg);
};

const decrementNutrition = (nutrition) => {
  recipeNutrition.calories -= Math.round(nutrition.calories);
  recipeNutrition.carbohydrates_total_g -= Math.round(
    nutrition.carbohydrates_total_g
  );
  recipeNutrition.cholesterol_mg -= Math.round(nutrition.cholesterol_mg);
  recipeNutrition.fat_saturated_g -= Math.round(nutrition.fat_saturated_g);
  recipeNutrition.fat_total_g -= Math.round(nutrition.fat_total_g);
  recipeNutrition.fiber_g -= Math.round(nutrition.fiber_g);
  recipeNutrition.potassium_mg -= Math.round(nutrition.potassium_mg);
  recipeNutrition.protein_g -= Math.round(nutrition.protein_g);
  recipeNutrition.serving_size_g -= Math.round(nutrition.serving_size_g);
  recipeNutrition.sodium_mg -= Math.round(nutrition.sodium_mg);
};

function displayNutrition() {
  var message =
    "Calories: " +
    recipeNutrition.calories +
    " Carbs: " +
    recipeNutrition.carbohydrates_total_g +
    " Protein: " +
    recipeNutrition.protein_g +
    " Total Fat: " +
    recipeNutrition.fat_total_g +
    " Saturated Fat: " +
    recipeNutrition.fat_saturated_g +
    " Fiber: " +
    recipeNutrition.fiber_g +
    " Cholesterol: " +
    recipeNutrition.cholesterol_mg +
    " Potassium: " +
    recipeNutrition.potassium_mg +
    " Sodium: " +
    recipeNutrition.sodium_mg;
  nutritionInfo.innerHTML = message;
}

const addIngredient = async (ingredient) => {
  ingredientList.appendChild(createIngredientElement(ingredient));
  const nutritionData = await getIngredientNutrition(ingredient);
  var nutriObj = JSON.parse(nutritionData);
  ingredient.nutrition = nutriObj.items[0];
  ingredientArray.push(ingredient);
  incrementNutrition(ingredient.nutrition);
  displayNutrition();
  console.log("Children: ", ingredientList.children);
  document
    .getElementById(ingredient.name)
    .addEventListener("click", function () {
      removeIngredient(ingredient);
    });
  console.log("array: ", ingredientArray);
};

function removeIngredient(ingredient) {
  document.getElementById(ingredient.name).remove();
  var index = ingredientArray.indexOf(ingredient);
  console.log("index: ", index);
  ingredientArray.splice(index, 1);
  decrementNutrition(ingredient.nutrition);
  displayNutrition();
  console.log("array: ", ingredientArray);
}

const submitRecipe = (recipe) => {
  // const recipeElement = document.createElement("li");
  // recipeElement.appendChild(document.createTextNode(recipe.name));
  // recipeList.appendChild(recipeElement);
  //store recipe in REST server(until db is setup)
  // recipeArray.push(recipe);
  sendRecipe(recipe);
  ingredientArray = [];
  recipeNutrition.calories = 0;
  recipeNutrition.carbohydrates_total_g = 0;
  recipeNutrition.cholesterol_mg = 0;
  recipeNutrition.fat_saturated_g = 0;
  recipeNutrition.fat_total_g = 0;
  recipeNutrition.fiber_g = 0;
  recipeNutrition.protein_g = 0;
  recipeNutrition.serving_size_g = 0;
  recipeNutrition.sodium_mg = 0;
  recipeNutrition.potassium_mg = 0;
};

//HTTP

//get data from calorieninja api for recipe

function getRecipeNutrition(recipeData) {
  axios
    .post(`${REST_URL}/recipes`, recipeData)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}

async function getIngredientNutrition(recipeData) {
  try {
    const response = await axios.post(`${REST_URL}/ingredient`, recipeData);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
}

async function sendRecipe(recipeData) {
  try {
    const response = await axios.post(`${REST_URL}/users/1`, recipeData);
    console.log("response: ", response);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
}

// async function getIngredientNutrition(recipeData) {
//   return await axios
//     .post("http://nutriclient:3001/ingredient", recipeData)
//     .then((res) => {
//       console.log(res);
//       console.log(res.data);
//       (res) => res.data;
//       // nutrition.push(res.data);
//       // console.log("nutrition", nutrition);
//     })
//     .catch((error) => console.log(error));
// }

// export const addTodoItem = async (todo) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/todos`, todo);
//     const newTodoItem = response.data;

//     console.log(`Added a new Todo!`, newTodoItem);

//     return newTodoItem;
//   } catch (errors) {
//     console.error(errors);
//   }
// };
