import { Injectable } from '@angular/core';
import { StatusJournal, Role } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JournalstatusService {
    journalStatus: any;
    constructor(private http: HttpClient) { }

    get getJournalStatus() {
        //    return this.http.get('/api/journalstatus').subscribe(
        //         res => {
        //             this.journalStatus = res
        //             console.log(this.journalStatus)
        //             return this.journalStatus
        //         }, err => {
        //             console.log(err)
        //             return null;
        //         }
        //     )

        return this.http.get('/api/journalstatus')

    }
}