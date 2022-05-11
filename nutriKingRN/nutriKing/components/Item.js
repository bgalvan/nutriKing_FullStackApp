import { StyleSheet, View, Text, Pressable } from "react-native";

function Item(props) {
  return (
    <View style={styles.Item}>
      <Pressable
        android_ripple={{ color: "#dddddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
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
    backgroundColor: "#9b2f27",
  },
  pressedItem: {
    opacity: 0.5,
  },
  Text: {
    color: "white",
    padding: 8,
  },
});
