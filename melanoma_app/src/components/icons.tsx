import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import ColorPallete from "../colorPallete";

export const NotificationIcon = () => {
  return (
    <Ionicons
      name="notifications-circle"
      size={24}
      color={ColorPallete.orange.normal}
    />
  );
};

export const PrivacyIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <Ionicons
        name="shield"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.blue.normal}
      />
    </View>
  );
};

export const SecurityIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <Entypo
        name="lock-open"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.pink.normal}
      />
    </View>
  );
};

export const InfoIcon = () => {
  return (
    <View style={styles.relativeContainer}>
      <MaterialIcons
        name="info-outline"
        size={13}
        color="white"
        style={styles.centeredIcon}
      />
      <MaterialIcons
        name="stop-circle"
        size={24}
        color={ColorPallete.green.normal}
      />
    </View>
  );
};

export const NotificationCardIcon = () => {
  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color={ColorPallete.skyblue.dark}
    />
  );
};

export const PhotoCardIcon = () => {
  return <FontAwesome name="photo" size={24} color={ColorPallete.green.dark} />;
};

export const PrediagnosisCardIcon = () => {
  return (
    <FontAwesome name="search" size={24} color={ColorPallete.orange.dark} />
  );
};

export const FollowupCardIcon = () => {
  return (
    <MaterialCommunityIcons
      name="file-search-outline"
      size={25}
      color={ColorPallete.pink.dark}
    />
  );
};

const styles = StyleSheet.create({
  relativeContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  centeredIcon: {
    position: "absolute",
    zIndex: 99,
  },
});
