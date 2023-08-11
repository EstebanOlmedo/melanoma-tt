import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";

interface MenubarOptionProps {
  title: string;
  icon: string;
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
      <TouchableOpacity style={Styles.centeredContainer}>
        <MenubarOptionIcon type={props.icon} />
        <Text style={[Styles.text4, Styles.textWhite]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Menubar = () => {
  return (
    <View style={[Styles.flexContainer, styles.container]}>
      <View style={[Styles.flexContainer, styles.dockContainer]}>
        <MenubarOption title="Seguimiento" icon="seguimiento" />
        <MenubarOption title="Ayuda" icon="ayuda" />
        <MenubarOption title="Agregar" icon="agregar" />
        <MenubarOption title="Ajustes" icon="ajustes" />
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
