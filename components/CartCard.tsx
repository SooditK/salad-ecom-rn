import * as React from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useAtom } from "jotai";
import { cartAtom } from "../screens/Home";
import { ProductCardProps } from "./ProductCard";

export default function CartCard({
  image,
  id,
  category,
  title,
  count,
}: ProductCardProps) {
  const [cart, setCart] = useAtom(cartAtom);
  const { colorScheme } = useColorScheme();

  function handleRemove() {
    if (count && count > 1) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            if (item.count && item.count > 1) {
              item.count -= 1;
            }
          }
          return item;
        })
      );
    }
  }

  function handleAdd() {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.count) {
            item.count += 1;
          }
        }
        return item;
      })
    );
  }

  function handleRemoveFromCart() {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <View className="w-full bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5">
      <View className="bg-white rounded-xl">
        <Image
          source={{ uri: image }}
          className={"w-full h-72"}
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="mt-5">
        <Text className={"text-sm text-black/60 dark:text-white/70"}>
          {category}
        </Text>
        <Text className={"text-lg font-semibold dark:text-white"}>{title}</Text>
        <View className={"flex-row justify-between items-center my-3"}>
          <View className={"flex-row items-center gap-3"}>
            <AntDesign
              name="minuscircleo"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={handleRemove}
            />
            <Text className={"text-2xl font-extrabold dark:text-white"}>
              {count}
            </Text>
            <AntDesign
              name="pluscircleo"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
              onPress={handleAdd}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleRemoveFromCart}
          className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 p-3 w-10/12 self-center mt-5"
        >
          <Text className="text-white dark:text-black font-bold">
            Remove From Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
