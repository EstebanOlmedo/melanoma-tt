import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";

interface MenubarProps {
  onOptionPressed?: (pressedOption: string) => void;
}

interface MenubarOptionProps {
  title: string;
  icon: string;
  onPress: () => void;
}

interface MenubarOptionIconProps {
  type: string;
}

const MenubarOptionIcon = (props: MenubarOptionIconProps) => {
  switch (props.type) {
    case "ayuda":
      return (
        <Feather
          name="help-circle"
          size={25}
          color={ColorPallete.orange.ligth}
        />
      );
    case "seguimiento":
      return (
        <MaterialCommunityIcons
          name="file-search-outline"
          size={25}
          color={ColorPallete.skyblue.ligth}
        />
      );
    case "agregar":
      return (
        <Ionicons
          name="add-circle-outline"
          size={25}
          color={ColorPallete.pink.ligth}
        />
      );
    case "ajustes":
      return (
        <AntDesign name="setting" size={25} color={ColorPallete.green.ligth} />
      );
    default:
      return <></>;
  }
};

const MenubarOption = (props: MenubarOptionProps) => {
  return (
    <View style={Styles.centeredContainer}>
      <TouchableOpacity
        style={Styles.centeredContainer}
        onPress={() => props.onPress()}
      >
        <MenubarOptionIcon type={props.icon} />
        <Text style={[Styles.textCaption, Styles.textWhite]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Menubar = (props: MenubarProps) => {
  return (
    <View style={[Styles.flexContainer, styles.container]}>
      <View style={[Styles.flexContainer, styles.dockContainer]}>
        <MenubarOption
          title="Seguimiento"
          icon="seguimiento"
          onPress={() =>
            props.onOptionPressed ? props.onOptionPressed("follow-up") : null
          }
        />
        <MenubarOption
          title="Ayuda"
          icon="ayuda"
          onPress={() =>
            props.onOptionPressed ? props.onOptionPressed("help") : null
          }
        />
        <MenubarOption
          title="Agregar"
          icon="agregar"
          onPress={() =>
            props.onOptionPressed ? props.onOptionPressed("add") : null
          }
        />
        <MenubarOption
          title="Ajustes"
          icon="ajustes"
          onPress={() =>
            props.onOptionPressed ? props.onOptionPressed("settings") : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  dockContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: ColorPallete.black.normal,
  },
});

export default Menubar;
