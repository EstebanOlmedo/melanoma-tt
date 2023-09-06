import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native";

import Alert from "@/Alert";
import ColorPallete from "@/colorPallete";
import Button, { EditButton, SaveButton } from "@/components/button";
import CompareSelector from "@/components/lesion/compareSelector";
import PhotosOverview from "@/components/lesion/photosOverview";
import Section from "@/components/section";
import { default as PhotoModel } from "@/models/photo";
import Styles from "@/styles";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";
import { getLesions } from "@/utils/testData";

const LesionDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesionIndex = Number(id || "");
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

  const compareImages = (
    beforeImageId: number | undefined,
    afterImageId: number | undefined
  ) => {
    if (beforeImageId === undefined || afterImageId === undefined) {
      Alert("Error", "Selecciona dos fotos para comparar");
      return;
    }

    setModalVisible(false);
    router.push({
      pathname: "/compare/[beforeId]/[afterId]",
      params: {
        beforeId: beforeImageId,
        afterId: afterImageId,
      },
    });
  };

  const addPhoto = () => {
    router.push({
      pathname: "/photo/",
      params: {
        redirect: PhotoRedirectOptions.LESION,
        lesionId: id,
      },
    });
  };

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
          style={[
            Styles.horizontalContainer,
            Styles.buttonsBottomContainer,
            { position: "relative" },
          ]}
        >
          <Button
            style={Styles.flexContainer}
            title="Comparar"
            color={ColorPallete.pink.dark}
            onPress={() => setModalVisible(true)}
          />
          <Button
            style={Styles.flexContainer}
            title="Agregar"
            color={ColorPallete.green.dark}
            onPress={addPhoto}
          />
        </View>
      ) : (
        <></>
      )}
      <CompareSelector
        onCancel={() => setModalVisible(false)}
        photos={photos}
        visible={modalVisible}
        onCompareSelected={compareImages}
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
