import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
  FlatList,
} from "react-native";

import RecipeItem from "./Item";

function RecipeInput(props) {
  const [enteredTitleText, setEnteredTitleText] = useState("");
  const [enteredIngredientText, setEnteredIngredientText] = useState("");
  const [enteredQtyText, setEnteredQtyText] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function titleInputHandler(enteredText) {
    setEnteredTitleText(enteredText);
  }

  function ingredientInputHandler(text) {
    setEnteredIngredientText(text);
  }

  function qtyInputHandler(input) {
    setEnteredQtyText(input);
  }

  function addIngredientHandler() {
    setIngredients((currentIngredients) => [
      ...currentIngredients,
      {
        name: enteredIngredientText,
        qty: enteredQtyText,
        id: Math.random().toString(),
      },
    ]);
    setEnteredIngredientText("");
    setEnteredQtyText("");
    console.log("submitted", ingredients);
  }

  function addRecipeHandler() {
    // addIngredientHandler();  tried to add any outstanding inputs to ingr array before sending, however async state change prevents this.
    const recipe = {
      name: enteredTitleText,
      ingredients: ingredients,
    };
    props.onAddRecipe(recipe);
    setEnteredTitleText("");
    setIngredients([]);
  }

  function deleteRecipeHandler(id) {
    setIngredients((currentIngredients) => {
      return currentIngredients.filter((Ingredient) => Ingredient.id !== id);
    });
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/lunch.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course Recipe!"
          onChangeText={titleInputHandler}
          value={enteredTitleText}
        />

        <View style={styles.ingredientsContainer}>
          <FlatList
            data={ingredients}
            renderItem={(itemData) => {
              return (
                <RecipeItem
                  text={itemData.item.qty + " " + itemData.item.name}
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
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredientInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Add your ingredients!"
              onChangeText={ingredientInputHandler}
              value={enteredIngredientText}
            />
          </View>
          <View style={styles.qtyInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Add your quantity"
              onChangeText={qtyInputHandler}
              value={enteredQtyText}
            />
          </View>
          <View style={styles.addIngredientButton}>
            <View style={styles.button}>
              <Button
                title="Add Ingredient"
                onPress={addIngredientHandler}
                color="#c98811"
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#504099" />
          </View>
          <View style={styles.button}>
            <Button
              title="Add Recipe"
              onPress={addRecipeHandler}
              color="#2e714e"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default RecipeInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a2e34",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    margin: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 16,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  ingredientsContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  qtyInput: {
    flex: 2,
    margin: 16,
  },
  ingredientInput: {
    flex: 4,
    margin: 16,
  },
  addIngredientButton: {
    flex: 1,
    margin: 16,
  },
});