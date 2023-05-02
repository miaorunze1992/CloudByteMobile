type AttendanceType = "check-in" | "check-out";

interface AttendanceRecord {
    id:string;
    date: string;
    type:AttendanceType;
}

const AttendanceStorage: AttendanceRecord[] = [];

export const recordAttendance = (id: string, type:AttendanceType) =>{
    const currentDate = new Date().toISOString().split("T")[0];
    const newAttendanceRecord: AttendanceRecord = {
        id,
        date:currentDate,
        type
    }

    AttendanceStorage.push(newAttendanceRecord);
    console.log("Attendance recorded:", newAttendanceRecord);
}