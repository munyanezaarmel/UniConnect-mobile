import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
  import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Logout() {
    const navigation = useNavigation();
    const [state, setState] = useContext(AuthContext);
    //logout
    const handleLogout = async () => {
      setState({ token: "", user: null });
      await AsyncStorage.removeItem("@auth");
      alert("logout Successfully");
    };
  return (
    <Text>Logout</Text>
  )
}
