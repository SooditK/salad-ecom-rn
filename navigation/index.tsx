import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Profile from "../screens/Profile";
import { atom, useAtom } from "jotai";
import Login, { getValueFor, save } from "../screens/Login";
import axios from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

export const userToken = atom<string | null>(null);
export const user = atom<User | null>(null);
export const isUserReady = atom<boolean>(false);

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export interface GetUser {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  isAdmin?: boolean;
  message?: string;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [token, setToken] = useAtom(userToken);
  const [loggedInUser, setLoggedInUser] = useAtom(user);
  const [isReady, setIsReady] = useAtom(isUserReady);

  useEffect(() => {
    const getUser = async () => {
      const userToken = await getValueFor("token");
      if (userToken) {
        setToken(userToken);
      }
      try {
        const response = await axios.get<GetUser>(
          "https://api.langdatyagi.tk/api/user",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.data.message === "Unauthorized") {
          setToken(null);
          await save("token", "");
        } else {
          if (
            response.data.isAdmin === true ||
            response.data.isAdmin === false
          ) {
            setToken(userToken as string);
            setIsReady(true);
            setLoggedInUser({
              email: response.data.email as string,
              id: response.data.id as string,
              isAdmin: response.data.isAdmin as boolean,
              name: response.data.name as string,
              password: response.data.password as string,
            });
          } else {
            setToken(null);
            await save("token", "");
          }
        }
      } catch (error) {
        console.log(error);
        setToken(null);
        await save("token", "");
      }
    };

    getUser();
  }, [token, loggedInUser, isReady]);

  return (
    <Stack.Navigator>
      {isReady ? (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} size={20} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size ?? 22}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
