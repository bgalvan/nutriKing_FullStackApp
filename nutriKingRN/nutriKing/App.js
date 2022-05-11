import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import Item from "./components/Item";
import RecipeInput from "./components/RecipeInput";
import { storeRecipe } from "./util/http";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [Recipes, setRecipes] = useState([]);

  function startAddRecipeHandler() {
    setModalIsVisible(true);
  }

  function endAddRecipeHandler() {
    setModalIsVisible(false);
  }

  function addRecipeHandler(recipe) {
    console.log("logged", recipe);

    setRecipes((currentRecipes) => [
      ...currentRecipes,
      { text: recipe.name, id: Math.random().toString() },
    ]);
    storeRecipe(recipe);
    console.log("Total", Recipes);
    endAddRecipeHandler();
  }

  function deleteRecipeHandler(id) {
    setRecipes((currentRecipes) => {
      return currentRecipes.filter((Recipe) => Recipe.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Recipe"
          color="#49b1a3"
          onPress={startAddRecipeHandler}
        />
        <RecipeInput
          visible={modalIsVisible}
          onAddRecipe={addRecipeHandler}
          onCancel={endAddRecipeHandler}
        />
        <View style={styles.RecipesContainer}>
          <FlatList
            data={Recipes}
            renderItem={(itemData) => {
              return (
                <Item
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteRecipeHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  RecipesContainer: {
    flex: 5,
  },
});
