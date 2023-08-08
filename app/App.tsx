import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Home />
    </SafeAreaProvider>
  );
};

export default App;
