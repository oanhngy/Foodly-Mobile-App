import { View } from "react-native";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

export const RewardScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  return <View style={styles.container}></View>;
};
