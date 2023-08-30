import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Image, ImageSource } from "expo-image";
import { StyleSheet, ViewStyle } from "react-native";

interface ZoomeableImageProps {
  image: ImageSource;
  style?: ViewStyle;
}

const ZoomeableImage = (props: ZoomeableImageProps) => {
  return (
    <ReactNativeZoomableView
      maxZoom={10}
      minZoom={0.5}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders
    >
      <Image
        source={props.image}
        style={styles.photoContainer}
        contentFit="cover"
        contentPosition="center"
        responsivePolicy="live"
      />
    </ReactNativeZoomableView>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ZoomeableImage;
