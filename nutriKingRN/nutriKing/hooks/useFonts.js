import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
  });
};
