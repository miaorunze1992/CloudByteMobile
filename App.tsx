// App.tsx
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

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
  loginReducer,
  initialLoginState,
} from "./src/store/reducers/authReducer";
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
import SupportScreen from "./src/screens/SupportScreen/SupportScreen";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import BookmarkScreen from "./src/screens/BookmarkScreen/BookmarkScreen";
import styles from "./src/screens/SignIn/styles";
import { color } from "react-native-reanimated";

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

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      // 登入
      signIn: async (foundUser: any) => {
        // setUserToken('token');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;

        console.log("=============login信息详情start==========");
        console.log("token:" + userToken);
        console.log("用户姓名:" + userName);
        console.log("=============login信息详情end==========");

        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (error) {
          console.log(error);
        }

        console.log("user token:", userToken);
        dispatch(login(userName, userToken));
      },
      // 登出
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
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
      toggleTheme: async() => {
        setIsDarkTheme((isDarkTheme) => {
          try {
            AsyncStorage.setItem("theme", JSON.stringify(!isDarkTheme));
          } catch (error) {
            console.log(error)
          }
          return !isDarkTheme
        });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken,theme = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        theme = await AsyncStorage.getItem("theme");
        if(theme !== null) setIsDarkTheme(JSON.parse(theme));

      } catch (error) {
        console.log(error);
      }
      console.log("重启APP,验证用户是否登录. user token", userToken);
      console.log("重启APP,提取主题. 主题颜色", theme);
      dispatch(retrieveToken(userToken));
      
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
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <ThemeContext.Provider value={theme}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} options={{ title: '主页', headerStyle: { backgroundColor: theme.colors.mainBackground }, headerTintColor: '#fff' }} /> */}
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                />
                <Drawer.Screen
                  name="BookmarkScreen"
                  component={BookmarkScreen}
                />
              </Drawer.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
