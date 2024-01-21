import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
  placeholder
}) => {
  return (
    <View className="flex items-center mx-5 space-y-4 mb-3">
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        className="bg-black/5 p-5 rounded-2xl w-full"
      >
        <TextInput
          autoCorrect={false}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholderTextColor={"gray"}
          placeholder={placeholder}
        />
      </Animated.View>
    </View>
  );
};


export default InputBox;
