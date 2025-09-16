import { doc, collection, setDoc, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useWallet = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //thêm
  const onAddWallet = async (
    bank,
    cardNumber,
    ownerName,
    expiredDate,
    cvv
  ) => {
    showLoading();
    try {
      const userDocRef = doc(db, "Users", authenticationReducer.accessToken);
      const walletRef = collection(userDocRef, "Wallets");
      const walletDocRef = doc(walletRef);
      const idWallet = walletDocRef.id;

      await setDoc(walletDocRef, {
        id: idWallet,
        bank: bank,
        cardNumber: cardNumber,
        ownerName: ownerName,
        expiredDate: expiredDate,
        cvv: cvv,
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
  
  //lấy hết dsach 
  const onGetBankList = async () => {
    showLoading();
    try {
        const bankRef = collection(db, "Banks");
        const bankList = [];
        const querySnapshot = await getDocs(bankRef);
        querySnapshot.forEach((doc) => {
          bankList.push(doc.data());
        });
        hideLoading();
        return {
          isSuccessful: true,
          bankList: bankList,
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
    onAddWallet,
    onGetBankList,
  };
};
