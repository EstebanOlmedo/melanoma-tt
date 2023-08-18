import { StyleSheet, View } from "react-native";

import Styles from "../../styles";
import { default as Options } from "../../utils/SettingsOptions";
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
      <SettingOption
        name="Notificaciones"
        option={Options.Notification}
        icon={NotificationIcon}
      />
      <SettingOption
        name="Privacidad"
        option={Options.Privacy}
        icon={PrivacyIcon}
      />
      <SettingOption
        name="Seguridad"
        option={Options.Security}
        icon={SecurityIcon}
      />
      <SettingOption name="About" option={Options.About} icon={InfoIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Styles.cardBorder,
  },
});

export default SettingsOptions;
