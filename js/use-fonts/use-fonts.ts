import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as React from "react";

export const useFonts = () => {
  const [fontsReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    }
    loadFonts();
  }, []);
  return fontsReady;
};
