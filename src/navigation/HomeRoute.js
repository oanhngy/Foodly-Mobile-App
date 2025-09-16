import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "../screens/Cart";
import { PersonalInfoScreen } from "../screens/PersonalInfo";
import { ProductScreen } from "../screens/Product";
import { RestaurantScreen } from "../screens/Restaurant";
import { SearchScreen } from "../screens/Search";
import { SearchDetailScreen } from "../screens/SearchDetail";
import { DrawerRoute } from "./DrawerRoute";
import { AssociateBankScreen } from "../screens/AssociateBank";
import { WalletScreen } from "../screens/Wallet";
import { AddressScreen } from "../screens/Address";
import { AddAddressScreen } from "../screens/AddAddress";
import { OrderDetailScreen } from "../screens/OrderDetail";
import { OrderScreen } from "../screens/Order";

const Stack = createNativeStackNavigator();

export const HomeRoute = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerRoute} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchDetail" component={SearchDetailScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="AssociateBank" component={AssociateBankScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
