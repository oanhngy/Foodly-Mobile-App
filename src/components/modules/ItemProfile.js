import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Mixin } from "../../helpers";

const ItemProfile = (props) => {
  const { icon, color, title, onPress, disableIcon, containerStyle, subTitle, type } = props;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={color}/>
      </View>
      <View style={styles.contentRight}>
        <View style={{ width: "80%" }}>
          <Text style={styles.textTitle}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
        {!disableIcon && <Icon
          style={styles.ic}
          name="chevron-right"
          size={28}
          color="#747783"
        />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "center",
    height: Mixin.moderateSize(68),
    backgroundColor: "#f6f8fa",
  },
  ic: {
    marginRight: Mixin.moderateSize(12),
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  contentRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: Mixin.moderateSize(12),
    borderBottomWidth: 1,
    height: "100%",
    borderColor: "#EEF0F4",
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default ItemProfile;
