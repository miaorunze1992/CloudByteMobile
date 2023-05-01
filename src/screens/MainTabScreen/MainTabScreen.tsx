import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../SubTabScreens/HomeScreen";
import ItemScreen from "../SubTabScreens/ItemScreen";
import MessageScreen from "../SubTabScreens/MessageScreen";
import PersonalScreen from "../SubTabScreens/PersonalScreen";

import { ThemeContext } from "../../components/context";

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "主页",
          tabBarColor: theme.colors.mainBackground,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Item"
        component={ItemScreen}
        options={{
          tabBarLabel: "事项",
          tabBarColor: theme.colors.mainBackground,
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: "消息",
          tabBarLabel: "消息",
          tabBarColor: theme.colors.mainBackground,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarLabel: "个人",
          tabBarColor: theme.colors.mainBackground,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;