import { StyleSheet } from "react-native";

import ColorPallete from "./colorPallete";

const ContainerStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const TextStyles = StyleSheet.create({
  text4: {
    fontSize: 10,
    fontFamily: "Verdana",
    color: ColorPallete.text.ligthbg.body,
  },
  textWhite: {
    color: ColorPallete.text.darkbg.body,
  },
});

const Styles = {
  ...ContainerStyles,
  ...TextStyles,
};

export default Styles;
