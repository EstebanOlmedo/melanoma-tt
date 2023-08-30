import { Picker } from "@react-native-picker/picker";
import { Modal, StyleSheet, Text, View } from "react-native";

import Photo from "../../models/photo";
import Styles from "../../styles";
import Button from "../button";

interface CompareSelectorProps {
  visible: boolean;
  onCancel: () => void;
  onCompare: () => void;
  photos: Photo[];
}

const CompareSelector = (props: CompareSelectorProps) => {
  const options = props.photos.map((photo, index) => {
    return (
      <Picker.Item
        label={photo.createdOn.toLocaleString()}
        value={photo.localId}
        key={index}
      />
    );
  });

  return (
    <Modal
      transparent
      animationType="slide"
      hardwareAccelerated
      visible={props.visible}
    >
      <View style={Styles.centeredContainer}>
        <View style={[Styles.cardBorder, styles.container]}>
          <View style={styles.dropdownsContainer}>
            <View style={styles.pickerContainer}>
              <View style={Styles.flexContainer}>
                <Text>Antes:</Text>
              </View>
              <Picker style={styles.pickOption} mode="dialog">
                {options}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <View style={Styles.flexContainer}>
                <Text>Despues:</Text>
              </View>
              <Picker style={styles.pickOption} mode="dialog">
                {options}
              </Picker>
            </View>
          </View>
          <View style={[Styles.horizontalContainer, styles.buttonsContainer]}>
            <Button title="Cancelar" color="black" onPress={props.onCancel} />
            <Button title="Comparar" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    margin: 20,
  },
  dropdownsContainer: {
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    ...Styles.horizontalContainer,
  },
  buttonsContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent: "space-evenly",
    alignSelf: "flex-start",
  },
  pickOption: {
    flex: 3,
  },
});

export default CompareSelector;
