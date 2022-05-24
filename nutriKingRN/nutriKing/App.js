import { useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import useFonts from "./hooks/useFonts";

import Item from "./components/Item";
import RecipeInput from "./components/RecipeInput";
import { storeRecipe } from "./util/http";
import { ViewRecipe } from "./components/ViewRecipe";

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [Recipes, setRecipes] = useState([]);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

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

  function startViewRecipeHandler() {
    setViewModalIsVisible(true);
  }

  function endViewRecipeHandler() {
    setViewModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Text style={styles.header}>Recipes</Text>
        <Button
          title="Add New Recipe"
          color="#3a3a3a"
          onPress={startAddRecipeHandler}
        />
        <RecipeInput
          visible={modalIsVisible}
          onAddRecipe={addRecipeHandler}
          onCancel={endAddRecipeHandler}
        />
        <ViewRecipe
          visible={viewModalIsVisible}
          onCancel={endViewRecipeHandler}
        />
        <View style={styles.RecipesContainer}>
          <FlatList
            data={Recipes}
            renderItem={(itemData) => {
              return (
                <Item
                  text={itemData.item.text}
                  id={itemData.item.id}
                  // onDeleteItem={deleteRecipeHandler}
                  onAccessItem={startViewRecipeHandler}
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
    color: "#333333",
    fontFamily: "Nunito-Light",
  },
  RecipesContainer: {
    flex: 5,
  },
  header: {
    fontSize: 28,
    fontFamily: "Nunito-Light",
    paddingBottom: 12,
  },
});
