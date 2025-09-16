import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppInput from "../../components/atoms/AppInput";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import { useAuth } from "../../services/auth";
import useStyles from "./styles";

export const RegisterScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailString, setEmailString] = useState("");
  const [fullnameString, setFullnameString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [confirmPasswordString, setConfirmPasswordString] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onRegister } = useAuth();

  const registerAccount = async () => {
    if (passwordString !== confirmPasswordString) {
      setShowError(true);
      setError({
        title: "Error",
        description: "Password does not match",
      });
      return;
    }
    const dataRegister = {
      phoneNumber: phoneNumber,
      email: emailString,
      fullName: fullnameString,
      password: passwordString,
    };
    const response = await onRegister(dataRegister);
    if (response.isSuccessful) {
      navigation.navigate("Login");
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error?.message || "Something went wrong",
        });
      }, 200);
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const checkEmpty = () => {
    return (
      !phoneNumber ||
      !emailString ||
      !fullnameString ||
      !passwordString ||
      !confirmPasswordString
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title={"Sign up"} shadow />
      <ScrollView style={styles.body}>
        <View>
          <View style={styles.inputContainer}>
            <AppText>Full name</AppText>
            <AppInput
              label={"Enter your full name"}
              value={fullnameString}
              onChangeText={(text) => setFullnameString(text)}
              containerStyles={styles.inputStyle}
            />
          </View>
          <View style={styles.inputContainer}>
            <AppText>Phone number</AppText>
            <AppInput
              label={"Enter your phone number"}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              containerStyles={styles.inputStyle}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <AppText>Email</AppText>
            <AppInput
              label={"Enter your email"}
              value={emailString}
              onChangeText={(text) => setEmailString(text)}
              containerStyles={styles.inputStyle}
            />
          </View>

          <View style={styles.inputContainer}>
            <AppText>Password</AppText>
            <AppInput
              label={"Enter your password"}
              value={passwordString}
              maxLength={100}
              isPassword
              keyboardType="default"
              onChangeText={(text) => setPasswordString(text)}
              containerStyles={styles.inputStyle}
            />
          </View>
          <View style={styles.inputContainer}>
            <AppText>Confirm Password</AppText>
            <AppInput
              label={"Enter your password again"}
              value={confirmPasswordString}
              maxLength={100}
              isPassword
              keyboardType="default"
              onChangeText={(text) => setConfirmPasswordString(text)}
              containerStyles={styles.inputStyle}
            />
          </View>
          <AppText body2>
            By clicking Create account, you agree to the system's{" "}
            <AppText primary>Terms and policies</AppText>
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title={"Sign up"}
            onPress={() => registerAccount()}
            cancel={checkEmpty()}
          />
        </View>

        <View style={styles.registerContainer}>
          <AppText subtitle3>Do not have an account? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <AppText style={styles.primaryText}>Sign in</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
