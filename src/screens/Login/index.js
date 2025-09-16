import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import AppInput from "../../components/atoms/AppInput";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import AppHeader from "../../components/atoms/Header";
import { validatePhone } from "../../helpers/currencyHelper";
import { useAuth } from "../../services/auth";
import { AuthenticationActions } from "../../stores/actions";

export const LoginScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const [phoneString, setPhoneString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onLogin, onGetUserInfo } = useAuth();
  const onNext = async () => {
    if (checkEmpty()) {
      setError({
        title: "Error",
        description: "Please fill in all the fields",
      });
      setShowError(true);
      return;
    }
    // if (!validatePhone(phoneString)) {
    //   setError({
    //     title: "Error",
    //     description: "Invalid phone number",
    //   });
    //   setShowError(true);
    //   return;
    // }
    const response = await onLogin(phoneString, passwordString);
    if (response.isSuccessful) {
      const userData = await onGetUserInfo(response.userCredential?.user.uid);

      if (userData.userData) {
        dispatch(AuthenticationActions.setUserInfo.request(userData.userData));
      }

      dispatch(
        AuthenticationActions.setAccessToken.request(
          response.userCredential?.user.uid
        )
      );
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Error",
          description: response.error.message,
        });
      }, 200);
    }
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const checkEmpty = () => {
    if (phoneString === "") {
      return true;
    }
    if (passwordString === "") {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={"Sign in"} shadow />

      <View style={styles.body}>
        <View>
          <View style={styles.inputContainer}>
            <AppText style={styles.inputLabel}>Phone number</AppText>
            <AppInput
              label={"Enter your phone number"}
              value={phoneString}
              onChangeText={(text) => setPhoneString(text)}
              containerStyles={styles.inputStyle}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <AppText style={styles.inputLabel}>Password</AppText>
            <AppInput
              label={"Enter password"}
              value={passwordString}
              maxLength={100}
              isPassword
              keyboardType="default"
              onChangeText={(text) => setPasswordString(text)}
              containerStyles={styles.inputStyle}
            />
          </View>
          <AppText style={styles.forgotText}>Forgot password?</AppText>
        </View>

        <AppButton
          title={"Sign in"}
          onPress={() => onNext()}
          cancel={checkEmpty()}
        />
        <View style={styles.registerContainer}>
          <AppText style={styles.unregisterText}>
            Haven't created an account yet?{" "}
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <AppText style={styles.primaryText}>Sign up</AppText>
          </TouchableOpacity>
        </View>
      </View>

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
