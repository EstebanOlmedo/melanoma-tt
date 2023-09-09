import { Modal, StyleSheet, Text, View } from "react-native";

import Button from "./button";

import Styles from "@/styles";

interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  onConfirmation?: () => void;
  onCancel?: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <View style={[Styles.cardBorder, styles.modalContainer]}>
          <Text style={Styles.textBody}>{props.message}</Text>
          <View style={[Styles.horizontalContainer, styles.buttonsContainer]}>
            <Button title="Ok" onPress={() => props.onConfirmation?.()} />
            <Button title="Cancelar" onPress={() => props.onCancel?.()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ConfirmationModal;
