import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import ColorPallete from "@/colorPallete";
import ZoomeableImage from "@/components/zoomeableImage";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";
import Styles from "@/styles";

const Analyze = () => {
  const { currentPictureMedia } = useCurrentPictureMedia();

  useEffect(() => {
    setTimeout(() => {
      router.replace({
        pathname: "/prediagnosis/result",
      });
    }, 3000);
  }, []);

  if (!currentPictureMedia.uri) {
    console.error("No picture media provided");

    return (
      <View>
        <Text>Error: No se pudo obtener la foto</Text>
      </View>
    );
  }

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.photoContainer}>
        <ZoomeableImage
          style={styles.image}
          image={{ uri: currentPictureMedia.uri }}
        />
      </View>
      <View style={styles.statusContainer}>
        <Text style={[Styles.textBody, Styles.textWhite]}>
          Estamos analizando su foto, por favor espere...
        </Text>
        <ActivityIndicator size="large" color={ColorPallete.blue.normal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  statusContainer: {
    bottom: 0,
    position: "absolute",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#00000099",
    padding: 10,
    borderRadius: 10,
  },
});

export default Analyze;
