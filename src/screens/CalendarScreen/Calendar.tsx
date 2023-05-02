import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

import * as Animatable from "react-native-animatable";

import { ThemeContext } from "../../components/context";

const CalendarScreen = () => {
  const theme = useContext(ThemeContext);
  const today = new Date().toISOString().split("T")[0];

  const [markedDates, setMarkedDates] = useState({
    [today]: {
      selected: true,
      selectedColor: theme.colors.mainBackground,
    },
  });

  const [refresh, setRefresh] = useState(0);

  const backToToday = () => {
    setMarkedDates({
      [today]: {
        selected: true,
        selectedColor: theme.colors.mainBackground,
      },
    });
    setRefresh((prevRefresh) => prevRefresh + 1);
  };

  return (
    <View style={styles.container}>
      <Calendar
        key={refresh}
        onDayPress={(day) => {
          setMarkedDates({
            [day.dateString]: {
              selected: true,
              selectedColor: theme.colors.mainBackground,
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
      />
      <Animatable.View animation="rubberBand" iterationCount="infinite">
        <Button title="回到今天" onPress={backToToday} />
      </Animatable.View>
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
});

export default CalendarScreen;
