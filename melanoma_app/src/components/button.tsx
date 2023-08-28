import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";

import ColorPallete from "../colorPallete";
import Styles from "../styles";

interface BaseButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const EditButton = (props: BaseButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.editButton, props.style]}
      onPress={() => props.onPress?.()}
    >
      <Feather name="edit" size={24} color={ColorPallete.orange.normal} />
    </TouchableOpacity>
  );
};

export const SaveButton = (props: BaseButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.editButton, props.style]}
      onPress={() => props.onPress?.()}
    >
      <FontAwesome name="save" size={24} color={ColorPallete.green.normal} />
    </TouchableOpacity>
  );
};

interface ButtonProps extends BaseButtonProps {
  title: string;
  color: string;
}

const Button = (props: ButtonProps) => {
  const bgColor = { backgroundColor: props.color };
  return (
    <TouchableOpacity
      style={[bgColor, styles.container]}
      onPress={() => props.onPress?.()}
    >
      <Text style={[Styles.textBody, Styles.textWhite]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  color: ColorPallete.blue.dark,
};

const styles = StyleSheet.create({
  editButton: {
    ...Platform.select({
      web: {
        marginHorizontal: 16,
      },
    }),
  },
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    maxWidth: 200,
  },
});

export default Button;
