import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  Modal,
  Image,
  FlatList,
} from "react-native";

export function ViewRecipe(props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View>
        <Text>Whats up</Text>
        <View style={styles.button}>
          <Button title="Cancel" onPress={props.onCancel} color="#504099" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a2e34",
  },
  button: {
    width: 100,
    marginHorizontal: 6,
  },
});
