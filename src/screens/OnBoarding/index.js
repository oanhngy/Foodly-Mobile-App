import { TouchableOpacity, View, Image } from "react-native";

import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { images } from "../../../assets";

export const OnBoardingScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={images.onboardingBg} style={styles.topBg} />
      <Image source={images.logo} style={styles.logo} />
      <AppButton
        title={"Sign in"}
        onPress={() => navigation.navigate("Login")}
        customBtnStyle={styles.buttonStyle}
      />
      <View style={styles.rowContainer}>
        <View style={styles.line} />
        <AppText>or</AppText>
        <View style={styles.line} />
      </View>
      <View style={styles.registerContainer}>
        <AppText style={styles.unregisterText}>
        Do not have an account? {" "}
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <AppText style={styles.primaryText}>Sign up</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
