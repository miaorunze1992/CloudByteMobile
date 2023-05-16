type AttendanceType = "check-in" | "check-out";
import { requestRecordAttendance } from "../../api/auth.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AttendanceRecord {
  user: any;
  date: string;
  type: AttendanceType;
}

export const recordAttendance = async (
  state: any,
  date: string,
  type: AttendanceType
) => {

  const user = state.auth.user; // 状态栏信息获取

//   const checkInFlag = await AsyncStorage.getItem("attendanceDate_checkIn");

  const newAttendanceRecord: AttendanceRecord = { user, date, type };
  const res = await requestRecordAttendance(newAttendanceRecord);
  console.log("返回结果");
  console.log(res);

  if (type === "check-in") {
    try {
      await AsyncStorage.setItem("attendanceDate_checkIn", res.recordDate);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    try {
      await AsyncStorage.setItem("attendanceDate_checkOut", res.recordDate);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
