import { NavigationContainer } from "@react-navigation/native";
import AppRoute from "./src/infra/routes/app.route";
import { setupInterceptors } from "./src/infra/api/interceptor";


setupInterceptors();


export default function App() {

  return (
    <NavigationContainer>
      <AppRoute />
    </NavigationContainer>
  );
}