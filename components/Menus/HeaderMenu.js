import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderMenu = () => {
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  //logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("logout Successfully");
  };

  return (
    <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("Notification")}>
        <Ionicons
          name="notifications"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={"red"}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
  iconsContainer:{
    flexDirection: "row",
    gap:40
  }
});

export default HeaderMenu;
