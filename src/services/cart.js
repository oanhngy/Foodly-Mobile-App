import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useCart = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //thêm
  const onAddCart = async (
    productData,
    quantity,
    selectedSize,
    selectedTopping,
    totalPrice,
    note
  ) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const cartRef = collection(userDocRef, "Carts");
      const cartDocRef = doc(cartRef);
      const idCart = cartDocRef.id;

      await setDoc(cartDocRef, {
        product: productData,
        quantity: quantity,
        size: selectedSize,
        topping: selectedTopping,
        totalPrice: totalPrice,
        note: note,
        id: idCart,
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

  //xóa hết giỏ hàng- reset
  const resetCart = async () => {
    try {
      const cartCollectionRef = collection(
        doc(db, "Users", authenticationReducer.accessToken),
        "Carts"
      );
      const snapshot = await getDocs(cartCollectionRef);
      const promises = [];

      snapshot.forEach((docSnapshot) => {
        promises.push(deleteDoc(docSnapshot.ref));
      });

      await Promise.all(promises);
      console.log("Collection deleted successfully!");
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  //xóa
  const onRemoveProductFromCart = async (productId) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const cartRef = collection(userDocRef, "Carts");
      const cartDocRef = doc(cartRef, productId);
      await deleteDoc(cartDocRef);

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

  return {
    onAddCart,
    resetCart,
    onRemoveProductFromCart,
  };
};
