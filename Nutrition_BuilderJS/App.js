import "regenerator-runtime/runtime";
import axios from "axios";

//my code
const RESTAPI_URL = "https://localhost/3001";
// const NINJA_URL = "66bZo5YIpvKhFpDZBZGEXg==DFUYD4LespAwZPwk";

var ingredientArray = [];
//consider having nutrition data stored locally so you don't call api every time we add or remove ingredient
// var nutrition = [];

//function that updates
const mymain = async () => {
  // updateIngredients(await getIngredients());
};
mymain();

export const addTodoItem = async (todo) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, todo);
    const newTodoItem = response.data;

    console.log(`Added a new Todo!`, newTodoItem);

    return newTodoItem;
  } catch (errors) {
    console.error(errors);
  }
};

const createIngredientElement = (item) => {
  const ingredientElement = document.createElement("li");

  ingredientElement.appendChild(document.createTextNode(item.name));

  return ingredientElement;
};

//initalize the ingredient list object
const ingredientList = document.getElementById("ingredientList");
//initialize the recipe list displayed in html
const recipeList = document.getElementById("recipeList");

//add ingredients to display and to array
const addIngredient = (ingredient) => {
  ingredientList.appendChild(createIngredientElement(ingredient));
  ingredientArray.push(ingredient);
};

const ingredientForm = document.getElementById("form2");
ingredientForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector("#ingredient").value;
  const qty = document.querySelector("#qty").value;
  const ingredient = {
    name: name,
    qty: qty,
  };
  console.log("name: ", name);
  console.log("qty: ", qty);
  addIngredient(ingredient);
  // getData(ingredientArray);
});

//form for recipe builder
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

const submitRecipe = (recipe) => {
  const recipeElement = document.createElement("li");
  recipeElement.appendChild(document.createTextNode(recipe.name));
  recipeList.appendChild(recipeElement);
  //send to api
  //store recipe in REST server(until db is setup)
  ingredientArray = [];
  getNutrition(recipe);
};

//HTTP

//get data from calorieninja api for recipe
const getData = async (ingredients) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/recipes",
      ingredients,
      { crossDomain: true }
    );

    const nutrition = response.data;

    // console.log("POST: nutrition response", nutrition);

    return nutrition;
  } catch (errors) {
    console.log(errors);
  }
};

function getNutrition(recipeData) {
  axios
    .post("http://nutriclient:3001/recipes", recipeData)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => console.log(error));
}
