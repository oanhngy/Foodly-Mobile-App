import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image, makeStyles } from "@rneui/themed";
import { Mixin } from "../../helpers";
import { useBaseHook } from "../../helpers/hookHelper";
import { images } from "../../../assets";
import { Ionicons } from "@expo/vector-icons";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    // height: isIphoneX() ? 100 : 80,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
  },
  icon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    tintColor: "#979696",
  },
  selectedIcon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    tintColor: theme.colors?.primary,
  },
  routeContainer: {
    height: 70,
    flex: 1,
    // backgroundColor: 'white',
    alignItems: "center",
    paddingTop: 20,
  },
  firstRouteRadius: {
    borderTopLeftRadius: 20,
  },
  lastRouteRadius: {
    borderTopRightRadius: 20,
  },
  label: {
    position: "absolute",
    color: "#888888",
    bottom: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
  },
  selectedLabel: {
    position: "absolute",
    color: theme.colors?.primary,
    bottom: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
  },
}));

export const TabBar = (props) => {
  const { state, descriptors, navigation } = props;
  const { theme } = useBaseHook();
  const styles = useStyles(theme);
  const isFocused = (index) => index === state.index;

  const onPress = (index) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });
    if (!isFocused(index) && !event.defaultPrevented) {
      navigation.navigate(state.routes[index].name);
    }
  };

  return (
    <View>
      <View
        // source={images.logo}
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => onPress(0)}
          style={[styles.routeContainer, styles.firstRouteRadius]}
        >
          <Ionicons
            name={isFocused(0) ? "home" : "home-outline"}
            color={isFocused(0) ? theme.colors?.primary : "#66707A"}
            size={20}
          />
          <Text style={isFocused(0) ? styles.selectedLabel : styles.label}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(1)}
          style={styles.routeContainer}
        >
          <Ionicons
            name={isFocused(1) ? "heart" : "heart-outline"}
            color={isFocused(1) ? theme.colors?.primary : "#66707A"}
            size={20}
          />
          <Text style={isFocused(1) ? styles.selectedLabel : styles.label}>
            Favorite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(2)}
          style={styles.routeContainer}
        >
          {/* <Image
            style={isFocused(2) ? styles.selectedIcon : styles.icon}
            source={images.cartIcon}
          /> */}
          <Ionicons
            name={isFocused(2) ? "receipt" : "receipt-outline"}
            color={isFocused(2) ? theme.colors?.primary : "#66707A"}
            size={20}
          />
          <Text style={isFocused(2) ? styles.selectedLabel : styles.label}>
            Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(3)}
          style={[styles.routeContainer, styles.lastRouteRadius]}
        >
          <Ionicons
            name={isFocused(3) ? "gift" : "gift-outline"}
            color={isFocused(3) ? theme.colors?.primary : "#66707A"}
            size={20}
          />
          <Text style={isFocused(3) ? styles.selectedLabel : styles.label}>
            Reward
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
