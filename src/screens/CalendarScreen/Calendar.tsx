import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../components/context";

import { recordAttendance } from "./Attendance";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation, NavigationProp } from '@react-navigation/native';

const CalendarScreen = () => {

  const navigation = useNavigation<NavigationProp<{AttendanceStats:undefined}, 'AttendanceStats'>>();

  const user = useSelector((state: any) => state);
  const theme = useContext(ThemeContext);

  const mainColor = theme.colors.mainBackground;
  const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const todayTime = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  // 初始化按钮颜色
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // checkIn
  const [isCheckOutButtonDisabled, setIsCheckOutButtonDisabled] =
    useState(true); // checkOut

  const [markedDates, setMarkedDates] = useState({
    [today]: {
      selected: true,
      selectedColor: mainColor,
    },
  });

  const [refresh, setRefresh] = useState(0);

  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setMarkedDates({
      [today]: {
        selected: true,
        selectedColor: mainColor,
      },
    });
    setRefresh((prevRefresh) => prevRefresh + 1);
  }, [mainColor]);

  useEffect(() => {
    const checkAttendance = async () => {
      // await AsyncStorage.removeItem("attendanceDate_checkIn");
      // await AsyncStorage.removeItem("attendanceDate_checkOut");
      const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      const attendanceDate = await AsyncStorage.getItem(
        "attendanceDate_checkIn"
      );

      if (attendanceDate === currentDate) {
        console.log("出勤已经打过卡了");
        // 如果用户今天打过卡，那么button设置成非活性
        setIsButtonDisabled(true);
        setIsCheckOutButtonDisabled(false);
      } else {
        console.log("出勤还没有打过卡");
        // 新的一天或者还没有打卡，清空存储的打卡信息并允许打卡
        await AsyncStorage.removeItem("attendanceDate_checkIn");
        setIsButtonDisabled(false); // 这里应该设置为false，以便用户可以打卡
        setIsCheckOutButtonDisabled(true);
      }

      const attendanceDateCheckOut = await AsyncStorage.getItem(
        "attendanceDate_checkOut"
      );
      if (attendanceDateCheckOut === currentDate) {
        console.log("退勤已经打过卡了");
        // 如果用户今天打过卡，那么button设置成非活性
        setIsCheckOutButtonDisabled(true);
      } 
      // else {
      //   console.log("退勤还没有打过卡");
      //   // 新的一天或者还没有打卡，清空存储的打卡信息并允许打卡
      //   await AsyncStorage.removeItem("attendanceDate_checkOut");
      //   if (isButtonDisabled) {
      //     setIsCheckOutButtonDisabled(false);
      //   } // 这里应该设置为false，以便用户可以打卡
      // }
    };
    // 当应用启动时立即执行一次检查
    checkAttendance();
    // 每隔一小时检查一次日期
    const intervalId = setInterval(checkAttendance, 60 * 60 * 1000);
    // 当组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  const backToToday = () => {
    setMarkedDates({
      [today]: {
        selected: true,
        selectedColor: mainColor,
      },
    });
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  const data = [
    {
      id: "1",
      text: "出勤打卡",
      iconName: "clock-outline",
      isDisabled: isButtonDisabled,
      onPress: async () => {
        const success = await recordAttendance(user, todayTime, "check-in");
        setIsButtonDisabled(success);
        setIsCheckOutButtonDisabled(false);
      },
    },
    {
      id: "2",
      text: "退勤打卡",
      iconName: "clock-out",
      isDisabled: isCheckOutButtonDisabled,
      onPress: async () => {
        const success = await recordAttendance(user, todayTime, "check-out");
        setIsCheckOutButtonDisabled(success);
      },
    },
    {
      id: "3",
      text: "因故请假",
      iconName: "calendar-clock",
      isDisabled: false,
      onPress: () => console.log("因故请假"),
    },
    {
      id: "4",
      text: "考勤统计",
      iconName: "chart-bar",
      isDisabled: false,
      onPress: () => navigation.navigate('AttendanceStats')
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 12 }}>
        <Calendar
          key={refresh}
          onDayPress={(day) => {
            setMarkedDates({
              [day.dateString]: {
                selected: true,
                selectedColor: mainColor,
              },
            });
            console.log("selected day", day);
          }}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          monthFormat={"yyyy年 MM月"}
          enableSwipeMonths={true}
          markedDates={markedDates}
          theme={{
            arrowColor: mainColor,
            backgroundColor: theme.colors.background,
            calendarBackground: theme.colors.background,
            textSectionTitleColor: theme.colors.text,
            dayTextColor: theme.colors.text,
            todayTextColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.onSurface,
            selectedDayBackgroundColor: theme.colors.primary,
            monthTextColor: theme.colors.text,
            indicatorColor: mainColor,
            textDisabledColor: theme.colors.disabled,
            dotColor: mainColor,
            selectedDotColor: theme.colors.primary,
            disabledArrowColor: theme.colors.disabled,
            todayButtonTextColor: mainColor,
            textDayFontWeight: "bold",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "bold",
          }}
        />
        <TouchableOpacity onPress={backToToday}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <Icon name="calendar-today" size={18} color={mainColor} />
            <Text style={{ marginLeft: 1, color: mainColor }}>Today</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: mainColor,
            borderBottomWidth: 0.5,
            marginHorizontal: 12,
            marginBottom: 12,
          }}
        />
      </View>
      <View style={styles.flatListsContainer}>
        <Animated.FlatList
          data={data}
          numColumns={2} //添加这行代码以创建两列
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...styles.listItem,
                backgroundColor: item.isDisabled ? "grey" : mainColor,
              }}
              onPress={item.isDisabled ? () => {} : item.onPress}
            >
              <Icon name={item.iconName} size={24} color="white" />
              <Text style={styles.listItemText}>{item.text}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

LocaleConfig.locales.jp = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backToTodayButton: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  backToTodayButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  flatListsContainer: {
    flex: 1, // 使flatListsContainer占据可用空间
    flexWrap: "wrap", // 使元素进行折行
    flexDirection: "row", // 使元素水平排列
    justifyContent: "space-between", // 使元素之间有间距
    padding: 22, // 容器的内边距
  },
  flatList: {
    flex: 1,
    marginRight: 8,
  },
  listItem: {
    width: "48%", // 稍微减小宽度以留出间距
    aspectRatio: 1, // 添加这行以使按钮保持正方形形状
    borderRadius: 40, // 使按钮变为圆形
    paddingHorizontal: 12,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: "1%", // 添加间距
  },
  listItemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Helvetica Neue",
  },
});

export default CalendarScreen;
