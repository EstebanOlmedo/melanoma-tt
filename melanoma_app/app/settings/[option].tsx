import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Styles from "../../src/styles";
import {SettingBoolOption, SettingPickOption} from "../../src/components/settingOption";

const Setting = () => {
  const options = [1, 2, 3, 4, 5, 6];
  return (
      <View style={styles.container}>
        <SettingBoolOption name="Habilitar notificaciones"/>
        <SettingPickOption name="Intervalo de notificaciones" dataOptions={options} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    ...Styles.cardBorder,
  },
});

export default Setting;
