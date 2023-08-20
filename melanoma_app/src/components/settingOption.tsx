import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";
import SettingsOptions from "../utils/SettingsOptions";
import {Picker} from "@react-native-picker/picker";

interface SettingOptionLinkProps {
  name: string;
  icon: React.ElementType;
  option: SettingsOptions;
}

export const SettingOptionLink = (props: SettingOptionLinkProps) => {
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
          <View style={[styles.nameContainer, Styles.horizontalContainer]}>
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

interface SettingOptionProps {
  name: string;
}

export const SettingBoolOption = (props: SettingOptionProps) => {
  return (
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{props.name}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Switch/>
          </View>
        </View>
  );
};

interface SettingPickOptionProps extends SettingOptionProps {
  dataOptions: number[];
}

export const SettingPickOption = (props: SettingPickOptionProps) => {
  const pickerOptions = props.dataOptions.map((val, index) => {
    return <Picker.Item label={val.toString()} value={val} key={index} />
  });
  return (
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{props.name}</Text>
          </View>
            <Picker style={styles.pickerContainer} mode="dropdown">
              {pickerOptions}
            </Picker>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...Styles.horizontalContainer,
  },
  debug: {
    backgroundColor: 'red',
  },
  nameContainer: {
    flex: 6,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  pickerContainer: {
    flex: 2.5,
  },
  name: {
    marginLeft: 5,
    ...Styles.textBody,
  },
});
