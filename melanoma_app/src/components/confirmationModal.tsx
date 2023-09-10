import { Modal, Text, View } from "react-native";

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
        <View style={[Styles.cardBorder, Styles.modalContainer]}>
          <Text style={Styles.textBody}>{props.message}</Text>
          <View style={[Styles.horizontalContainer, Styles.buttonsContainer]}>
            <Button title="Ok" onPress={() => props.onConfirmation?.()} />
            <Button
              title="Cancelar"
              onPress={() => props.onCancel?.()}
              color="black"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
