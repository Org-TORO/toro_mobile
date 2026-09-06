import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "../../app/public/home.screen";
import LoginScreen from "../../app/auth/login/login.screen";


export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
}

export type NavigationProp = 
    NativeStackNavigationProp<RootStackParamList>


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppRoute() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}