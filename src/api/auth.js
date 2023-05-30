import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

export const requestLogin = async (username, password) => {
  const res = await axios.post(`${API_URL}/cb_login`, { username, password });
  return res.data;
};

export const requestRecordAttendance = async (attendanceRecord) => {
  console.log(attendanceRecord);
  const res = await axios.post(`${API_URL}/cb_recordAttendance`, { attendanceRecord });
  return res.data;
};

export const getAttendanceRecords = async (searchData) => {
  console.log(searchData);
  const res = await axios.post(`${API_URL}/cb_getAttendanceRecords`, { searchData })
  return res.data;
}