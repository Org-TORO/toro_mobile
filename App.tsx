import { NavigationContainer } from "@react-navigation/native";
import AppRoute from "./src/infra/routes/app.route";


export default function App() {
  return (
    <NavigationContainer>
      <AppRoute />
    </NavigationContainer>
  );
}