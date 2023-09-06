import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/button";
import AddPhotoSelector from "@/components/home/addPhotoSelector";
import Section from "@/components/section";
import Styles from "@/styles";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";
import { NEW_LESION_ID } from "@/utils/constants";
import { getLesions } from "@/utils/testData";

const PrediagnosisBody = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[Styles.centeredContainer, styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card]}>
        <Text>
          Toma una foto nueva o seleeciona dede tu galeria. La foto será
          analizada para detectar la posibilidad de cáncer de melanoma
        </Text>
        <Button
          onPress={() =>
            router.push({
              pathname: "/prediagnosis/",
            })
          }
          style={{ marginTop: 10 }}
          title="Agregar foto para evaluación"
        />
      </View>
      <AddPhotoSelector
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
    </View>
  );
};

const LesionBody = () => {
  const lesions = getLesions();
  const [selectedLesionId, setSelectedLesionId] = useState(lesions[0].id);

  const options = lesions.map((lesion) => {
    return (
      <Picker.Item label={lesion.name} value={lesion.id} key={lesion.id} />
    );
  });

  return (
    <View style={[Styles.centeredContainer, styles.topContainer]}>
      <View style={[Styles.cardBorder, styles.card]}>
        <Text>
          Toma una foto nueva para agregarla a tu registro de la lesión
          seleccionada, llevar un seguimiento de las lesiones sospechosas es
          importante para detectar el cáncer de melanoma en etapas tempranas
        </Text>
        <View style={styles.pickerContainer}>
          <View style={{ flex: 0.3 }}>
            <Text>Lesión:</Text>
          </View>
          <Picker
            style={Styles.flexContainer}
            selectedValue={selectedLesionId}
            onValueChange={setSelectedLesionId}
          >
            <Picker.Item label="Nueva lesión" value={NEW_LESION_ID} />
            {options}
          </Picker>
        </View>
        <Button
          style={{ marginTop: 10 }}
          title="Agregar foto a la lesión seleccionada"
          onPress={() =>
            router.push({
              pathname: "/photo/",
              params: {
                redirect: PhotoRedirectOptions.LESION,
                lesionId: selectedLesionId,
              },
            })
          }
        />
      </View>
    </View>
  );
};

const Add = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.prediagnosisContainer}>
        <Section
          title="Agregar foto para prediagnóstico"
          body={PrediagnosisBody}
        />
      </View>
      <View style={styles.lesionContainer}>
        <Section title="Agregar foto a lesión" body={LesionBody} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prediagnosisContainer: {
    flex: 1,
  },
  lesionContainer: {
    flex: 1,
  },
  pickerContainer: {
    marginTop: 10,
    width: "100%",
    ...Styles.horizontalContainer,
  },
  topContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  card: {
    padding: 10,
  },
});

export default Add;
