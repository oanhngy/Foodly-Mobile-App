import { Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { ArrangeDialog } from "../../components/modules/ArrangeDialog";
import { FilterDialog } from "../../components/modules/FilterDialog";
import { ProductItem } from "../../components/modules/ProductItem";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import { useHome } from "../../services/home";
import useStyles from "./styles";
const ProductSearch = ({ products }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.body}>
      <AppText body1>325 results searched</AppText>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <ProductItem {...item} />}
        keyExtractor={(key, index) => index.toString()}
      />
    </View>
  );
};

export const SearchDetailScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation, route } = useGetNavigation();
  const searchTerm = route.params?.searchTerm;
  const type = route.params?.type;
  const [searchText, setSearchText] = useState(searchTerm);
  const [showFilter, setShowFilter] = useState(false);
  const [showArrange, setShowArrange] = useState(false);
  const { onSearchProduct, onGetProductByType} = useHome();
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  const searchProduct = async () => {
    const result = await onSearchProduct(searchTerm);
    if (result.isSuccessful) {
      setProducts(result.productList);
      setFilterList(result.productList);
    } else {
      setError(result.error);
      setShowError(true);
    }
  };

  const getProductByType = async (type) => {
    const result = await onGetProductByType(type);
    if (result.isSuccessful) {
      setProducts(result.productList);
      setFilterList(result.productList);
    } else {
      setError(result.error);
      setShowError(true);
    }
  }

  const sortByPrice = (type) => {
    if (type == "1") {
      setFilterList([...filterList].sort((a, b) => a.price - b.price));
    } else if (type == "2") {
      setFilterList([...filterList].sort((a, b) => b.price - a.price));
    } else if (type == "3") {
      setFilterList([...filterList].sort((a, b) => b.distance - a.distance));
    }
  };

  const filterProduct = (minPrice, maxPrice, suggestion, distance) => {
    const filtered = products.filter((product) => {
      const isWithinPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesSuggestion = suggestion ? product.type == suggestion : true;
      let isWithinDistance;
      if (distance == '<5KM') {
        isWithinDistance = product.distance < 5;
      } else if (distance == '5-10KM') {
        isWithinDistance = product.distance >= 5 && product.distance <= 10;
      } else {
        isWithinDistance = product.distance > 10;
      }

      return isWithinPriceRange && matchesSuggestion && isWithinDistance;
    });
    setFilterList(filtered);
  };

  useEffect(() => {
    if (searchTerm) {
      searchProduct();
    }
    if (type) {
      getProductByType(type);
    }
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader
        title="Search"
        center={
          <View style={styles.exploreSearchInput}>
            <Image source={images.searchIcon} style={styles.searchIcon} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => searchProduct()}
              placeholder={"What are you looking for?"}
              placeholderTextColor={"#9CA4AB"}
            />
          </View>
        }
      />
      <View style={styles.topFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => setShowFilter(true)}
          >
            <Icon name="tune" size={20} style={{ marginEnd: 4 }} />
            <AppText h6>Filter</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => setShowArrange(true)}
          >
            <Icon name="swap-vert" size={20} style={{ marginEnd: 4 }} />
            <AppText h6>Arrange</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterContainer}>
            <AppText h6>Promotion</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterContainer}>
            <AppText h6>Opening</AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ overflow: "hidden", paddingBottom: 10 }}>
        <View style={styles.breakLine} />
      </View>
      <View style={{ flex: 1 }}>
        <ProductSearch products={filterList} />
      </View>

      <FilterDialog
        isVisible={showFilter}
        onClose={() => setShowFilter(false)}
        filterAction={(minPrice, maxPrice, suggestion, distance) => filterProduct(minPrice, maxPrice, suggestion, distance)}
      />
      <ArrangeDialog
        isVisible={showArrange}
        onClose={() => setShowArrange(false)}
        filterAction={(arrange) => {
          sortByPrice(arrange);
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
