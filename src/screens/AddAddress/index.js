import { Picker } from "@react-native-picker/picker";
import { Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { useAddress } from "../../services/address";

export const AddAddressScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation, route } = useGetNavigation();
  const currentAddress = route.params?.address;
  const [fullname, setFullname] = useState(currentAddress ? currentAddress.fullName : "");
  const [phoneNumber, setPhoneNumber] = useState(currentAddress ? currentAddress.phoneNumber : "");
  const [city, setCity] = useState(currentAddress ? currentAddress.city : "");
  const [pickerFocused, setPickerFocused] = useState(false);
  const [address, setAddress] = useState(currentAddress ? currentAddress.address : "");
  const [detailAddress, setDetailAddress] = useState(currentAddress ? currentAddress.addressDetail : "");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onAddAddress, onGetCities, onUpdateAddress, onGetAddress } = useAddress();
  const [cityList, setCityList] = useState([]);

  const getCities = async () => {
    const response = await onGetCities();
    if (response.isSuccessful) {
      setCityList(response.cityList);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const getAddress = async () => {
    const response = await onGetAddress();
    if (response.isSuccessful) {
      if (!response.addressList || !response.addressList.length) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  const addAddress = async () => {
    const isSelected = await getAddress();
    if (!fullname || !phoneNumber || !city || !address || !detailAddress) {
      setError({
        title: "Error",
        description: "Please fill all fields",
      });
      setShowError(true);
      return;
    }
    let response;
    if (currentAddress) {
      response = await onUpdateAddress(
        currentAddress.id,
        fullname,
        phoneNumber,
        city,
        address,
        detailAddress,
      );
    } else {
      response = await onAddAddress(
        fullname,
        phoneNumber,
        city,
        address,
        detailAddress,
        !isSelected
      );
    }
    if (response.isSuccessful) {
      navigation.goBack();
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  }

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
        <AppText style={styles.headerTitle}>Add Address</AppText>
      </View>
      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View>

      <ScrollView style={styles.body}>
        <View>
          <AppText style={styles.title}>Full Name</AppText>
          <TextInput
            style={styles.inputStyle}
            placeholder="Full Name"
            value={fullname}
            onChangeText={setFullname}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>
        <View>
          <AppText style={styles.title}>Phone Number</AppText>
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>
        <AppText style={styles.title}>City</AppText>
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
            onFocus={() => setPickerFocused(true)}
            onBlur={() => setPickerFocused(false)}
          >
            <Picker.Item
              value=""
              label="City"
              color="#9CA4AB"
              enabled={!pickerFocused}
            />
            {cityList.map((city, index) => (
              <Picker.Item label={city.label} value={city.id} key={index} />
            ))}
          </Picker>
        </View>
        <View>
          <AppText style={styles.title}>Address</AppText>
          <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>

        <View>
          <AppText style={styles.title}>Detail Address</AppText>
          <TextInput
            style={[
              styles.inputStyle,
              { height: 120, textAlignVertical: "top", paddingTop: 16 },
            ]}
            multiline
            placeholder="Enter detail address"
            value={detailAddress}
            onChangeText={setDetailAddress}
            placeholderTextColor={"#9CA4AB"}
          />
        </View>
      </ScrollView>
      <AppButton
        title={"Confirm"}
        onPress={() => addAddress()}
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
