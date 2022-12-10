import { RootTabScreenProps } from "../types";
import { SafeAreaView, View, Text } from "react-native";
import { useColorScheme } from "nativewind";
import UserProfile from "../components/Profile";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      <UserProfile />
    </SafeAreaView>
  );
}
