import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon } from "@rneui/themed";
import { useState } from "react";
import { Mixin } from "../../helpers";
import { theme } from "../../utils/styles/theme";
import AppText from "../atoms/AppText";
import AppButton from "../atoms/Button";
import RangeSlider from "./RangeSlider";
import { formatVndPrice } from "../../helpers/currencyHelper";

const suggestionList = [
  "Pizza",
  "Vegetarian",
  "Chicken",
  "Noodles",
  "Rice",
  "Ramen",
];

const distanceList = ["<5KM", "5KM - 10KM", ">10KM"];
const CategoryItem = ({ title, onSelect, value }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: value === title ? theme.colors.secondary : "#ECF1F6",
        },
      ]}
      onPress={() => onSelect(title)}
    >
      <AppText
        subtitle3
        style={{
          color: value === title ? "white" : "#434E58",
        }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export const FilterDialog = ({ isVisible, onClose, filterAction }) => {
  const [suggestion, setSuggestion] = useState("");
  const [distance, setDistance] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlayBackground}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
              <Icon name="expand-more" size={40} />
            </TouchableOpacity>

            <AppText style={{ fontSize: 20, textAlign: "center", flex: 1 }}>
              Filter
            </AppText>
          </View>

          <AppText style={styles.title}>Price scale</AppText>

          <RangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinChange={setMinPrice}
            onMaxChange={setMaxPrice}
          />

          <View style={styles.priceContainer}>
            <AppText style={styles.priceText}>{formatVndPrice(minPrice)}</AppText>
            <AppText style={styles.priceText}>{formatVndPrice(maxPrice)}</AppText>
          </View>

          <AppText style={styles.title} italic>
            Suggestion
          </AppText>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={suggestionList}
              renderItem={({ item }) => (
                <CategoryItem
                  title={item}
                  value={suggestion}
                  onSelect={setSuggestion}
                />
              )}
              keyExtractor={(key, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>

          <AppText style={styles.title} italic>
            Distance
          </AppText>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={distanceList}
            renderItem={({ item }) => (
              <CategoryItem
                title={item}
                value={distance}
                onSelect={setDistance}
              />
            )}
            keyExtractor={(key, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
          />

          <AppButton
            title={"Apply"}
            onPress={() => {
              filterAction(minPrice, maxPrice, suggestion, distance);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: Mixin.moderateSize(10),
    width: "100%",
    paddingTop: 24,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ecf0f4",
    padding: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
    marginEnd: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  closeContainer: {
    position: "absolute",
    width: 40,
    height: 40,
    zIndex: 1,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
  },
  overlayBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  priceText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    top: -20,
  },
});
