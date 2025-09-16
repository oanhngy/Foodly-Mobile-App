import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";

export const useAuth = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  //đăng nhập
  const onLogin = async (phoneString, passwordString) => {
    showLoading();
    const gmailString = `${phoneString}@gmail.com`;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        gmailString,
        passwordString
      );
      hideLoading();
      return {
        userCredential: userCredential,
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      if (error.code == 'auth/invalid-credential') {
        return {
          error: {message: "Incorrect password"},
          isSuccessful: false,
        };
      }
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  //đky
  const onRegister = async (dataRegister) => {
    showLoading();
    const gmailString = `${dataRegister.phoneNumber}@gmail.com`;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        gmailString,
        dataRegister.password
      );
      const userInfo = {
        phoneNumber: dataRegister.phoneNumber,
        password: dataRegister.password,
        email: dataRegister.email,
        fullName: dataRegister.fullName,
        token: userCredential.user.uid,
      };

      const userRef = doc(db, "Users", userCredential.user.uid);
      await setDoc(userRef, userInfo);

      hideLoading();
      return {
        userCredential: userCredential,
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

  //lấy infos
  const onGetUserInfo = async (userToken) => {
    showLoading();
    try {
      if (!userToken) {
        hideLoading();
        return {
          error: "Unauthorized access!",
          isSuccessful: false,
        };
      }
      const userRef = doc(db, "Users", userToken);
      const docSnap = await getDoc(userRef);
      hideLoading();
      return {
        userData: docSnap.data(),
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
  const onUpdateUserInfo = async (data) => {
    showLoading();
    try {
      if (!authenticationReducer.accountNumber) {
        hideLoading();
        return {
          error: "Unauthorized access!",
          isSuccessful: false,
        };
      }
      const userRef = doc(db, "Users", authenticationReducer.accountNumber);
      await setDoc(userRef, data, { merge: true });
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
    onLogin,
    onRegister,
    onGetUserInfo,
    onUpdateUserInfo,
  };
};
