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
  scrollContainer: {
    flexGrow: 1,
    padding: 5,
  },
  buttonsBottomContainer: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
    justifyContent: "space-evenly",
  },
});

const BorderStyles = StyleSheet.create({
  cardBorder: {
    borderRadius: 10,
    shadowColor: "black",
    backgroundColor: "white",
    elevation: 3,
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
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
  textBold: {
    fontFamily: "VerdanaBold",
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 24,
    fontFamily: "Roboto",
  },
});

const Styles = {
  ...ContainerStyles,
  ...BorderStyles,
  ...TextStyles,
};

export default Styles;
