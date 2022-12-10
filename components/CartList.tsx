import * as React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "nativewind";
import { useAtom } from "jotai";
import { cartAtom } from "../screens/Home";
import CartCard from "./CartCard";

export default function CartList() {
  const { colorScheme } = useColorScheme();
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <SafeAreaView className="w-full text-white px-5 flex-1">
      <View className="flex flex-row justify-between items-center my-5">
        <Text className="text-2xl text-white font-bold">Cart</Text>
        <View className="flex flex-col items-center">
          <Text className="text-lg text-white font-bold">
            {cart.length} items
          </Text>
        </View>
      </View>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View className="flex flex-row justify-between items-center my-2">
        <Text className="text-2xl text-white font-bold">Total</Text>
        <View className="flex flex-col items-center">
          <Text className="text-lg text-white font-bold">
            ${" "}
            {cart.reduce((acc, item) => {
              if (item.count) {
                return acc + item.price * item.count;
              }
              return acc + item.price;
            }, 0)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-2"
        style={{
          backgroundColor: colorScheme === "dark" ? "#1F2937" : "#F9FAFB",
        }}
      >
        <Text className="text-center text-lg text-black dark:text-white font-bold">
          Proceed To Checkout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
