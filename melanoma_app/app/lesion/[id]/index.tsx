import { useLocalSearchParams, useNavigation } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";

import ColorPallete from "@/colorPallete";
import Button, { EditButton, SaveButton } from "@/components/button";
import CompareSelector from "@/components/lesion/compareSelector";
import PhotosOverview from "@/components/lesion/photosOverview";
import Section from "@/components/section";
import { default as PhotoModel } from "@/models/photo";
import Styles from "@/styles";
import { getLesions } from "@/utils/testData";

const LesionDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesionIndex = parseInt(id || "", 10);
  const lesions = getLesions();
  const lesion = lesions[lesionIndex];
  const navigation = useNavigation();
  const [photos, setPhotos] = useState<PhotoModel[]>(
    Platform.select({
      web: lesion.photos,
      default: [],
    })
  );
  const [name, setName] = useState(lesion.name);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: lesion.name,
      headerRight: () =>
        isEditing ? (
          <SaveButton onPress={() => setIsEditing(false)} />
        ) : (
          <EditButton onPress={() => setIsEditing(true)} />
        ),
      headerTitle: () => (
        <TextInput
          style={[Styles.textTitle, styles.blackColor]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
      ),
    });

    const unsubscribe = navigation.addListener("transitionEnd", (_e) => {
      setPhotos(lesion.photos);
    });

    return unsubscribe;
  }, [navigation, isEditing, name]);
  const Photos = () => {
    return PhotosOverview({ photos, isEditing });
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.photosContainer}>
        <Section title="Fotos" body={Photos} />
      </View>
      {!isEditing ? (
        <View
          style={[Styles.horizontalContainer, Styles.buttonsBottomContainer]}
        >
          <Button
            title="Comparar"
            color={ColorPallete.pink.dark}
            onPress={() => setModalVisible(true)}
          />
          <Button title="Agregar" color={ColorPallete.green.dark} />
        </View>
      ) : (
        <></>
      )}
      <CompareSelector
        onCancel={() => setModalVisible(false)}
        photos={photos}
        visible={modalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photosContainer: {
    flex: 1,
  },
  blackColor: {
    color: "black",
  },
});

export default LesionDetail;
