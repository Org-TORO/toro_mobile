import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";


function HomeScreen() {

    const router = useRouter();

    return (
        <View>
            <Text>
                Home Screen
            </Text>

            <Button 
                title="Login" 
                onPress={() => router.push("/login")}
            />
        </View>
    )
}


export default HomeScreen;
