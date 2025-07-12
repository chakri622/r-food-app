import { CustomInputProps } from "@/type";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import cn from "clsx";

const CustomInput = ({
  placeholder = "Enter text",
  value = "",
  onChangeText = () => {},
  label = "",
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocussed, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        className={cn(
          "input",
          isFocussed ? "border-primary" : "border-gray-300"
        )}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default CustomInput;
