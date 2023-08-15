import { StyleSheet, View } from "react-native";

import Styles from "../../styles";
import {
  InfoIcon,
  NotificationIcon,
  PrivacyIcon,
  SecurityIcon,
} from "../icons";
import SettingOption from "../settingOption";

const SettingsOptions = () => {
  return (
    <View style={styles.container}>
      <SettingOption name="Notificaciones" icon={NotificationIcon} />
      <SettingOption name="Privacidad" icon={PrivacyIcon} />
      <SettingOption name="Seguridad" icon={SecurityIcon} />
      <SettingOption name="Seguridad" icon={InfoIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Styles.cardBorder,
  },
});

export default SettingsOptions;
