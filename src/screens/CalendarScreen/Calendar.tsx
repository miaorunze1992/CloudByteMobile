import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../components/context";

import { useSelector } from "react-redux";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { updateLeaveHours } from "../../api/auth";
import {
  checkIn,
  checkOut,
  createRecord,
  getRecords,
} from "../../api/attendance";

const CalendarScreen = () => {
  const navigation =
    useNavigation<
      NavigationProp<{ AttendanceStats: undefined }, "AttendanceStats">
    >();

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
  const [isLeaveButtonDisabled, setIsLeaveButtonDisabled] = useState(false);

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
      // 当前用户ID
      const userId = user.auth.user.id;
      // 获取当前系统日期
      const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      // 查询数据当天考勤数据情况
      const rs = await getRecords({ userId, currentDate });
      // 没有当天数据的话创建一个
      if (rs.message === "ATTENDANCE_RECORD_0") {
        try {
          await createRecord({ userId, currentDate });
        } catch (error) {
          Alert.alert("APP连接不上,未能创建打卡记录");
        }
      } else {
        // 如果当天考勤数据有的话
        if (rs.results[0].check_in_time === null) {
          // 可以出勤打卡
          setIsButtonDisabled(false);
          // 不可以退勤打卡
          setIsCheckOutButtonDisabled(true);
        } else if (rs.results[0].check_out_time === null) {
          // 不可以出勤打卡
          setIsButtonDisabled(true);
          // 可以退勤打卡
          setIsCheckOutButtonDisabled(false);
        } else if(rs.results[0].check_in_time !== null && rs.results[0].check_out_time !== null){
          // 不可以出勤打卡
          setIsButtonDisabled(true);
          // 不可以退勤打卡
          setIsCheckOutButtonDisabled(true);
        }
      }
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

  // 当前用户ID
  const userId = user.auth.user.id;
  // 获取当前系统日期
  const currentDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const data = [
    {
      id: "1",
      text: "出勤打卡",
      iconName: "clock-outline",
      isDisabled: isButtonDisabled,
      onPress: async () => {
        Alert.alert(
          "出勤打卡",
          "确认要出勤打卡吗",
          [
            {
              text: "取消",
              onPress: () => console.log("取消出勤打卡"),
              style: "cancel",
            },
            {
              text: "是",
              onPress: async () => {
                try {
                  await checkIn({ userId, currentDate });
                  setIsButtonDisabled(true);
                  setIsCheckOutButtonDisabled(false);
                } catch (error) {
                  Alert.alert("APP出勤打卡失败,请重试");
                }
              },
            },
          ]
        )
      },
    },
    {
      id: "2",
      text: "退勤打卡",
      iconName: "clock-out",
      isDisabled: isCheckOutButtonDisabled,
      onPress: async () => {
        Alert.alert(
          "退勤打卡",
          "确认要退勤打卡吗",
          [
            {
              text: "取消",
              onPress: () => console.log("取消退勤打卡"),
              style: "cancel",
            },
            {
              text: "是",
              onPress: async () => {
                try {
                  await checkOut({ userId, currentDate });
                  setIsCheckOutButtonDisabled(true);
                } catch (error) {
                  Alert.alert("APP退勤打卡失败,请重试");
                }
              },
            },
          ]
        )
      },
    },
    {
      id: "3",
      text: "因故请假",
      iconName: "calendar-clock",
      isDisabled: isLeaveButtonDisabled,
      onPress: () =>
        Alert.alert(
          "选择请假时段",
          "请选择您的请假时段",
          [
            {
              text: "上午",
              onPress: async () => {
                const success = await updateLeaveHours({
                  hours: 4,
                  recordDate: today,
                  userId: user.auth.user.id,
                });
                console.log("选择了上午");
                // 在这里调用你的后台API
                setIsLeaveButtonDisabled(true);
              },
            },
            {
              text: "下午",
              onPress: async () => {
                const success = await updateLeaveHours({
                  hours: 4,
                  recordDate: today,
                  userId: user.auth.user.id,
                });
                console.log("选择了下午");
                // 在这里调用你的后台API
                setIsLeaveButtonDisabled(true);
              },
            },
            {
              text: "全天",
              onPress: async () => {
                const success = await updateLeaveHours({
                  hours: 8,
                  recordDate: today,
                  userId: user.auth.user.id,
                });
                console.log("选择了全天");
                // 在这里调用你的后台API
                setIsLeaveButtonDisabled(true);
              },
            },
            {
              text: "劳资不想请假",
            },
          ],
          { cancelable: true }
        ),
    },
    {
      id: "4",
      text: "考勤统计",
      iconName: "chart-bar",
      isDisabled: false,
      onPress: () => navigation.navigate("AttendanceStats"),
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
