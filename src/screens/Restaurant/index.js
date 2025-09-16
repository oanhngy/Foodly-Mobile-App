import { Ionicons } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { ProductItemSmall } from "../../components/modules/ProductItemSmall";
import { HookHelper } from "../../helpers";
import {
  formatLargeNumber,
  formatNumber,
  formatVndPrice,
} from "../../helpers/currencyHelper";
import { db } from "../../../firebaseConfig";
import { useGetNavigation, useAppSelector } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { ProductItem } from "../../components/modules/ProductItem";

const CategoryItem = ({ title, value, setValue }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: value === title ? theme.colors.secondary : "#ECF1F6",
        },
      ]}
      onPress={() => setValue(title)}
    >
      <AppText
        h6
        style={{
          color: value === title ? "white" : "#434E58",
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export const RestaurantScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const [categoryList, setCategoryList] = useState(["For you"]);
  const [category, setCategory] = useState("For you");
  const [isFavorite, setIsFavorite] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const restaurant = route?.params?.restaurant;

  const fetchProductList = async () => {
    const collectionRef = collection(db, "Products");
    const q = query(collectionRef, where("id", "in", restaurant.products));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    const allProduct = groupByType(documents);
    allProduct["For you"] = documents.slice(0, 5);
    const categories = Object.keys(allProduct).reverse();
    setCategoryList(categories);
    setProductList(allProduct);
  };

  const groupByType = (products) => {
    return products.reduce((acc, product) => {
      const { type } = product;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(product);
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchProductList();
  }, []);
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

  const getTotalCart = () => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.totalPrice;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backContainer}
          >
            <Icon name="chevron-left" size={25} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        <Image
          source={
            restaurant.image ? { uri: restaurant.image } : images.restaurant
          }
          style={styles.restaurantImage}
        />

        <View style={styles.avatarContainer}>
          <Image
            source={
              restaurant.image ? { uri: restaurant.image } : images.restaurant
            }
            style={styles.restaurantAvatar}
          />
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.rowContainer}>
            <View style={{ flex: 1 }}>
              <AppText h2 style={{ marginTop: 12 }}>
                {restaurant.name}
              </AppText>

              <AppText>{restaurant.address}</AppText>
              <AppText style={{ color: "#3D843C", marginVertical: 4 }}>
                {restaurant.status}
              </AppText>
            </View>
            <View>
              <Icon
                name={isFavorite ? "favorite" : "favorite-border"}
                size={20}
                color={isFavorite ? theme.colors.primary : "#78828A"}
                onPress={() => setIsFavorite(!isFavorite)}
              />
              <Ionicons
                name="information-circle-outline"
                size={22}
                style={{ top: 20 }}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <Icon name="star" size={16} color={"#E3B054"} />
            <AppText style={styles.productDescription}>
              {restaurant.rating} ({formatNumber(restaurant.ratingNumber)})
            </AppText>
            <Image source={images.cart} style={styles.cartIcon} />
            <AppText style={styles.productDescription}>
              {formatLargeNumber(restaurant.orders)} orders
            </AppText>
            <View style={{ flex: 1 }} />
            <AppText style={styles.productDescription} overline>
              Reviews
            </AppText>
          </View>

          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              data={categoryList}
              renderItem={({ item }) => (
                <CategoryItem
                  title={item}
                  value={category}
                  setValue={setCategory}
                />
              )}
              keyExtractor={(key, index) => index.toString()}
              horizontal
            />
          </View>

          <View style={styles.rowContainer}>
            <AppText h5 style={{ flex: 1 }}>
              {`${category}`}
            </AppText>
            <Icon name="chevron-right" size={24} />
          </View>
          <FlatList
            contentContainerStyle={styles.categoryList}
            data={productList[category] || []}
            renderItem={({ item }) => <ProductItemSmall {...item} />}
            keyExtractor={(key, index) => index.toString()}
            horizontal
          />

          <AppText h5 style={{ flex: 1 }}>
            {`${category}`}
          </AppText>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.categoryList}
            data={productList[category] || []}
            renderItem={({ item }) => <ProductItem {...item} />}
            keyExtractor={(key, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => navigation.navigate("Cart")}
      >
        <View style={styles.quantityContainer}>
          <AppText style={{ fontSize: 18 }}>x{cartList.length}</AppText>
        </View>
        <AppText
          white
          h5
          style={{
            flex: 1,
            marginStart: 16,
          }}
        >
          {formatVndPrice(getTotalCart())}
        </AppText>
        <AppText white h5>
          Checkout
        </AppText>
        <Icon name="chevron-right" size={36} color={"white"} />
      </TouchableOpacity>
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
