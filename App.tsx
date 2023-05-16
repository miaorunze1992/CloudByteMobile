// App.tsx
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store/store.js";

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import { AuthContext } from "./src/components/context";
import { ThemeContext } from "./src/components/context";

import {
  login,
  logout,
  register,
  retrieveToken,
} from "./src/store/actions/authActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RootStackScreen from "./src/screens/Base/BaseStackScreen";

const Drawer = createDrawerNavigator();
import { DrawerContent } from "./src/screens/DrawerContent/ DrawerContent";

import MainTabScreen from "./src/screens/MainTabScreen/MainTabScreen";
import ItemScreen from "./src/screens/SubTabScreens/ItemScreen";
import MessageScreen from "./src/screens/SubTabScreens/MessageScreen";
import PersonalScreen from "./src/screens/SubTabScreens/PersonalScreen";
import CalendarScreen from "./src/screens/CalendarScreen/Calendar";
import HomeScreen from "./src/screens/SubTabScreens/HomeScreen";

import AttendanceStats from "./src/screens/CalendarScreen/AttendanceStats";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
      mainBackground: "#0088CC",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
      mainBackground: PaperDarkTheme.colors.background,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const authContext = React.useMemo(
    () => ({
      // 登入
      signIn: async (foundUser: any) => {
        const userToken = String(foundUser.token);
        const user = foundUser.user;

        console.log("=============login信息详情start==========");
        console.log("token:" + userToken);
        console.log("用户姓名:" + user);
        console.log("=============login信息详情end==========");

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.log(error);
        }
        dispatch(login(user, userToken));
      },
      // 登出
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("user");
        } catch (error) {
          console.log(error);
        }
        dispatch(logout());
      },
      // 注册
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      // 主题切换以及保存
      toggleTheme: async () => {
        setIsDarkTheme((isDarkTheme) => {
          try {
            AsyncStorage.setItem("theme", JSON.stringify(!isDarkTheme));
          } catch (error) {
            console.log(error);
          }
          return !isDarkTheme;
        });
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken,
        theme,
        user = null;
      let userStr: any;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        userStr = await AsyncStorage.getItem("user");
        user = JSON.parse(userStr);
        theme = await AsyncStorage.getItem("theme");
        if (theme !== null) setIsDarkTheme(JSON.parse(theme));
      } catch (error) {
        console.log(error);
      }
      console.log("重启APP,验证用户是否登录. user token", userToken);
      console.log("重启APP,提取主题. 主题颜色", theme);
      console.log("重启APP,提取用户信息", user);
      dispatch(retrieveToken(user, userToken));
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <ThemeContext.Provider value={theme}>
            <NavigationContainer theme={theme}>
              {loginState.userToken !== null ? (
                <Drawer.Navigator
                  drawerContent={(props) => <DrawerContent {...props} />}
                >
                  <Drawer.Screen
                    name="Main"
                    component={MainTabScreen}
                    options={{
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      title: "首页",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="Item"
                    component={ItemScreen}
                    options={{
                      title: "事项",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="Message"
                    component={MessageScreen}
                    options={{
                      title: "消息",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="Personal"
                    component={PersonalScreen}
                    options={{
                      title: "个人",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                      title: "日历",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                  <Drawer.Screen
                    name="AttendanceStats"
                    component={AttendanceStats}
                    options={{
                      title: "考勤统计",
                      headerStyle: {
                        backgroundColor: theme.colors.mainBackground,
                      },
                      headerTintColor: "#fff",
                    }}
                  />
                </Drawer.Navigator>
              ) : (
                <RootStackScreen />
              )}
            </NavigationContainer>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
