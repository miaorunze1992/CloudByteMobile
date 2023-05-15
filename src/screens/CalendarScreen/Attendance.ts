type AttendanceType = "check-in" | "check-out";
import { useSelector } from 'react-redux';
import { store } from '../../store/store.js';

interface AttendanceRecord {
    id:string;
    date: string;
    type:AttendanceType;
}

const AttendanceStorage: AttendanceRecord[] = [];

export const recordAttendance = (state:any) =>{

    console.log('caotamadede +++++++++++')
    console.log(state)
    console.log('caotamadede +++++++++++')

    // const userType = useSelector((state) => state.auth.user.usertype);
    
    // const currentDate = new Date().toISOString().split("T")[0];
    // const newAttendanceRecord: AttendanceRecord = {
    //     id,
    //     date:currentDate,
    // //     type
    // // }

    // AttendanceStorage.push(newAttendanceRecord);
    // console.log("Attendance recorded:", newAttendanceRecord);
}