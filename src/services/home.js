import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useHome = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //dsach recommend
  const onGetForYouProduct = async () => {
    showLoading();
    try {
      const productRef = collection(db, "Products");
      const q = query(productRef, orderBy("rating", "asc"), limit(5));
      const productList = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        productList.push(doc.data());
      });
      hideLoading();

      return {
        isSuccessful: true,
        productList: productList,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //tìm món
  const onSearchProduct = async (searchText) => {
    showLoading();
    try {
      const productRef = collection(db, "Products");
      const q = query(productRef, where('keywords', 'array-contains', searchText.trim().toLowerCase()));
      const productList = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        productList.push(doc.data());
      });
      hideLoading();

      return {
        isSuccessful: true,
        productList: productList,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  }

  //lọc sản phẩm theo category
  const onGetProductByType = async (type) => {
    showLoading();
    try {
      const productRef = collection(db, "Products");
      const q = query(productRef, where("type", "==", type));
      const productList = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        productList.push(doc.data());
      });
      hideLoading();

      return {
        isSuccessful: true,
        productList: productList,
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
    onGetForYouProduct,
    onSearchProduct,
    onGetProductByType
  };
};
