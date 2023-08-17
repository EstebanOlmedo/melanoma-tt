import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";
import {Link} from "expo-router";
import SettingsOptions from "../utils/SettingsOptions";

interface SettingOptionProps {
  name: string;
  icon: React.ElementType;
  option: SettingsOptions;
}

const SettingOption = (props: SettingOptionProps) => {
  const Icon = props.icon;
  const RouterHref = {
    pathname: "/settings/[option]",
    params: {
      option: props.option,
    },
  };

  return (
    <Link href={RouterHref} asChild>
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Icon />
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo
            name="chevron-thin-right"
            size={20}
            color={ColorPallete.border.dark}
          />
        </View>
      </View>
    </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...Styles.horizontalContainer,
  },
  debug: {},
  nameContainer: {
    flex: 6,
    ...Styles.horizontalContainer,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  name: {
    marginLeft: 5,
    ...Styles.textBody,
  },
});

export default SettingOption;
