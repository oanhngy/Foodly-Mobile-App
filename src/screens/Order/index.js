import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Icon } from "@rneui/themed";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { OrderSuccessDialog } from "../../components/modules/OrderSuccessDialog";
import { HookHelper } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { useHome } from "../../services/home";
import { useAddress } from "../../services/address";
import { useOrder } from "../../services/order";
import { useCart } from "../../services/cart";
import AppHeader from "../../components/atoms/Header";

const OrderItem = ({ id, name, price, quantity, description, image }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.orderContainer}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.quantityContainer}>
        <AppText>{quantity}x</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText h5>{name}</AppText>
        <AppText
          style={{ flex: 1, color: "#78828A", marginTop: 4, paddingRight: 20 }}
          numberOfLines={2}
        >
          {description}
        </AppText>
        <AppText subtitle1 primary>
          {formatVndPrice(price)}
        </AppText>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <View style={styles.editContainer}>
          <Icon name="border-color" size={16} />
        </View>
      </View>
    </View>
  );
};

const OrderProductList = ({ cartList }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  return (
    <View style={styles.tabContainer}>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        data={cartList}
        renderItem={({ item }) => (
          <OrderItem {...item.product} quantity={item.quantity} />
        )}
        keyExtractor={(key, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addItem}>
        <Icon name="add" size={20} />
        <AppText> Add item</AppText>
      </TouchableOpacity>
    </View>
  );
};

const ProductItem = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  return (
    <View style={styles.productItem}>
      <Image
        source={props.image ? { uri: props.image } : images.product}
        style={styles.productImageYou}
      />
      <View style={styles.productAdd}>
        <Icon name="add" size={24} />
      </View>
      <AppText style={{ marginVertical: 4 }}>{props.name}</AppText>
      {props.sale && props.sale > 0 && (
        <View style={styles.saleContainer}>
          <AppText style={styles.saleText}>
            {props.sale}% off your order
          </AppText>
        </View>
      )}
    </View>
  );
};

export const OrderScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation();
  const cartList = route.params?.cartList;
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState();
  const { onGetForYouProduct } = useHome();
  const [productList, setProductList] = useState([]);
  const { onGetSelectedAddress } = useAddress();
  const [currentAddress, setCurrentAddress] = useState();
  const { onCreateOrder } = useOrder();
  const [orderId, setOrderId] = useState();
  const {resetCart} = useCart();

  const getProductForYou = async () => {
    const response = await onGetForYouProduct();
    if (response.isSuccessful) {
      setProductList(response.productList);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const getSelectedAddress = async () => {
    const response = await onGetSelectedAddress();
    if (response.isSuccessful) {
      setCurrentAddress(response.selectedAddress);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const createOrder = async () => {
    if (!currentAddress) {
      setError({
        title: "Error",
        description: "Please add your address",
      });
      setShowError(true);
      return;
    }
    const response = await onCreateOrder(
      getTotalCart(),
      10000,
      currentAddress,
      cartList,
      "Preparing"
    );
    if (response.isSuccessful) {
      await resetCart();
      setOrderId(response.idOrder);
      setShowSuccess(true);
    } else {
      setError({
        title: "Error",
        description: response.error.message,
      });
      setShowError(true);
    }
  };

  const getTotalCart = () => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.totalPrice;
    });
    return total;
  };

  useFocusEffect(
    React.useCallback(() => {
      getProductForYou();
      getSelectedAddress();
      return () => {};
    }, [])
  );

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", zIndex: 1, left: 0, padding: 10 }}
        >
          <Icon name="chevron-left" size={30} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Order</AppText>
      </View> */}
      <AppHeader title={"Order"} shadow />
      {/* <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View> */}
      <ScrollView style={styles.bodyContainer}>
        <View>
          <Image source={images.map} style={styles.map} />
          <TouchableOpacity
            style={styles.spaceBetween}
            onPress={() => navigation.navigate("Address")}
          >
            <Icon name="home-filled" size={24} />
            <View>
              <AppText>{currentAddress?.address}</AppText>
              <AppText>{currentAddress?.phoneNumber}</AppText>
            </View>
            <Icon name="arrow-forward-ios" size={24} />
          </TouchableOpacity>
        </View>

        <OrderProductList cartList={cartList} />

        <AppText style={styles.title}>For you</AppText>

        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          data={productList}
          renderItem={({ item }) => <ProductItem {...item} />}
          keyExtractor={(key, index) => index.toString()}
          horizontal
        />

        <View style={styles.bigLine} />

        <AppText style={styles.title}>Checkout detail</AppText>
        <View style={styles.rowContainer}>
          <AppText style={styles.infoText}>Mastercard</AppText>
          <Icon name="arrow-forward-ios" size={16} />
        </View>

        <View style={styles.line} />

        <View style={styles.rowContainer}>
          <AppText style={styles.infoText}>Enter your promotion code</AppText>
          <Icon name="arrow-forward-ios" size={16} />
        </View>

        <View style={[styles.bigLine, { marginVertical: 16 }]} />

        <View style={[styles.rowContainer, { marginBottom: 16 }]}>
          <AppText style={styles.infoText}>Merchandise Subtotal</AppText>
          <AppText subtitle1>{formatVndPrice(getTotalCart())}</AppText>
        </View>

        <View style={styles.rowContainer}>
          <AppText style={styles.infoText}>Shipping Total</AppText>
          <AppText subtitle1>{formatVndPrice(10000)}</AppText>
        </View>
        <View style={styles.line} />

        <View style={styles.rowContainer}>
          <AppText style={[styles.infoText, { fontWeight: "bold" }]}>
            Total Pament
          </AppText>
          <AppText h5 primary>
            {formatVndPrice(getTotalCart() + 10000)}
          </AppText>
        </View>

        <AppButton
          title={"Checkout"}
          onPress={() => createOrder(true)}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
      <OrderSuccessDialog
        isVisible={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigation.navigate("OrderDetail", { orderId: orderId });
        }}
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
