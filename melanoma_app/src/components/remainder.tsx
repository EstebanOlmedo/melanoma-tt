import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { default as RemainderModel } from "../models/remainder";
import Styles from "../styles";

interface RemainderProps {
  remainder: RemainderModel;
}

const Remainder = (props: RemainderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={Styles.textBody}>{props.remainder.getLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    ...Styles.horizontalContainer,
    ...Styles.cardBorder,
  },
});

export default Remainder;
