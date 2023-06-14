import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// 获取当天考勤数据
export const getRecords = async (searchData) => {
  const res = await axios.post(`${API_URL}/cb_getRecords`, searchData);
  return res.data;
};

// 创建当天的考勤数据
export const createRecord = async (createData) => {
  const res = await axios.post(`${API_URL}/cb_createRecord`, createData);
  return res.message;
};

// 进行出勤打卡
export const checkIn = async (checkInData) => {
  const res = await axios.post(`${API_URL}/cb_checkIn`, checkInData);
  return res;
};

// 进行退勤打卡
export const checkOut = async (checkOutData) => {
  const res = await axios.post(`${API_URL}/cb_checkOut`, checkOutData);
  return res;
};

// 获取当月所有打卡信息
export const getAttendanceRecords = async (searchData) => {
  console.log(searchData);
  const res = await axios.post(`${API_URL}/cb_getAttendanceRecords`, { searchData })
  return res.data;
}