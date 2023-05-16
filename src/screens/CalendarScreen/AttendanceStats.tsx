import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../components/context";

const AttendanceStats = ({ navigation}:any ) => {
  const user = useSelector((state: any) => state);
  const theme = useContext(ThemeContext);

  const [attendanceData, setAttendanceData] = useState([]);

  // useEffect(() => {
  //   // TODO: fetch attendance data from backend
  //   // This is just a placeholder. Replace this with actual code
  //   // to fetch data from your backend.
  //   const fetchData = async () => {
  //     const data = await fetch('http://your-api/attendance-data')
  //       .then(response => response.json())
  //       .catch(error => console.error(error));
  //     setAttendanceData(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <View style={styles.container}>
      <Button title="返回" onPress={() => navigation.navigate('Calendar')} />
      <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        考勤统计
      </Text>
      {/* {attendanceData.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={{ color: theme.colors.text, fontSize: 16 }}>
            Date: {item.date}
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 16 }}>
            Check In: {item.checkIn}
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 16 }}>
            Check Out: {item.checkOut}
          </Text>
        </View>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 10,
  },
});

export default AttendanceStats;
