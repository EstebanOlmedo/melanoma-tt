import { router, useLocalSearchParams } from "expo-router";

import CameraPreview from "@/components/cameraPreview";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";

const Photo = () => {
  const params = useLocalSearchParams<{ redirect?: string }>();

  const onPhotoTaken = () => {
    switch (params.redirect) {
      case PhotoRedirectOptions.PREDIAGNOSIS:
        router.replace({
          pathname: "/prediagnosis/analyze",
        });
        break;
      default:
        console.warn("Invalid redirect option");
    }
  };

  return <CameraPreview onPhotoTaken={onPhotoTaken} />;
};

export default Photo;
