import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";

import { default as RemainderModel } from "../../../models/remainder";
import Styles from "../../../styles";
import Button from "../../button";
import ConfirmationModal from "../../confirmationModal";

import ColorPallete from "@/colorPallete";

interface RemainderProps {
  remainder: RemainderModel;
}

const Remainder = (props: RemainderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const isOverdue = props.remainder.date <= new Date();

  return (
    <View style={[styles.container, isOverdue ? styles.warningStyle : {}]}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={Styles.textBody}>{props.remainder.getLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
        <Entypo name="cross" size={20} color="black" />
      </TouchableOpacity>
      <Modal
        transparent
        animationType="slide"
        hardwareAccelerated
        visible={isModalVisible}
      >
        <View style={Styles.centeredContainer}>
          <View style={[Styles.cardBorder, Styles.modalContainer]}>
            <Text
              style={Styles.textBody}
            >{`Es hora de agregar un nuevo registro a ${props.remainder.lesion}`}</Text>
            <View style={[Styles.horizontalContainer, Styles.buttonsContainer]}>
              <Button
                title="Aplazar"
                onPress={() => setIsModalVisible(false)}
              />
              <Button title="Descartar" />
            </View>
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        visible={isDeleteModalVisible}
        message="¿Estas seguro que deseas descartar el recordatorio?"
        onCancel={() => setIsDeleteModalVisible(false)}
      />
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
    borderColor: ColorPallete.skyblue.normal,
    borderWidth: 3,
    // backgroundColor: ColorPallete.orange.ligth,
  },
});

export default Remainder;
