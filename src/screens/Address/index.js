import { Icon } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import AppText from "../../components/atoms/AppText";
import { HookHelper } from "../../helpers";
import { useGetNavigation, useAppSelector } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAddress } from "../../services/address";

const AddressItem = (props) => {
  const {
    id,
    fullName,
    phoneNumber,
    address,
    selectAddress,
    isSelected,
  } = props;
  const { navigation } = useGetNavigation();
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.itemInfo}>
      <View style={{ flex: 1 }}>
        <AppText subtitle1>{fullName}</AppText>
        <AppText style={styles.bankNumber}>{phoneNumber}</AppText>
        <AppText style={styles.bankNumber}>{address}</AppText>
        <TouchableOpacity
          style={styles.buttonChange}
          onPress={() => {
            navigation.navigate("AddAddress", { address: props });
          }}
        >
          <AppText white>Change</AppText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => selectAddress(id)}>
        {isSelected ? (
          <Icon name="check-circle" size={24} color={theme.colors.primary} />
        ) : (
          <Icon name="radio-button-unchecked" size={24} color={"#78828A"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export const AddressScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [addressList, setAddressList] = useState([]);
  const { onSelectAddress } = useAddress();

  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );

  useEffect(() => {
    if (!authenticationReducer.accessToken) return;

    const userDocRef = doc(db, "Users", authenticationReducer?.accessToken);
    const addressCollectionRef = collection(userDocRef, "Addresses");

    const unsubscribe = onSnapshot(addressCollectionRef, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setAddressList(temp);
    });

    return () => unsubscribe();
  }, []);

  const selectAddress = async (id) => {
    const response = await onSelectAddress(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", zIndex: 1, left: 0, padding: 10 }}
        >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Address</AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddAddress")}
          style={{ position: "absolute", zIndex: 1, right: 0, padding: 10 }}
        >
          <Icon name="add" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View>

      <View style={styles.body}>
        <FlatList
          data={addressList}
          renderItem={({ item }) => (
            <AddressItem
              {...item}
              selectAddress={selectAddress}
            />
          )}
          keyExtractor={(key, index) => index.toString()}
        />
      </View>
    </View>
  );
};
