import { StyleSheet, View, Text, Pressable } from "react-native";
// import AppText from "./AppText";

function Item(props) {
  return (
    <View style={styles.Item}>
      <Pressable
        android_ripple={{ color: "#dddddd" }}
        // onPress={props.onDeleteItem.bind(this, props.id)}
        onPress={props.onAccessItem}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.Text}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
  Item: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#dadada",
  },
  pressedItem: {
    opacity: 0.5,
  },
  Text: {
    color: "#333333",
    padding: 8,
    fontFamily: "Nunito-Light",
  },
});
