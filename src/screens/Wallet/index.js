import { Icon } from "@rneui/themed";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { images } from "../../../assets";
import { db } from "../../../firebaseConfig";
import AppText from "../../components/atoms/AppText";
import { HookHelper } from "../../helpers";
import { maskCardNumber } from "../../helpers/currencyHelper";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

const WalletItem = ({ id, bank, cardNumber, bankSelect, setBankSelect }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.itemInfo}>
      <Image source={images.visa} style={styles.bankImage} />
      <View style={{ flex: 1, marginStart: 24 }}>
        <AppText subtitle1>{bank?.label}</AppText>
        <View style={styles.rowContainer}>
          {maskCardNumber(cardNumber)
            .split("")
            .map((char, index) => (
              <AppText
                key={index}
                style={char === "•" ? styles.bankNumberDot : styles.bankNumber}
              >
                {char}
              </AppText>
            ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => setBankSelect(id)}>
        {bankSelect == id ? (
          <Icon name="check-circle" size={24} color={theme.colors.primary} />
        ) : (
          <Icon name="radio-button-unchecked" size={24} color={"#78828A"} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export const WalletScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [bankSelect, setBankSelect] = useState(0);
  const [walletList, setWalletList] = useState([]);
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );

  useEffect(() => {
    if (!authenticationReducer.accessToken) return;

    const userDocRef = doc(db, "Users", authenticationReducer?.accessToken);
    const walletsCollectionRef = collection(userDocRef, "Wallets");

    const unsubscribe = onSnapshot(walletsCollectionRef, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setWalletList(temp);
      setBankSelect(temp[0]?.id);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", zIndex: 1, left: 0, padding: 10 }}
        >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>My wallet</AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate("AssociateBank")}
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
          data={walletList}
          renderItem={({ item }) => (
            <WalletItem
              {...item}
              bankSelect={bankSelect}
              setBankSelect={setBankSelect}
            />
          )}
          keyExtractor={(key, index) => index.toString()}
        />
      </View>
    </View>
  );
};
