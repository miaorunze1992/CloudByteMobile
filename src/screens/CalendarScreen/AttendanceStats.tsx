import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../components/context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Holidays from "date-holidays";

const AttendanceStats = ({ navigation }: any) => {
  const user = useSelector((state: any) => state);
  const theme = useContext(ThemeContext);
  const mainColor = theme.colors.mainBackground;

  const date = new Date();
  const month = date.getMonth() + 1; // JavaScript months are 0-based, so +1 makes it human-readable
  const year = date.getFullYear();

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // Note: JavaScript months start at 0 for January

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const newAttendanceData = [];

    const hd = new Holidays("JP");

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dateObject = new Date(dateString);

      // Skip weekends
      if (dateObject.getDay() === 0 || dateObject.getDay() === 6) {
        continue;
      }

      // Skip Japanese public holidays
      if (hd.isHoliday(dateObject)) {
        continue;
      }

      // Add a new attendance data object for each day
      newAttendanceData.push({
        date: dateString,
        checkIn: "08:00",
        checkOut: "17:00",
        totalHours: "9 h",
      });
    }

    setAttendanceData(newAttendanceData);
  }, []);

  // 每日打卡条数
  const [attendanceData, setAttendanceData] = useState([{}]);

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: mainColor, borderRadius: 20 },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 25,
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 14, flex: 1, fontWeight: "bold" }}
        >
          <Icon name="calendar-range" size={18} color={"#fff"} />
          日期: {item.date}
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 14, flex: 1, fontWeight: "bold" }}
        >
          <Icon name="chart-bar" size={18} color={"#fff"} />
          勤务合计: {item.totalHours}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          marginLeft: 25,
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 14, flex: 1, fontWeight: "bold" }}
        >
          <Icon name="clock-outline" size={18} color={"#fff"} />
          出勤时间: {item.checkIn}
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 14, flex: 1, fontWeight: "bold" }}
        >
          <Icon name="calendar-clock" size={18} color={"#fff"} />
          退勤时间: {item.checkOut}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={[
            styles.ellipse,
            styles.ellipse30,
            { backgroundColor: mainColor },
          ]}
        >
          <Text style={styles.ellipseTextMonth}>{month}月</Text>
          <Text style={styles.ellipseTextYear}>{year}年</Text>
        </View>
        <View
          style={[
            styles.ellipse,
            styles.ellipse70,
            { backgroundColor: mainColor },
          ]}
        >
          <Text style={styles.ellipseTextName}>{user.auth.user.real_name}</Text>
          <Text style={styles.ellipseTextId}>编号:{user.auth.user.id}</Text>
          <Text style={styles.ellipseTextUsername}>
            用户名:{user.auth.user.username}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 48,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, color: mainColor, fontWeight: "bold" }}>
            出勤時間
          </Text>
          <Text style={{ fontSize: 20, color: mainColor, fontWeight: "bold" }}>
            <Icon name="clock-time-nine-outline" size={25} color={mainColor} />
            12小时
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, color: mainColor, fontWeight: "bold" }}>
            休み時間
          </Text>
          <Text style={{ fontSize: 20, color: mainColor, fontWeight: "bold" }}>
            <Icon name="weather-night" size={25} color={mainColor} />
            12小时
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
        <Text style={{ fontSize: 12, color: mainColor, fontWeight: "bold", marginLeft:290 }}>
          📅返回日历
        </Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: mainColor,
          borderBottomWidth: 0.5,
          marginHorizontal: 12,
          marginBottom: 12,
        }}
      />
      <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 14,
    shadowColor: "#000", // 添加阴影效果
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ellipse: {
    borderRadius: 30,
    justifyContent: "center",
    height: 100,
  },
  ellipse30: {
    width: "30%",
  },
  ellipse70: {
    width: "68%",
  },
  ellipseText: {
    color: "#fff", // Change this to the color you want for the text
    fontSize: 16, // Change this to the size you want for the text
    alignItems: "center",
  },
  ellipseTextMonth: {
    color: "#fff",
    marginLeft: 30,
    fontSize: 20, // Increased the font size
    fontWeight: "bold", // Made the font bold
  },
  ellipseTextYear: {
    marginLeft: 30,
    color: "#fff",
    fontSize: 14, // Reduced the font size
    fontWeight: "bold", // Made the font bold
  },
  ellipseTextName: {
    marginLeft: 32,
    color: "#fff",
    fontSize: 20, // Reduced the font size
    fontWeight: "bold", // Made the font bold
  },
  ellipseTextId: {
    marginTop: 4,
    marginLeft: 32,
    color: "#fff",
    fontSize: 14, // Reduced the font size
    fontWeight: "bold", // Made the font bold
  },
  ellipseTextUsername: {
    marginTop: 4,
    marginLeft: 32,
    color: "#fff",
    fontSize: 14, // Reduced the font size
    fontWeight: "bold", // Made the font bold
  },
});

export default AttendanceStats;
