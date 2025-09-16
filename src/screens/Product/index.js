import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon } from "@rneui/base";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import {
  formatDollarPrice,
  formatVndPrice,
} from "../../helpers/currencyHelper";
import { useCart } from "../../services/cart";

const sizeList = ["S", "L", "XL"];

const toppingData = [
  {
    id: 1,
    title: "Cheese",
    price: 20000,
    quantity: 0,
  },
  {
    id: 2,
    title: "Tomato",
    price: 5000,
    quantity: 0,
  },
  {
    id: 3,
    title: "Onion",
    price: 10000,
    quantity: 0,
  },
  {
    id: 4,
    title: "Beef",
    price: 30000,
    quantity: 0,
  },
];

const TopingItem = ({ id, title, price, quantity, onUpdateTopping }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  // const [quantity, setQuantity] = useState(1);
  const styles = useStyles(theme);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.quantityContainerSmall}>
        <TouchableOpacity
          style={styles.quantityButtonSmall}
          onPress={() => onUpdateTopping(id, quantity - 1)}
        >
          <Icon name="remove" size={20} />
        </TouchableOpacity>
        <AppText style={styles.quantityTextSmall}>{quantity}</AppText>
        <TouchableOpacity
          style={styles.quantityButtonSmall}
          onPress={() => onUpdateTopping(id, quantity + 1)}
        >
          <Icon name="add" size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} />
      <AppText style={styles.topingText}>{title}</AppText>
      <AppText style={styles.topingText}>{formatVndPrice(price)}</AppText>
    </View>
  );
};

export const ProductScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [selectedSize, setSelectedSize] = useState(sizeList[0]);
  const [quantity, setQuantity] = useState(1);
  const [topping, setTopping] = useState(toppingData);
  const productData = route?.params?.product;
  const [totalPrice, setTotalPrice] = useState(productData.price);
  const [note, setNote] = useState("");
  const { onAddCart } = useCart();

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const onPressAddToCart = async () => {
    const selectedTopping = topping.filter((item) => item.quantity > 0);
    const res = await onAddCart(productData, quantity, selectedSize, selectedTopping, totalPrice, note);
    if (res.isSuccessful) {
      navigation.goBack();
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: res.error.message,
      });
    }
  };

  const onUpdateTopping = (id, quantity) => {
    if (quantity < 0) {
      return;
    }
    const newTopping = topping.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setTopping(newTopping);
  };

  useEffect(() => {
    const total = topping.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, productData.price * quantity);
    setTotalPrice(total);
  }, [topping, quantity]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader title={"Option"} onPressLeft={() => navigation.goBack()} />

        <Image
          source={
            productData.image ? { uri: productData.image } : images.product
          }
          style={styles.productImage}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.rowContainer}>
            <AppText h4>{productData.name}</AppText>
            <View style={{ flex: 1 }} />
            <AppText primary subtitle1>
              {formatVndPrice(productData.price)}
            </AppText>
          </View>
          <AppText style={styles.productDescription}>
            {productData.description}
          </AppText>

          <View style={styles.rowContainer}>
            <AppText style={styles.title}>Quantity</AppText>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity - 1)}
              >
                <Icon name="remove" size={24} />
              </TouchableOpacity>
              <AppText style={styles.quantityText}>{quantity}</AppText>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Icon name="add" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.rowContainer}>
            <AppText style={[styles.title, { marginVertical: 0 }]}>
              Size
            </AppText>
            <View>
              <FlatList
                data={sizeList}
                horizontal
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.sizeItem,
                      {
                        backgroundColor:
                          selectedSize == item
                            ? theme.colors.secondary
                            : "#ECF1F6",
                      },
                    ]}
                    onPress={() => setSelectedSize(item)}
                  >
                    <AppText
                      h5
                      style={{
                        color: selectedSize == item ? "white" : "#434E58",
                      }}
                    >
                      {item}
                    </AppText>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <AppText style={styles.title}>Toping</AppText>
          <FlatList
            scrollEnabled={false}
            data={topping}
            ItemSeparatorComponent={() => <View style={styles.line} />}
            renderItem={({ item }) => (
              <TopingItem {...item} onUpdateTopping={onUpdateTopping} />
            )}
          />
          <View></View>
          <AppText style={styles.title}>Notes</AppText>

          <TextInput
            style={styles.notes}
            multiline
            value={note}
            onChangeText={(text) => setNote(text)}
            placeholder={
              "Do you have something to say to the restaurant? Are not ?"
            }
          />
          <AppButton
            title={`Add to Cart - ${formatVndPrice(totalPrice)}`}
            onPress={() => onPressAddToCart()}
          />
        </View>
      </ScrollView>

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
