import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Mixin } from "../../helpers";
import AppText from "../atoms/AppText";
import RadioGroup from 'react-native-radio-buttons-group';
import { theme } from "../../utils/styles/theme";
const radioButtons = [
  {
    id: '1',
    label: 'Price: High to Low',
    labelStyle: { color: '#05253D' },
    value: '1',
    color: theme.colors?.primary,
    borderColor: theme.colors?.primary, 
    containerStyle: {
      borderWidth: 1,
      borderColor: '#E3E9ED',
      width: Mixin.device_width * 0.9,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 16
    },
    labelStyle: {
      fontSize: 16,
      color: '#78828A',
    }
  },
  {
    id: '2',
    label: 'Price: Low to High',
    labelStyle: { color: '#05253D' },
    value: '2',
    color: theme.colors?.primary,
    borderColor: theme.colors?.primary, 
    containerStyle: {
      borderWidth: 1,
      borderColor: '#E3E9ED',
      width: Mixin.device_width * 0.9,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 16
    },
    labelStyle: {
      fontSize: 16,
      color: '#78828A'
    }
  },
  {
    id: '3',
    label: 'Nearest',
    labelStyle: { color: '#05253D' },
    value: '3',
    color: theme.colors?.primary,
    borderColor: theme.colors?.primary, 
    containerStyle: {
      borderWidth: 1,
      borderColor: '#E3E9ED',
      width: Mixin.device_width * 0.9,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 16
    },
    labelStyle: {
      fontSize: 16,
      color: '#78828A'
    }
  },
];


export const ArrangeDialog = ({ isVisible, onClose, filterAction }) => {

  const [arrange, setArrange] = useState();
  

  useEffect(() => {
    if (arrange) {
      filterAction(arrange);
      onClose();
    }
  }, [arrange]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlayBackground}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
              <Icon name="expand-more" size={40} />
            </TouchableOpacity>

            <AppText style={{ fontSize: 20, textAlign: 'center', flex: 1 }}>
            Arrange
            </AppText>
          </View>
          <View style={{ alignItems: 'center'}}>

          <RadioGroup
            radioButtons={radioButtons}
            onPress={setArrange}
            selectedId={arrange}
            containerStyle={{ alignItems: 'flex-start', marginTop: 16 }}
            color={theme.colors?.primary}
            />
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 24,
    backgroundColor: "white",
    borderRadius: Mixin.moderateSize(10),
    width: "100%",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  closeContainer: {
    position: "absolute",
    width: 40,
    height: 40,
    zIndex: 1,
  },
  title: {
    marginBottom: 10,
    fontSize: 16
  },
  overlayBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
