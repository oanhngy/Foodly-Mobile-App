import { Icon } from "@rneui/themed";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../../components/atoms/AppText";
import { useGetNavigation } from "../../helpers/hookHelper";
import { theme } from "../../utils/styles/theme";
import { formatNumber } from "../../helpers/currencyHelper";
import { useState } from "react";

export const ProductItemSmall = (props) => {
  const {
    id,
    image,
    name,
    price,
    rating,
    ratingNumber,
    sale,
    distance,
    description,
  } = props;
  const { navigation } = useGetNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => {
        navigation.navigate("Product", { product: props });
      }}
    >
      <Image source={{ uri: image }} style={styles.productImage} />
      <View>
        <AppText style={styles.title}>{name}</AppText>
        <View style={styles.rowContainer}>
          <AppText style={styles.subTitle}>{distance} km | </AppText>
          <Icon name="star" size={16} color={"#E3B054"} />
          <AppText style={styles.subTitle}>
            {rating} ({formatNumber(ratingNumber)})
          </AppText>
          <View style={{ flex: 1 }} />
          <Icon
            name={isFavorite ? "favorite" : "favorite-border"}
            size={20}
            color={theme.colors.primary}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </View>
      </View>
      {(sale != 0 || sale != undefined) && (
        <View style={styles.saleContainer}>
          <AppText white style={styles.saleText}>
            {sale}% off your order
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productImage: {
    height: 140,
    width: 200,
    borderRadius: 10,
    resizeMode: "cover",
    alignSelf: "center",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productItem: {
    marginEnd: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subTitle: {
    color: "#78828A",
  },
  saleContainer: {
    backgroundColor: "#332C45",
    borderRadius: 30,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
  },
  saleText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
