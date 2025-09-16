import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/Home";
import { TabBar } from "./components/Tabbar";
import { FavouriteScreen } from "../screens/Favourite";
import { OrderScreen } from "../screens/Order";
import { RewardScreen } from "../screens/Reward";

const Tab = createBottomTabNavigator();

export const TabRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        // tabBarBackground: () => (
        //   <View style={{ backgroundColor: 'transparent', width: '100%' }} />
        // ),
        tabBarStyle: {
          backgroundColor: "red",
          position: "absolute",
          height: 100,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="OrderList" component={FavouriteScreen} />
      <Tab.Screen name="Reward" component={RewardScreen} />

    </Tab.Navigator>
  );
};
