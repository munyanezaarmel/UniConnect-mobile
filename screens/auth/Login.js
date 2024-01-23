import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //function
  // btn funcn
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  //temp function to check local storage data
  const getLcoalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log(data)
  };
  getLcoalStorageData();
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../../assets/back.png")}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require("../../assets/light.png")}
          className="h-[225] w-[90]"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require("../../assets/light.png")}
          className="h-[160] w-[65] opacity-75"
        />
      </View>

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Login
          </Animated.Text>
        </View>
        <View>
          <View>
            <InputBox
              inputTitle={"Email"}
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              setValue={setEmail}
              placeholder="Enter Email Address"
            />
            <InputBox
              inputTitle={"Password"}
              secureTextEntry={true}
              autoComplete="password"
              value={password}
              setValue={setPassword}
              placeholder="Enter password"
            />
          </View>
          {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
          <View className="m-5">
            <SubmitButton
              btnTitle="Login"
              loading={loading}
              handleSubmit={handleSubmit}
            />
          </View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-[#8200D6]">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Login;
