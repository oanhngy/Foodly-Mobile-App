import { View, TouchableOpacity, TextInput } from "react-native";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { Icon } from "@rneui/themed";
import AppText from "../../components/atoms/AppText";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import MaskInput, { Masks } from "react-native-mask-input";
import { DATE_MMYY } from "../../helpers/currencyHelper";
import AppButton from "../../components/atoms/Button";
import { useWallet } from "../../services/wallet";
import { ErrorModal } from "../../components/atoms/ErrorModal";

const getObjectByField = (list, field, value) => {
  return list.find(item => item[field] === value);
};

export const AssociateBankScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [bank, setBank] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwnerName, setCardOwnerName] = useState("");
  const [pickerFocused, setPickerFocused] = useState(false);
  const [expired, setExpired] = useState("");
  const [cvv, setCvv] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onGetBankList, onAddWallet } = useWallet();
  const [bankList, setBankList] = useState([]);

  const getBankList = async () => {
    const response = await onGetBankList();
    if (response.isSuccessful) {
      setBankList(response.bankList);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const addWallet = async () => {
    if (!bank || !cardNumber || !cardOwnerName || !expired || !cvv) {
      setError({
        title: "Error",
        description: "Please fill all fields",
      });
      setShowError(true);
      return;
    }

    const bankInfo = getObjectByField(bankList, "id", bank);
    const response = await onAddWallet(
      bankInfo,
      cardNumber,
      cardOwnerName,
      expired,
      cvv
    );
    if (response.isSuccessful) {
      navigation.goBack();
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
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
        <AppText style={styles.headerTitle}>Associate Bank</AppText>
      </View>
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View>

      <View style={styles.body}>
        <AppText style={styles.title}>Bank</AppText>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={bank}
            onValueChange={(itemValue, itemIndex) => setBank(itemValue)}
            onFocus={() => setPickerFocused(true)}
            onBlur={() => setPickerFocused(false)}
          >
            <Picker.Item
              value=""
              label="Enter bank"
              color="#9CA4AB"
              enabled={!pickerFocused}
            />
            {/* <Picker.Item label="Mb bank" value="mb" />
          <Picker.Item label="Techcombank" value="tcb" />
          <Picker.Item label="Vietinbank" value="vtb" />
          <Picker.Item label="Agribank" value="arb" />
          <Picker.Item label="VPBank" value="vpb" /> */}
            {bankList.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.label} value={item.id} />
              );
            })}
          </Picker>
        </View>

        <View>
          <AppText style={styles.title}>Card number</AppText>
          <TextInput
            style={styles.inputStyle}
            placeholder="Add card number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>

        <View>
          <AppText style={styles.title}>Card Owner Name</AppText>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter card owner name"
            value={cardOwnerName}
            onChangeText={setCardOwnerName}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>Expired</AppText>
            <MaskInput
              value={expired}
              onChangeText={setExpired}
              mask={DATE_MMYY}
              keyboardType="numeric"
              placeholder="MM/YY"
              placeholderTextColor={"#9CA4AB"}
              style={styles.smallInput}
            />
          </View>
          <View style={{ width: 24 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.title}>CVV</AppText>
            <TextInput
              style={styles.smallInput}
              placeholder="000"
              keyboardType="numeric"
              maxLength={3}
              value={cvv}
              onChangeText={setCvv}
              placeholderTextColor={"#9CA4AB"}
            />
          </View>
        </View>
      </View>
      <AppButton
        title={"Confirm"}
        onPress={() => addWallet()}
        buttonStyle={styles.buttonStyle}
        cancel
      />
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
