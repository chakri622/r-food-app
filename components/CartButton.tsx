import { images } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  // This component can be expanded to include cart functionality
  // such as displaying the number of items in the cart, navigating to the cart screen, etc.
  // For now, it simply displays a placeholder text.
  const totalItems = 10; // Placeholder for total items in the cart
  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => console.log("Cart button pressed")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
