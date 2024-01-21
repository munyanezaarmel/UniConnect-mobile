import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import About from "../../screens/About";
import Account from "../../screens/Account";
import Myposts from "../../screens/Myposts";

import CustomDrawer from '../../components/CustomDrawer'
import Notification from "../../screens/Notification";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import OnboardingScreen from "../../screens/OnBoardingScreen";
const ScreenMenu = () => {
  //global state
  const [state, setState] = useContext(AuthContext);
  //auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  //logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout Successfully");
  };
  return (
    <Drawer.Navigator
      initialRouteName="onBoarding"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
    >
      {authenticatedUser ? (
        <>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Post"
            component={Post}
            options={{
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="plus-square" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Notification"
            component={Notification}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="notifications" size={22} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="Account"
            component={Account}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="person-outline" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Myposts"
            component={Myposts}
            options={{
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="list" size={22} color={color} />
              ),
            }}
          />
         
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
           <Drawer.Screen
            name="onBoarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default ScreenMenu;
