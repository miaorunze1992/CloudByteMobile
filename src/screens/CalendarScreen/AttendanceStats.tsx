import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../components/context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Holidays from "date-holidays";
import { getAttendanceRecords } from "../../api/attendance";
import { useIsFocused } from "@react-navigation/native";

const AttendanceStats = ({ navigation }: any) => {
  // 初期化DATA
  const user = useSelector((state: any) => state);
  const theme = useContext(ThemeContext);
  const mainColor = theme.colors.mainBackground;

  // 获取当月信息
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const currentDate = `${year}-${month}`;

  // 每日打卡条数
  const [attendanceData, setAttendanceData] = useState([{}]);
  const [total,setTotal] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    // 获取当月信息
    const currentDate = `${year}-${month}`;
    const fetchData = async () => {
      const res = await getAttendanceRecords({
        user_id: user.auth.user.id,
        currentDate: currentDate,
      });
      setAttendanceData(res.data)
      let total = res.data.reduce((sum:any,record:any)=> sum+record.totalHours,0);
      setTotal(total);
    };
    // 如果页面在焦点中，则加载数据
    if (isFocused) {
      fetchData();
    }
  }, [user.auth.user.id, currentDate, isFocused]);

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
            {total}h
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
        <Text
          style={{
            fontSize: 13,
            color: mainColor,
            fontWeight: "bold",
            marginLeft: 335,
          }}
        >
        <Icon name="calendar-today" size={18} color={mainColor} />
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
