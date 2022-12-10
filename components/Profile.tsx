import * as React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useColorScheme } from "nativewind";
import { useAtom, atom } from "jotai";
import { userToken, isUserReady, user } from "../navigation";
import axios from "axios";
import { getValueFor, save } from "../screens/Login";

const Profile = () => {
  const [token, setToken] = useAtom(userToken);
  const [isReady, setIsReady] = useAtom(isUserReady);
  const [userData, setUserData] = useAtom(user);

  const handleLogout = async () => {
    try {
      await save("token", "");
      setToken(null);
      setIsReady(false);
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-200 dark:bg-black">
      {/** CREATE A PROFILE SECTION WITH AN IMAGE */}
      <View className="flex flex-col items-center justify-center">
        <Image
          className="w-32 h-32 rounded-full"
          source={{
            uri: `https://ui-avatars.com/api/?name=${
              userData?.name || "John Doe"
            }?rounded=true?size=128`,
          }}
        />
        <Text className="text-2xl text-white font-bold mt-2">
          {userData?.name}
        </Text>
        <Text className="text-lg text-white font-bold mt-2">
          Hello, I am {userData?.name}
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="flex items-center justify-center mt-4 w-80 h-10 mb-4 bg-blue-500 rounded-md"
        >
          <Text className="text-white">LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
