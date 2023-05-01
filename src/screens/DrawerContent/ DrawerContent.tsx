import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

import { AuthContext } from "../../components/context";

export function DrawerContent(props: any) {
  const paperTheme = useTheme();
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  console.log(props);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../../assets/avatar/lufei.jpeg")}
                size={150}
                {...(props as any)}
              />
              <View
                style={{
                  marginLeft: 15,
                  marginTop: 50,
                  flexDirection: "column",
                }}
              >
                <Title style={styles.title}>苗　潤澤</Title>
                <Caption style={styles.caption}>教员</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  @メール
                </Paragraph>
                <Caption style={styles.caption}>
                  byo.juntaku@cloudbyte.jp
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection} {...props}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="首页"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="format-list-bulleted" color={color} size={size} />
              )}
              label="事项"
              onPress={() => {
                props.navigation.navigate("Item");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bell-outline" color={color} size={size} />
              )}
              label="消息"
              onPress={() => {
                props.navigation.navigate("Message");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="个人"
              onPress={() => {
                props.navigation.navigate("Personal");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-check-outline" color={color} size={size} />
              )}
              label="日历"
              onPress={() => {
                props.navigation.navigate("Calendar");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="briefcase-outline" color={color} size={size} />
              )}
              label="勤务"
              onPress={() => {
                props.navigation.navigate("BookmarkScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog" color={color} size={size} />
              )}
              label="系统"
              onPress={() => {
                props.navigation.navigate("SettingsScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="face-agent" color={color} size={size} />
              )}
              label="支援"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="偏好" {...props}>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
              {...props}
            >
              <View style={styles.preference}>
                <Text {...props} style={[styles.paragraph]}>
                  暗黑主题
                </Text>
                <View pointerEvents="none">
                  <Switch
                    value={paperTheme.dark}
                    trackColor={{
                      false: paperTheme.dark
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.5)",
                      true: paperTheme.dark
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.7)",
                    }}
                    {...props}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection} {...props}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="登出"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
