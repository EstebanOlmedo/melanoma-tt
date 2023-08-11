import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../colorPallete";
import { default as RemainderModel } from "../models/remainder";

interface RemainderProps {
  remainder: RemainderModel;
}

const Remainder = (props: RemainderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>{props.remainder.getLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorPallete.border.ligthbg,
    padding: 5,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginHorizontal: 5,
  },
});

export default Remainder;
