import { doc, collection, setDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useAddress = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //add
  const onAddAddress = async (
    fullName,
    phoneNumber,
    city,
    address,
    addressDetail,
    isSelected
  ) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const addressRef = collection(userDocRef, "Addresses");
      const addressDocRef = doc(addressRef);
      const idAddress = addressDocRef.id;

      await setDoc(addressDocRef, {
        id: idAddress,
        fullName: fullName,
        phoneNumber: phoneNumber,
        city: city,
        address: address,
        addressDetail: addressDetail,
        isSelected: isSelected,
      });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //update
  const onUpdateAddress = async (
    id,
    fullName,
    phoneNumber,
    city,
    address,
    addressDetail
  ) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const addressRef = collection(userDocRef, "Addresses");
      const addressDocRef = doc(addressRef, id);

      await setDoc(addressDocRef, {
        id: id,
        fullName: fullName,
        phoneNumber: phoneNumber,
        city: city,
        address: address,
        addressDetail: addressDetail,
      });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //chọn 1 địa chỉ làm mặc định
  const onSelectAddress = async (id) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const addressRef = collection(userDocRef, "Addresses");
      const querySnapshot = await getDocs(addressRef);
      querySnapshot.forEach(async (data) => {
        const addressDocRef = doc(
          db,
          "Users",
          authenticationReducer.accessToken,
          "Addresses",
          data.id
        );
        await setDoc(addressDocRef, {
          id: data.id,
          fullName: data.data().fullName,
          phoneNumber: data.data().phoneNumber,
          city: data.data().city,
          address: data.data().address,
          addressDetail: data.data().addressDetail,
          isSelected: data.id === id,
        });
      });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //lấy địa chỉ (mặc định)
  const onGetSelectedAddress = async () => {
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const q = query(
        collection(userDocRef, "Addresses"),
        where("isSelected", "==", true)
      );
      const selectedAddress = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        selectedAddress.push(doc.data());
      });
      return {
        isSuccessful: true,
        selectedAddress: selectedAddress[0],
      };
    } catch (error) {
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //lấy dsach tpho trong hệ thống
  const onGetCities = async () => {
    showLoading();
    try {
      const cityRef = collection(db, "Cities");
      const cityList = [];
      const querySnapshot = await getDocs(cityRef);
      querySnapshot.forEach((doc) => {
        cityList.push(doc.data());
      });
      hideLoading();
      return {
        isSuccessful: true,
        cityList: cityList,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //lấy all địa chỉ user lưu- hiển thị
  const onGetAddress = async () => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const addressRef = collection(userDocRef, "Addresses");      
      const addressList = [];
      const querySnapshot = await getDocs(addressRef);
      querySnapshot.forEach((doc) => {
        addressList.push(doc.data());
      });
      hideLoading();
      return {
        isSuccessful: true,
        addressList: addressList,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    } 
  }

  return {
    onGetAddress,
    onAddAddress,
    onGetCities,
    onUpdateAddress,
    onSelectAddress,
    onGetSelectedAddress
  };
};
