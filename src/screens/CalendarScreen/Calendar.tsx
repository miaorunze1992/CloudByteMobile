import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from "../../components/context";

const CalendarScreen = () => {
  const theme = useContext(ThemeContext);

  const mainColor = theme.colors.mainBackground;
  const today = new Date().toISOString().split("T")[0];

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
      onPress: () => console.log("出勤打卡"),
    },
    {
      id: "2",
      text: "退勤打卡",
      iconName: "clock-out",
      onPress: () => console.log("退勤打卡"),
    },
    {
      id: "3",
      text: "因故请假",
      iconName: "calendar-clock",
      onPress: () => console.log("因故请假"),
    },
    {
      id: "4",
      text: "考勤统计",
      iconName: "chart-bar",
      onPress: () => console.log("考勤统计"),
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...styles.listItem,
                backgroundColor: mainColor,
              }}
              onPress={item.onPress}
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    marginTop: 10,
    marginLeft: 8,
  },
  flatList: {
    flex: 1,
    marginRight: 8,
  },
  listItem: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 24,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Helvetica Neue",
  },
});

export default CalendarScreen;
