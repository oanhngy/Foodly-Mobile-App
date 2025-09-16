import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { HookHelper } from "../../helpers";
import { AuthenticationActions } from "../../stores/actions";
import { useAppSelector } from "../../helpers/hookHelper";


export const CustomDrawer = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { state, descriptors, navigation } = props;
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const userInfo = authenticationReducer.userInfo;
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalInfo")}
          style={{ padding: 20, alignItems: "center", flexDirection: "row" }}
        >
          <Image
            source={images.avatar}
            style={{
              height: 48,
              width: 48,
              marginBottom: 10,
              marginEnd: 14,
            }}
          />
          <View>
            <AppText
              style={{
                fontSize: 18,
              }}
            >
              {userInfo.fullName}
            </AppText>
            <AppText
              style={{
                fontSize: 11,
              }}
            >
              ID: 0443787676
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("Wallet")}
        >
          <Ionicons
            name="wallet-outline"
            size={22}
            color={theme.colors.primary}
          />
          <AppText
            style={{
              fontSize: 16,
              marginStart: 10,
            }}
          >
            Wallet
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("Address")}
        >
          <Ionicons
            name="location-outline"
            size={22}
            color={theme.colors.primary}
          />
          <AppText
            style={{
              fontSize: 16,
              marginStart: 10,
            }}
          >
            My Address
          </AppText>
        </TouchableOpacity>

        <View
          style={{ height: 1, backgroundColor: "#BFC6CC", marginStart: 20 }}
        />
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(AuthenticationActions.logout.request());
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <AppText
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
