import { Role } from "./role";

export class User {
    idUserlist?: number;
    // userId:string 
    username?: string;
    password?: string;
    title?: string    //ตำแหน่ง
    roleid?: string //รหัสสถานะ
    role?: Role;
    firstName?: string;
    lastName?: string;
    firstNameEng?: string;   //ชื่อ Eng
    lastNameEng?: string;    //นามสกุล Eng
    department_id?: string // หน่วยงาน องค์กร คณะ มหาวิทยาลัย
    major_id?: string // สาขาวิชา
    email?: string // email
    telephoneNumber?: string // เบอร์โทรศัพท์
    tel?:string // เบอร์มือถือ
    address?: string // ที่อยู่
    line?:string
    facebook?:string
    // peer
    expertise_id?: number // รหัสความเชี่ยวชาญ
    expertiseName?: string // ความเชี่ยวชาญ
    accountNumber?: number // เลขที่บัญชี
    bank?: string // ธนาคาร
    token?: string;
}