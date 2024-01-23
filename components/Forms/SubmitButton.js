import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import React from "react";

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <Animated.View
      className="w-full"
      entering={FadeInDown.delay(400).duration(1000).springify()}
    >
      <TouchableOpacity className="w-full bg-[#8200D6] p-3 rounded-2xl" onPress={handleSubmit}>
        <Text className="text-xl font-bold text-white text-center">
          {loading ? "Please Wait..." : btnTitle}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};



export default SubmitButton;
