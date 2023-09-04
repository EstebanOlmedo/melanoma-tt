import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ColorPallete from "@/colorPallete";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";

interface CameraPreviewProps {
  onPhotoTaken: () => void;
}

const CameraPreview = (props: CameraPreviewProps) => {
  const camera = useRef<Camera>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPadding, setCameraPadding] = useState(0);
  const [ratio, setRatio] = useState("1:1");
  const [isRatioSet, setIsRatioSet] = useState(false);
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const { setCurrentPictureMedia } = useCurrentPictureMedia();

  const prepareRatio = async () => {
    if (!camera.current || Platform.OS !== "android") {
      return;
    }
    let desiredRatio = "4:3";
    const ratios = await camera.current.getSupportedRatiosAsync();

    const distances = new Map<string, number>();
    const realRatios = new Map<string, number>();
    let minDistance = null;
    for (const ratio of ratios) {
      const parts = ratio.split(":");
      const realRatio = Number(parts[0]) / Number(parts[1]);
      realRatios.set(ratio, realRatio);
      const distance = screenRatio - realRatio;
      distances.set(ratio, realRatio);
      if (minDistance == null) {
        minDistance = ratio;
      } else {
        if (distance >= 0 && distance < (distances.get(minDistance) ?? 0)) {
          minDistance = ratio;
        }
      }
    }

    desiredRatio = minDistance ?? desiredRatio;
    const remainder = Math.floor(
      (height - (realRatios.get(desiredRatio) ?? 0) * width) / 2
    );
    setIsRatioSet(true);
    setCameraPadding(remainder);
    setRatio(desiredRatio);
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePhoto = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePictureAsync();
    camera.current.pausePreview();
    setCurrentPictureMedia({ uri: photo.uri });

    props.onPhotoTaken();
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        autoFocus
        useCamera2Api
        onCameraReady={setCameraReady}
        style={[
          styles.camera,
          { marginVertical: cameraPadding },
          isLoading ? { width: 0 } : {},
        ]}
        ratio={ratio}
        ref={camera}
      >
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    alignSelf: "center",
    marginBottom: 10,
  },
  captureButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderColor: ColorPallete.blue.normal,
    borderWidth: 3,
  },
});

export default CameraPreview;
