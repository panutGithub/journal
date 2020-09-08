import { StatusJournal } from './status';
import { Data } from '@angular/router';

export class Review {
    id: string;     // รหัสรีวิว
    userId:string   // รหัสผู้ใช้
    review?:string   // รีวิว
    review1?:string  // คะแนน 1
    review2?:string  // คะแนน 2
    review3?:string  // คะแนน 3
    review4?:string  // คะแนน 4
    review5?:string  // คะแนน 5
    review6?:string  // คะแนน 6
    reviewAll?:string    // คะแนนโดยรวม
    transactionTime?: Data // เวลาทำรายการ
    
}