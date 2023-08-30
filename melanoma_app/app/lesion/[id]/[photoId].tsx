import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import TextEditModal from "@/components/EditTextModal";
import { EditButton } from "@/components/button";
import Section from "@/components/section";
import ZoomeableImage from "@/components/zoomeableImage";
import Styles from "@/styles";
import { LesionImages } from "@/utils/images";
import { getLesions } from "@/utils/testData";

interface ImageDescriptionProps {
  description: string;
}

const ImageDescription = (props: ImageDescriptionProps) => {
  return (
    <ScrollView style={[Styles.cardBorder, styles.photoDescription]}>
      <Text style={[Styles.textBody, styles.textDescription]}>
        {props.description}
      </Text>
    </ScrollView>
  );
};

const DetailedPhoto = () => {
  const params = useLocalSearchParams<{ id: string; photoId: string }>();
  const id = parseInt(params.id, 10);
  const photoId = parseInt(params.photoId, 10);
  const photo = getLesions()[id].photos[photoId];
  const navigator = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const Body = () => {
    return ImageDescription({ description: photo.description });
  };
  useEffect(() => {
    navigator.setOptions({
      title: photo.createdOn.toLocaleString(),
      headerRight: () => <EditButton onPress={() => setModalVisible(true)} />,
    });
  }, [navigator]);
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <ZoomeableImage
          style={styles.image}
          image={LesionImages[photo.localId]}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Section title="Notas" body={Body} />
      </View>
      <TextEditModal
        value={photo.description}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    flex: 2,
  },
  descriptionContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  photoDescription: {
    padding: 10,
  },
  textDescription: {
    marginBottom: 15,
  },
});

export default DetailedPhoto;
