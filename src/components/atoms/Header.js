import { Header, Icon, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import { Mixin } from "../../helpers";
import { device_width } from "../../helpers/Mixin";
import { useBaseHook, useGetNavigation } from "../../helpers/hookHelper";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "trasparent",
    borderBottomWidth: 0,
    // paddingHorizontal: Mixin.moderateSize(16),
    // width: device_width,
    zIndex: 9999,
    width: "100%",
    paddingVertical: 12,
  },
  containerFilled: {
    backgroundColor: theme.colors?.primary,
  },
  containerTransparent: {
    backgroundColor: "#ECF0F3",
  },
  title: {
    fontSize: Mixin.moderateSize(20),
    textAlign: "center",
    fontWeight: "bold",
  },
  titleFilled: {
    color: "#05253D",
    fontWeight: "700",
  },
  breakLine: {
    elevation: 8,
    height: 0.5,
    width: device_width,
    backgroundColor: theme.colors?.grey5,
  },
  icon: {
  },
}));
const AppHeader = (props) => {
  const {
    filled,
    title,
    hideBack,
    transparent,
    onPressLeft,
    customStyle,
    textStyles,
    shadow,
    center
  } = props;
  const { theme } = useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  return (
    <View style={{ overflow: "hidden", paddingBottom: 5 }}>
      <Header
        containerStyle={[
          styles.container,
          filled ? styles.containerFilled : null,
          transparent ? styles.containerTransparent : null,
          customStyle,
        ]}
        rightComponent={props.renderRight ? props.renderRight : undefined}
        leftComponent={
          !hideBack ? (
            <Icon
              name="chevron-left"
              size={30}
              onPress={onPressLeft ? onPressLeft : () => navigation.goBack()}
              style={styles.icon}
            />
          ) : undefined
        }
        centerComponent={center ? center : {
          text: title,
          style: {
            ...styles.title,
            ...(filled || transparent ? styles.titleFilled : {}),
            ...textStyles,
          },
        }}
        {...props}
      />
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        {shadow && <View style={styles.breakLine} />}
      </View>
    </View>
  );
};
export default AppHeader;
