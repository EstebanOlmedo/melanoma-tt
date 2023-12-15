import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";

import Button from "../button";
import Loading from "../loading";

import Alert from "@/Alert";
import ColorPallete from "@/colorPallete";
import { useUser } from "@/contexts/userContext";
import {
  useLazyGetUserQuery,
  useLazyPostLoginQuery,
  usePostUserMutation,
} from "@/services/melanomaApi";
import { ErrorMessage } from "@/statusMessages";
import Styles from "@/styles";
import { Images } from "@/utils/images";

interface LoginFormProps {
  onRegisterPressed: () => void;
}

const LoginForm = ({ onRegisterPressed }: LoginFormProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [postLogin, result] = useLazyPostLoginQuery();
  const [getUser, userResult] = useLazyGetUserQuery();
  const { setUser } = useUser();

  const login = () => {
    if (userName === "" || password === "") {
      Alert("Información no válida", "Completa todos los campos");
      return;
    }

    postLogin({
      userName: userName.trim(),
      password: password.trim(),
    }).then(({ data, error }) => {
      if (error != null) {
        Alert("Error", "Error al loggear usuario:\n" + JSON.stringify(error));
        return;
      }
      if (data?.user?.id !== undefined) {
        getUser(data.user.id).then(({ data: userData, error: userError }) => {
          if (userData !== undefined) {
            setUser({
              id: userData.id,
              userName: userData.userName,
              name: userData.name,
              lastName: userData.lastName,
              password: "",
              hasWritePermission: true,
            });
            router.replace({ pathname: "/(home)/followup" });
          }
        });
      }
    });
  };

  if (result.isLoading || userResult.isLoading) {
    return <Loading />;
  }

  return (
    <>
      {result.isSuccess && result.data?.user.id === undefined ? (
        <ErrorMessage message="Datos incorrectos, vuelve a intentar." />
      ) : (
        <></>
      )}
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Usuario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setUserName(val)}
        />
      </View>
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          autoComplete="password"
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={[Styles.buttonsContainer, Styles.horizontalContainer]}>
        <Button
          title="Ingresar"
          color={ColorPallete.green.dark}
          onPress={login}
        />
        <Button
          title="No tengo cuenta"
          color={ColorPallete.pink.dark}
          onPress={onRegisterPressed}
        />
      </View>
    </>
  );
};

interface RegisterFormProps {
  onLoginPressed: () => void;
}

const RegisterForm = ({ onLoginPressed }: RegisterFormProps) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [postUser, result] = usePostUserMutation();

  const register = () => {
    if (
      userName.trim() === "" ||
      name.trim() === "" ||
      lastName.trim() === "" ||
      password.trim() === ""
    ) {
      Alert("Información no válida", "Completa todos los campos");
      return;
    }
    let pass = password.trim();
    pass += password[password.length - 1] ?? "";
    postUser({
      userName: userName.trim(),
      name: name.trim(),
      lastName: lastName.trim(),
      password: pass.trim(),
      isDoctor,
    });
  };

  if (result.isLoading) {
    return <ActivityIndicator size="large" color={ColorPallete.blue.normal} />;
  }

  if (result.isError) {
    Alert("Error", "Error al registrar usuario");
  }

  if (result.isSuccess) {
    Alert("Usuario registrado", "Ahora puedes ingresar con tu cuenta");
  }

  return (
    <>
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Nombre:</Text>
        <TextInput style={styles.input} onChangeText={(val) => setName(val)} />
      </View>
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Apellido:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setLastName(val)}
        />
      </View>
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Usuario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setUserName(val)}
        />
      </View>
      <View style={[Styles.formRow, Styles.cardBorder]}>
        <Text style={Styles.inputLabel}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          autoComplete="password"
          secureTextEntry
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <CheckBox
        title="Soy un doctor"
        checked={isDoctor}
        onPress={() => setIsDoctor(!isDoctor)}
      />
      <View style={[Styles.buttonsContainer, Styles.horizontalContainer]}>
        <Button
          title="Registrarse"
          color={ColorPallete.green.dark}
          onPress={register}
        />
        <Button
          title="Ya tengo cuenta"
          color={ColorPallete.pink.dark}
          onPress={onLoginPressed}
        />
      </View>
    </>
  );
};

const LoginMenu = () => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Image
          source={Images.logo}
          style={styles.logo}
          contentFit="contain"
          contentPosition="center"
          responsivePolicy="live"
        />
        <Text style={styles.descriptionText}>
          Esta aplicación ayuda a dar un seguimiento a lesiones sospechosas,
          para prevenir el cáncer de melanoma por medio del criterio ABCD,
          utilizando redes neuronales convolucionales y análisis de imágenes.
        </Text>
      </View>
      <View style={styles.formContainer}>
        {formType === "login" ? (
          <LoginForm onRegisterPressed={() => setFormType("register")} />
        ) : (
          <RegisterForm onLoginPressed={() => setFormType("login")} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    ...Styles.centeredContainer,
  },
  descriptionContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  descriptionText: {
    color: "white",
    textAlign: "center",
  },
  logo: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
});

export default LoginMenu;
