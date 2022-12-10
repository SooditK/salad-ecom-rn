import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { atom, useAtom } from "jotai";
import { userToken } from "../navigation";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return;
  }
}

export interface APIObject {
  success: boolean;
  token: string;
}

export default function Login() {
  const [token, setToken] = useAtom(userToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    } else if (validateEmail(email) === false) {
      alert("Please enter a valid email.");
      return;
    } else {
      try {
        const response = await axios.post<APIObject>(
          "https://api.langdatyagi.tk/api/login",
          {
            email: email,
            password: password,
          }
        );
        if (response.data.success === true) {
          setToken(response.data.token);
          await save("token", response.data.token);
        } else {
          alert("Invalid credentials.");
        }
      } catch (error) {
        alert("Invalid credentials.");
      }
    }
  };

  return (
    <View className="flex flex-col items-center justify-center h-screen">
      <Image
        className="w-40 h-40 mb-10"
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
          // uri: "https://img.freepik.com/premium-vector/vintage-clothing-store-logo-design-template-vector-illustration_500223-479.jpg",
        }}
      />

      <StatusBar style="auto" />
      <View className="mb-3">
        <TextInput
          className="flex px-4 items-center justify-center w-80 h-10 bg-blue-200 rounded-md"
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View>
        <TextInput
          className="flex px-4 items-center justify-center w-80 h-10 mb-4 bg-blue-200 rounded-md"
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        onPress={login}
        className="flex items-center justify-center w-80 h-10 mb-4 bg-blue-500 rounded-md"
      >
        <Text className="text-white">LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
