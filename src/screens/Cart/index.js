import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { Icon } from "@rneui/themed";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { images } from "../../../assets";
import { db } from "../../../firebaseConfig";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { useCart } from "../../services/cart";

const CartItem = ({ id, product, note, quantity, changeAmount }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  const getSalePrice = () => {
    if (product?.sale && product?.sale != 0) {
      return product.price - (product.price * product.sale) / 100;
    }
    return 0;
  };

  return (
    <TouchableOpacity style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={{ flex: 1 }}>
        <AppText h5>{product.name}</AppText>
        <AppText style={styles.note}>{note}</AppText>

        <View style={styles.rowContainer}>
          <AppText primary>
            {formatVndPrice(
              getSalePrice() == 0 ? product.price : getSalePrice()
            )}
          </AppText>
          {getSalePrice() != 0 && (
            <AppText style={styles.realPrice}>
              {formatVndPrice(product.price)}
            </AppText>
          )}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                changeAmount(
                  id,
                  quantity - 1,
                  getSalePrice() == 0 ? product.price : getSalePrice()
                )
              }
            >
              <Icon name="remove" size={20} />
            </TouchableOpacity>
            <AppText style={styles.quantityText}>{quantity}</AppText>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() =>
                changeAmount(
                  id,
                  quantity + 1,
                  getSalePrice() == 0 ? product.price : getSalePrice()
                )
              }
            >
              <Icon name="add" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CartScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [cartList, setCartList] = useState([]);
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { onRemoveProductFromCart } = useCart();
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  useEffect(() => {
    if (!authenticationReducer.accessToken) return;

    const userDocRef = doc(db, "Users", authenticationReducer?.accessToken);
    const cartsCollectionRef = collection(userDocRef, "Carts");

    const unsubscribe = onSnapshot(cartsCollectionRef, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setCartList(temp);
    });

    return () => unsubscribe();
  }, []);

  const changeAmount = async (id, amount, price) => {
    if (!authenticationReducer.accessToken) return;
    const userDocRef = doc(db, "Users", authenticationReducer?.accessToken);
    const cartDocRef = doc(userDocRef, "Carts", id);
    if (amount == 0) {
      await onRemoveProductFromCart(id);
    } else {
      await updateDoc(cartDocRef, {
        quantity: amount,
        totalPrice: price * amount,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader headerStyle={styles.header} title={"Cart"} shadow />
      <View style={styles.body}>
        <FlatList
          data={cartList}
          renderItem={({ item }) => (
            <CartItem {...item} changeAmount={changeAmount} />
          )}
          keyExtractor={(key, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={images.smilingFace}
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />
              <AppText h2 primary style={{ marginVertical: 20 }}>
                No orders
              </AppText>
              <AppText style={styles.emptyDescription}>
                Sorry, you have no orders in your cart, please add your order to
                your cart.
              </AppText>
            </View>
          }
        />
      </View>
      <AppButton
        title={"Payment"}
        onPress={() => {
          if (cartList.length === 0) {
            setShowError(true);
            setError({
              title: "Error",
              description: "Your cart is empty",
            });
            return;
          }
          navigation.navigate("Order", { cartList: cartList })
        }}
        buttonStyle={styles.buttonStyle}
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
