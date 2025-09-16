import { Ionicons } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import AppText from "../../components/atoms/AppText";
import { HookHelper } from "../../helpers";
export const RestaurantDes = (props) => {
  const { star, shipFee, shipTime } = props;
  const { theme } = HookHelper.useBaseHook();

  return (
    <View style={styles.rowContainer}>
      <Ionicons name="star-outline" color={theme.colors?.primary} size={20} />
      <AppText h5 style={{ fontWeight: "bold", marginEnd: 20, marginStart: 4 }}>
        {star}
      </AppText>
      <Icon
        name="truck"
        color={theme.colors?.primary}
        size={20}
        type="feather"
      />
      <AppText h5 style={styles.productInfoText}>
        {shipFee}
      </AppText>
      <Ionicons name="time-outline" color={theme.colors?.primary} size={20} />
      <AppText h5 style={styles.productInfoText}>
        {shipTime}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productInfoText: {
    marginEnd: 20,
    marginStart: 4,
  },
});
