export enum StatusJournal {
    Check = "รอการตรวจสอบความถูกต้อง",                    // User admin
    Adjust = "ต้องทำการแก้ไข",                            // User admin
    WaitingAdjust = "รอตอบกลับการแก้ไข",                  // admin
    PassedChecking = "ผ่านการตรวจสอบ",                    // user admin
    ReadyConsider = "พร้อมทำการประเมิน",                   // admin
    WithSelectPeer = "รอการเลือกผู้ประเมิน",                  // user admin
    Waiting = "รอการประเมิน",                             // user peer admin
    SubmissionWaitingEdit = 'รอการแก้ไข',                 // peer admin
    Finish = 'การประเมินเสร็จสิ้น',                           // user peer admin
    Success = 'ผ่าน',                                     // user peer admin
    Failed = 'ไม่ผ่าน'                                     // user admin
}

export enum StatusJournalTh {
    รอการตรวจสอบความถูกต้อง ="รอการตรวจสอบความถูกต้อง",         // User admin
    ต้องทำการแก้ไข = "ต้องทำการแก้ไข",                         // User admin
    รอตอบกลับการแก้ไข = "รอตอบกลับการแก้ไข",                  // admin
    ผ่านการตรวจสอบ = "ผ่านการตรวจสอบ",                       // user admin
    พร้อมทำการประเมิน = "พร้อมทำการประเมิน",                    // admin
    รอการเลือกผู้ประเมิน = "รอการเลือกผู้ประเมิน",                   // user admin
    รอการประเมิน = "รอการประเมิน",                            // user peer admin
    รอการแก้ไข = "รอการแก้ไข",                                // peer admin
    การประเมินเสร็จสิ้น = "การประเมินเสร็จสิ้น",                     // user peer admin
    ไม่ผ่าน  = "ไม่ผ่าน",                                      // user peer admin 
    ผ่าน = "ผ่าน"                                             // user admin
}


export namespace StatusJournal {
    export function values() {return Object.keys(StatusJournal).filter((type) => isNaN(<any>type) && type !== 'values' );} //&& type !== 'values'
 }

 export namespace StatusJournalTh {
    export function values() {return Object.keys(StatusJournalTh).filter((type) => isNaN(<any>type) && type !== 'values' );} //&& type !== 'values'
 }

// export enum StatusJournal {
//     User = 'User',
//     Author = 'Author',
//     Peer = 'Peer',
//     Admin = 'Admin'
// }










