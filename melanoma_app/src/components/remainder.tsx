import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";

import Button from "./button";
import { default as RemainderModel } from "../models/remainder";
import Styles from "../styles";

import ColorPallete from "@/colorPallete";

interface RemainderProps {
  remainder: RemainderModel;
}

const Remainder = (props: RemainderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isOverdue = props.remainder.date <= new Date();

  return (
    <View style={[styles.container, isOverdue ? styles.warningStyle : {}]}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={Styles.textBody}>{props.remainder.getLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
      <Modal
        transparent
        animationType="slide"
        hardwareAccelerated
        visible={isModalVisible}
      >
        <View style={Styles.centeredContainer}>
          <View style={[Styles.cardBorder, styles.modalContainer]}>
            <Text
              style={Styles.textBody}
            >{`Es hora de agregar un nuevo registro a ${props.remainder.lesion}`}</Text>
            <View style={[Styles.horizontalContainer, styles.buttonsContainer]}>
              <Button
                title="Aplazar"
                onPress={() => setIsModalVisible(false)}
              />
              <Button title="Descartar" />
            </View>
          </View>
        </View>
      </Modal>
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
  warningStyle: {
    borderColor: ColorPallete.orange.normal,
    borderWidth: 3,
    // backgroundColor: ColorPallete.orange.ligth,
  },
  modalContainer: {
    padding: 30,
    margin: 20,
  },
  buttonsContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: "space-evenly",
    alignSelf: "flex-start",
  },
});

export default Remainder;
