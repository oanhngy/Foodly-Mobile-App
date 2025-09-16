import React from "react";
import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { Overlay } from "@rneui/themed";
import AppButton from "./Button";
import { Mixin } from "../../helpers";
import { useBaseHook } from "../../helpers/hookHelper";
import { Button } from "@rneui/base";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: "100%",
  },
  overlayStyles: {
    position: "absolute",
    width: "95%",
    bottom: Mixin.moderateSize(24),
    borderRadius: Mixin.moderateSize(8),
  },
  cancelButton: {
    marginTop: Mixin.moderateSize(8),
  },
}));
export const BottomModal = (props) => {
  const { theme } = useBaseHook();
  const { confirmTitle = "Comfirm", cancelTitle = "Cancel" } = props;
  const styles = useStyles(theme);

  return (
    <Overlay
      onBackdropPress={() =>
        props.canDismiss && props.onCancel && props.onCancel()
      }
      overlayStyle={[styles.overlayStyles, props?.customStyle]}
      {...props}
    >
      <View>{props.children}</View>
      <View>
        {!props.disabledConfirm && (
          <AppButton
            title={confirmTitle}
            onPress={() => {
              props.onConfirm && props.onConfirm();
            }} />
        )}
        {props.canCancel && (
          <AppButton
            buttonStyle={styles.cancelButton}
            title={cancelTitle}
            onPress={() => props.onCancel && props.onCancel()}
            cancel />
        )}
      </View>
    </Overlay>
  );
};
