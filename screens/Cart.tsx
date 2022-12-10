import { SafeAreaView } from "react-native";
import { RootTabScreenProps } from "../types";
import CartList from "../components/CartList";

export default function Cart({ navigation }: RootTabScreenProps<"Cart">) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <CartList />
    </SafeAreaView>
  );
}
