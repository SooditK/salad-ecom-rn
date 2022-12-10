import { RootTabScreenProps } from "../types";
import { SafeAreaView } from "react-native";
import ProductsList from "../components/ProductsList";
import { atom } from "jotai";
import { ProductCardProps } from "../components/ProductCard";

export const cartAtom = atom<ProductCardProps[]>([]);

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <ProductsList />
    </SafeAreaView>
  );
}
