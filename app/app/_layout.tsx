import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {Slot, Stack} from "expo-router";
import ColorPallete from "../src/colorPallete";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [areFontsLoaded] = useFonts({
    Verdana: require("../assets/fonts/Verdana.ttf"),
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
      <Stack>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallete.background.ligthbg,
  },
});

export default RootLayout;

