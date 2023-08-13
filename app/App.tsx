import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ColorPallete from "./src/colorPallete";
import Home from "./src/screens/home";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [areFontsLoaded] = useFonts({
    Verdana: require("./assets/fonts/Verdana.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <Home />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallete.background.ligthbg,
  },
});

export default App;
