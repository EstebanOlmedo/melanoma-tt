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
  horizontalContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
});

const BorderStyles = StyleSheet.create({
  cardBorder: {
    borderRadius: 10,
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 3,
  },
});

const TextStyles = StyleSheet.create({
  textCaption: {
    fontSize: 10,
    fontFamily: "Verdana",
    color: ColorPallete.text.ligthbg.body,
  },
  textWhite: {
    color: ColorPallete.text.darkbg.body,
  },
  textBody: {
    fontFamily: "Verdana",
    fontSize: 12,
    color: ColorPallete.text.ligthbg.body,
  },
});

const Styles = {
  ...ContainerStyles,
  ...BorderStyles,
  ...TextStyles,
};

export default Styles;
