import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { isUsernameValid, isPasswordValid } from "../../utils/validators";
import {
  ERROR_INPUT,
  USERNAME_PASSWORD_EMPTY,
  OK_TEXT,
  LOGIN_INVALID,
  USERNAME_PASSWORD_WRONG,
  CONTEXT_SETUP,
} from "../../utils/message";

import { AuthContext } from "../../components/context";

import Users from "../../model/users";

import styles from "./styles";


const SignInScreen = () => {

  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);
  // 检测用户名长度
  const handleUserChange = (val: any) => {
    setData({
      ...data,
      username: val,
      check_textInputChange: isUsernameValid(val),
      isValidUser: isUsernameValid(val),
    });
  };

  // 检测密码长度
  const handlePasswordChange = (val: any) => {
    setData({
      ...data,
      password: val,
      isValidPassword: isPasswordValid(val),
    });
  };

  // 密码是否可见
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  // 登录按钮
  const loginHandle = (userName: any, password: any) => {
    const foundUser = Users.filter((item) => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(ERROR_INPUT, USERNAME_PASSWORD_EMPTY, [{ text: OK_TEXT }]);
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert(LOGIN_INVALID, USERNAME_PASSWORD_WRONG, [{ text: OK_TEXT }]);
      return;
    }

    signIn(foundUser);
    console.log(CONTEXT_SETUP);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={2500}
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.text_header}>
          CloudByte株式会社アプリへ、ようこそ!
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          ユーザー名
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="black" size={20} />
          <TextInput
            placeholder="ユーザー名を入力してください"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handleUserChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="#0088CC" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>ユーザー名は8文字以下である必要があります</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          パスワード
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="black" size={20} />
          <TextInput
            placeholder="パスワードを入力してください"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#0088CC" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>パスワードは8文字から16文字の長さである必要があります</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#0088CC", marginTop: 15 }}>パスワードをお忘れの方</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            <LinearGradient
              colors={["#0088CC", "#0088CC"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                ログイン
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
