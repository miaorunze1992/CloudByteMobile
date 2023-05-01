import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

import HomeScreen from "../SubTabScreens/HomeScreen";
import ItemScreen from "../SubTabScreens/ItemScreen";
import MessageScreen from "../SubTabScreens/MessageScreen";
import PersonalScreen from "../SubTabScreens/PersonalScreen";

import { ThemeContext } from "../../components/context";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  const theme = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState("Home");

  const AnimatedIcon = ({ iconName, color, active }: any) => (
    <Animatable.View
      animation={active ? "tada" : undefined}
      duration={800}
      delay={100}
    >
      <Icon name={iconName} color={color} size={active ? 33 : 24} />
    </Animatable.View>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#d9d9d9",
        tabBarStyle: {
          backgroundColor: theme.colors.mainBackground,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "主页",
          tabBarIcon: ({ color }) => (
            <AnimatedIcon
              iconName="ios-home"
              color={activeTab === "Home" ? "#fff" : "#a9a9a9"}
              active={activeTab === "Home"}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => setActiveTab("Home")}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Item"
        component={ItemScreen}
        options={{
          tabBarLabel: "事项",
          tabBarIcon: ({ color }) => (
            <AnimatedIcon
              iconName="list-outline"
              color={activeTab === "Item" ? "#fff" : "#a9a9a9"}
              active={activeTab === "Item"}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => setActiveTab("Item")}>
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: "消息",
          tabBarIcon: ({ color }) => (
            <AnimatedIcon
              iconName="ios-notifications"
              color={activeTab === "Message" ? "#fff" : "#a9a9a9"}
              active={activeTab === "Message"}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => setActiveTab("Message")}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarLabel: "个人",
          tabBarIcon: ({ color }) => (
            <AnimatedIcon
              iconName="ios-person"
              color={activeTab === "Personal" ? "#fff" : "#a9a9a9"}
              active={activeTab === "Personal"}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => setActiveTab("Personal")}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
