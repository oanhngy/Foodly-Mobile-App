import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login';
import { OnBoardingScreen } from '../screens/OnBoarding';
import { RegisterScreen } from '../screens/Register';


const Stack = createNativeStackNavigator();

export const AuthenticationRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'OnBoarding'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
