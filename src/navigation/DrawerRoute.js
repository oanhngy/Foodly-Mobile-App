import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabRoute } from "./TabRoute";
import { CustomDrawer } from "./components/CustomDrawer";
import { OrderScreen } from "../screens/Order";


const Drawer = createDrawerNavigator();

export const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}

    >
      <Drawer.Screen name="TabRoute" component={TabRoute} options={{
        drawerItemStyle: { display: 'none' }
      }} />
    
      {/* <Drawer.Screen name="Order" component={OrderScreen} options={{ drawerLabel: 'Order history' }}
      /> */}

    </Drawer.Navigator>
  );
};
