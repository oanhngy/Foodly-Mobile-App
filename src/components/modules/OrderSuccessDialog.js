import { Image, Modal, StyleSheet, View, TouchableOpacity} from "react-native";

import { images } from "../../../assets";
import { Mixin } from "../../helpers";
import AppText from "../atoms/AppText";

export const OrderSuccessDialog = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      
    >
      <TouchableOpacity style={styles.overlayBackground} onPressOut={onClose}>
        <View style={styles.container}>
          <Image source={images.partyFace} style={styles.image} />
          <AppText style={styles.title}>Ordered successfully</AppText>
          <AppText style={styles.subtitle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </AppText>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingTop: 24,
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: Mixin.moderateSize(10),
    width: "90%",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    color: "#66707A",
    textAlign: "center",
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
