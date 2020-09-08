import { StatusJournal } from './status';

export class Journal {
    idJournallist? : number;
    aboutMajorid : number;
    idAuthor? : string;          // รหัสผู้แต่ง
    idjournaltype_journal : number // รหัสประเภทบทความ
    headingTh? : string;         // ชื่อบทความไทย
    headingEng? : string;        // ชื่อบทความอังกฤษ
    coAuthor? : string[];        // ผู้แต่งร่วม
    keywordTh : String
    keywordEng : String 
    abstractTh? : string;        // บทคัดย่อไทย
    abstractEng? : string;       // บทคัด่ออังกฤษ
    transactionTimereceive : String 
    transactionTimesend : String 
    journalStatusid? : any;      // รหัสสถานะ
    payment : String 
    idjournalpublished_journal : number // รหัสการตีพิมพ์วารสาร

    articleid? : string;         // รหัสบทความ
    peerId? = new Array<string>(2)          // รหัสผู้ประเมิน
    expertiseid? : number        // รหัวความเชี่ยวชาญที่เกี่ยวข้อง
    assessmentid? : number       // รหัสการประเมิน
    aboutMajor? : string         // เกี่ยวกับสาขาวิชา
    expertise? : string;         // ความเชี่ยวชาญที่เกี่ยวข้อง


    keyword? : any[]             // คำสำคัญ
    editioNumber? : number;      // ฉบับที่
    authorName? : string;        // ชื่อผู้แต่ง
    authorLastname? : string;    // นามสกุล
    yearOfWriting? : any;        // ปีที่เขียน
    journalStatus? : StatusJournal;     // สถานะ
    address? : string;           // ที่อยู่
    transactionTime? : string    // เวลาการทำรายการ
    pathFile? : any;             // ที่อยู่ไฟล์
    // Peer
    reviewId? = new Array<string>(2)  // รหัสรีวิว
    review?:string              // รีวิว
    token?: string;
}

