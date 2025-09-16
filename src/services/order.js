import { doc, collection, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useOrder = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //thêm
  const onCreateOrder = async (
    totalPayment,
    shipPayment,
    addressData,
    orderData,
    status
  ) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const orderRef = collection(userDocRef, "Orders");
      const orderDocRef = doc(orderRef);
      const idOrder = orderDocRef.id;

      await setDoc(orderDocRef, {
        id: idOrder,
        totalPayment: totalPayment,
        shipPayment: shipPayment,
        address: addressData,
        order: orderData,
        status: status,
      });
      hideLoading();
      return {
        idOrder: idOrder,
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

  //lấy thông tin order =id
  const onGetOrderById = async (idOrder) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const orderRef = collection(userDocRef, "Orders");
      const orderDocRef = doc(orderRef, idOrder);
      const orderSnapshot = await getDoc(orderDocRef);
      hideLoading();
      return {
        order: orderSnapshot.data(),
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  }

  //xóa
  const onDeleteOrder = async (idOrder) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const orderRef = collection(userDocRef, "Orders");
      const orderDocRef = doc(orderRef, idOrder);
      await deleteDoc(orderDocRef);
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
  }

  return {
    onCreateOrder,
    onGetOrderById,
    onDeleteOrder
  };
};
