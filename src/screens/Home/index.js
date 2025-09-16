import { Icon } from "@rneui/themed";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
  orderBy
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../assets";
import { db } from "../../../firebaseConfig";
import AppText from "../../components/atoms/AppText";
import { ProductItemSmall } from "../../components/modules/ProductItemSmall";
import { SliderBox } from "../../components/modules/SliderBox/SliderBox";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import { ProductItem } from "../../components/modules/ProductItem";
import useStyles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useAddress } from "../../services/address";

const voucherData = [
  {
    id: "1",
    title: "Áp dụng 02 voucher mỗi đơn",
    image: images.banner,
  },
  {
    id: "2",
    title: "Áp dụng 02 voucher mỗi đơn",
    image: images.banner,
  },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CategoryItem = ({ title, image }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  return (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("SearchDetail", { type: title })}
    >
      <Image source={{ uri: image }} style={styles.categoryIcon} />
      <AppText body2>{title}</AppText>
    </TouchableOpacity>
  );
};

const SpecialOffer = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View>
      <AppText h4 style={[styles.body, { marginBottom: 16 }]}>
        Special offer
      </AppText>

      <SliderBox
        images={[images.banner, images.banner, images.banner, images.banner]}
      />
    </View>
  );
};

const Category = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const subscriber = onSnapshot(collection(db, "Category"), (snapshot) => {
      const temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setCategories(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <FlatList
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        numColumns={4}
        contentContainerStyle={styles.categoryList}
        data={categories}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        renderItem={({ item }) => (
          <CategoryItem title={item.title} image={item.image} />
        )}
        keyExtractor={(key, index) => index.toString()}
      />
    </View>
  );
};

const DiscountProduct = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    const productsQuery = query(
      collection(db, "Products"),
      where("sale", ">", 0)
    );
    const subscriber = onSnapshot(productsQuery, (snapshot) => {
      const temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setDiscountProduct(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.rowContainer}>
        <AppText h4 style={{ flex: 1 }}>
          Discount guaranteed!
        </AppText>
        <Icon name="chevron-right" size={24} />
      </View>

      <FlatList
        contentContainerStyle={styles.categoryList}
        data={discountProduct}
        renderItem={({ item }) => <ProductItemSmall {...item} />}
        keyExtractor={(key, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const VoucherList = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.body}>
      <FlatList
        contentContainerStyle={styles.categoryList}
        data={voucherData}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Image source={item.image} style={styles.voucherImage} />
              <AppText subtitle3>{item.title}</AppText>
            </View>
          );
        }}
        keyExtractor={(key, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const DeliciousProduct = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    const productsQuery = query(
      collection(db, "Products"),
      orderBy("rating", "desc"),
      limit(6)
    );
    const subscriber = onSnapshot(productsQuery, (snapshot) => {
      let temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      temp = shuffleArray(temp);
      setDiscountProduct(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.rowContainer}>
        <AppText h4 style={{ flex: 1 }}>
          What's delicious around here?
        </AppText>
        <Icon name="chevron-right" size={24} />
      </View>

      <FlatList
        contentContainerStyle={styles.categoryList}
        data={discountProduct}
        renderItem={({ item }) => <ProductItemSmall {...item} />}
        keyExtractor={(key, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const HighlightsProduct = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    const productsQuery = query(collection(db, "Products"), orderBy("rating", "desc"), limit(6));
    const subscriber = onSnapshot(productsQuery, (snapshot) => {
      let temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      temp = shuffleArray(temp);
      setDiscountProduct(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.rowContainer}>
        <AppText h4 style={{ flex: 1 }}>
          Highlights of March
        </AppText>
        <Icon name="chevron-right" size={24} />
      </View>

      <FlatList
        contentContainerStyle={styles.categoryList}
        data={discountProduct}
        renderItem={({ item }) => <ProductItemSmall {...item} />}
        keyExtractor={(key, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const RestaurantList = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const subscriber = onSnapshot(collection(db, "Restaurants"), (snapshot) => {
      const temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setRestaurants(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.rowContainer}>
        <AppText h4 style={{ flex: 1 }}>
          Nearby Restaurants
        </AppText>
        <Icon name="chevron-right" size={24} />
      </View>

      <FlatList
        contentContainerStyle={styles.categoryList}
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("Restaurant", { restaurant: item })
              }
            >
              <Image
                source={item.image ? { uri: item.image } : images.restaurant}
                style={styles.restaurantImage}
              />
              <AppText italic body3>
                {item.name}
              </AppText>
              <View style={styles.rowContainer}>
                <Icon name="place" size={16} color={"#66707A"} />
                <AppText subtitle3 numberOfLines={1} style={{ maxWidth: 200 }}>
                  {item.address}
                </AppText>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(key, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const Recommended = (props) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    const subscriber = onSnapshot(query(collection(db, "Products"), orderBy("rating", "desc"), limit(6)), (snapshot) => {
      const temp = [];
      snapshot.forEach((documentSnapshot) => {
        temp.push(documentSnapshot.data());
      });
      setDiscountProduct(temp);
    });

    return () => subscriber();
  }, []);
  return (
    <View style={styles.body}>
      <AppText h4>Recommended For You</AppText>

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={styles.categoryList}
        data={discountProduct}
        renderItem={({ item }) => <ProductItem {...item} />}
        keyExtractor={(key, index) => index.toString()}
      />
    </View>
  );
};

export const HomeScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [searchText, setSearchText] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const { onGetSelectedAddress } = useAddress();

  const getSelectedAddress = async () => {
    const response = await onGetSelectedAddress();
    if (response.isSuccessful) {
      setCurrentAddress(response.selectedAddress);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSelectedAddress();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuContainer}
          >
            <Icon name="menu" size={30} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <AppText style={styles.deliverText}>
              {currentAddress?.address ?? ""}
            </AppText>
            <Icon name="chevron-right" size={24} />
          </View>
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => navigation.navigate("Cart")}
          >
            <Image source={images.cart} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.exploreSearchInput}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Image source={images.searchIcon} style={styles.searchIcon} />
          <TextInput
            editable={false}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => {}}
            placeholder={"What are you looking for?"}
            placeholderTextColor={"#9CA4AB"}
          />
        </TouchableOpacity>

        <SpecialOffer />
        <Category />
        <DiscountProduct />
        <TouchableOpacity style={styles.body}>
          <Image source={images.banner2} style={styles.bannerImage} />
        </TouchableOpacity>
        <DeliciousProduct />
        <VoucherList />
        <HighlightsProduct />
        <RestaurantList />
        <Recommended />
      </ScrollView>
    </View>
  );
};
