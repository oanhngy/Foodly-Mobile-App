import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import GlobalStyles from "../../utils/styles/GlobalStyles";
import { Mixin } from "../../helpers";
import { theme } from "../../utils/styles/theme";
import AppText from "./AppText";

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: Mixin.moderateSize(50),
    marginTop: Mixin.moderateSize(16),
    color: theme.colors?.primary,
    // paddingHorizontal: Mixin.moderateSize(16),
  },
  button: {
    borderRadius: Mixin.moderateSize(20),
    height: "100%",
    maxHeight: Mixin.moderateSize(100),
    backgroundColor: theme.colors?.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  disableButton: {
    backgroundColor: theme.colors?.disabledButton,
  },
  cancelButton: {
    backgroundColor: "#ECF0F3",
  },
  title: {
    fontWeight: "700",
    fontSize: Mixin.moderateSize(16),
    color: "white",
  },
  cancelTitle: {
    color: "black",
  },
  filledContainer: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors?.primary,
  },
  filledTitle: {
    fontWeight: "700",
    fontSize: Mixin.moderateSize(14),
    color: theme.colors?.primary,
  },
});

const AppButton = (props) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        props.shadow ? GlobalStyles.shadow : null,
        props.buttonStyle ? props.buttonStyle : null,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          props.cancel ? styles.cancelButton : null,
          props.filled ? styles.filledContainer : null,
          props.customBtnStyle,
        ]}
        onPress={props.onPress}
      >
        <AppText
          style={[
            styles.title,
            props.cancel ? styles.cancelTitle : null,
            props.filled ? styles.filledTitle : null,
            props.textStyle,
          ]}
        >
          {props.title}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};
export default AppButton;
