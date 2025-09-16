import { useState } from "react";
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
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

const recentSearch = [
  "Pizza",
  "Pho",
  "Rice",
  "Sushi",
  "Donuts",
  "Ramen",
];

const RecentKeywordItem = ({ title }) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  return (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        navigation.navigate("SearchDetail", { searchTerm: title });
      }}
    >
      <AppText style={styles.recentText}>{title}</AppText>
    </TouchableOpacity>
  );
};

export const SearchScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const [searchText, setSearchText] = useState("");

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
              onSubmitEditing={() => {
                navigation.navigate("SearchDetail", { searchTerm: searchText });
              }}
              placeholder={"What are you looking for?"}
              placeholderTextColor={"#9CA4AB"}
            />
          </View>
        }
        shadow
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <AppText italic body3>
          Recent Keywords
        </AppText>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            data={recentSearch}
            renderItem={({ item }) => <RecentKeywordItem title={item} />}
            keyExtractor={(key, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>

        <AppText italic body3>
          Popular
        </AppText>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            data={recentSearch}
            renderItem={({ item }) => <RecentKeywordItem title={item} />}
            keyExtractor={(key, index) => index.toString()}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};
