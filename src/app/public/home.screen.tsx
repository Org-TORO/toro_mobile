import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { NavigationProp } from "../../infra/routes/app.route";


function HomeScreen() {

    const navigation = useNavigation<NavigationProp>();

    return (
        <View>
            <Text>
                Home Screen
            </Text>

            <Button 
                title="Login" 
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )
}


export default HomeScreen;