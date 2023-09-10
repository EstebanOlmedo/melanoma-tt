import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../button";

import ColorPallete from "@/colorPallete";
import Styles from "@/styles";

const LoginForm = () => {
  const login = () => {
    router.replace({
      pathname: "/(home)/followup",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <Text style={Styles.textBody}>Usuario:</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.formRow}>
        <Text style={Styles.textBody}>Contraseña:</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={[Styles.buttonsContainer, Styles.horizontalContainer]}>
        <Button
          title="Ingresar"
          color={ColorPallete.green.dark}
          onPress={login}
        />
        <Button title="Registrarse" color={ColorPallete.pink.dark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    ...Styles.centeredContainer,
  },
  formRow: {
    marginTop: 10,
    padding: 10,
    ...Styles.cardBorder,
    ...Styles.horizontalContainer,
  },
  input: {
    flex: 1,
  },
});

export default LoginForm;
