import { useFonts, Nunito_Light } from "@expo-google-fonts/nunito";
import { StyleSheet, View, Text } from "react-native";

function AppText() {
  return <Text style={styles.Text}></Text>;
}

export default AppText;

const styles = StyleSheet.create({
  Text: {
    color: "white",
    padding: 8,
    fontFamily: "Nunito-Light",
  },
});
