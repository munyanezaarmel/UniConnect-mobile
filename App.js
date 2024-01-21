import 'react-native-gesture-handler';
import RootNavigation from "./navigation";


import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
