import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, Journal, Depaertment, Major } from '@app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private currentJournalSubject: BehaviorSubject<Journal>;
    public currentjournal: Observable<Journal>;
    loginForm: FormGroup;

    //department
    private currentDepartmentSubject: BehaviorSubject<Depaertment>;
    public currentDepartment: Observable<Depaertment>;

    // major
    private currentMajorSubject: BehaviorSubject<Major>;
    public currentMajor: Observable<Major>;

    // JournalSatatus
    private currentJournalSatatusSubject: BehaviorSubject<any>;
    public currentJournalSatatus: Observable<any>;

    // peerlist
    private currentPeerlistSubject: BehaviorSubject<any>;
    public currentPeerlist: Observable<any>;


    constructor(private http: HttpClient, private formBuilder: FormBuilder) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        // add new custom journal
        this.currentJournalSubject = new BehaviorSubject<Journal>(JSON.parse(localStorage.getItem('currentjournal')));
        this.currentjournal = this.currentJournalSubject.asObservable();

        // department
        this.currentDepartmentSubject = new BehaviorSubject<Depaertment>(JSON.parse(localStorage.getItem('currentDepartment')));
        this.currentDepartment = this.currentDepartmentSubject.asObservable();

        // major
        this.currentMajorSubject = new BehaviorSubject<Major>(JSON.parse(localStorage.getItem('currentMajor')));
        this.currentMajor = this.currentMajorSubject.asObservable();

        // journal status
        this.currentJournalSatatusSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentJournalSatatus')));
        this.currentJournalSatatus = this.currentJournalSatatusSubject.asObservable();

            // peerlist
            this.currentPeerlistSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentPeerlist')));
            this.currentPeerlist = this.currentPeerlistSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentDepartmentValue(): Depaertment {
        return this.currentDepartmentSubject.value;
    }

    public get currentMajorSubjectValue(): any {
        return this.currentMajorSubject.value;
    }

    public get currentJournalSatatusValue(): any {
        return this.currentJournalSatatusSubject.value;
    }

    public get currentPeerlistSubjectValue(): any {
        return this.currentPeerlistSubject.value;
    }

    // add new custom journal
    public get currentJournalValue(): Journal {
        return this.currentJournalSubject.value;
    }

    getDepartment() {
        return this.http.get<any>("/api/searchdepartment").pipe(map(
            res => {
                if (!res) {
                    console.log("null")
                } else {
                    localStorage.setItem('currentDepartment', JSON.stringify(res));
                    this.currentDepartmentSubject.next(res);
                }
                return res;
            }));
    }

    getMajor() {
        return this.http.get<any>("/api/searchmajor").pipe(map(
            res => {
                if (!res) {
                    console.log("null")
                } else {
                    localStorage.setItem('currentMajor', JSON.stringify(res));
                    this.currentMajorSubject.next(res);
                }
                return res;
            }));
    }

    journalForm: FormGroup
    getJournalapi() {
        this.journalForm = new FormGroup({
        })
        return this.http.get<any>("/api/searchjournalbyid").pipe(map(
            res => {
                if (!res) {
                    console.log("null")
                } else {
                    localStorage.setItem('currentjournal', JSON.stringify(res));
                    this.currentMajorSubject.next(res);
                }
                return res;
            }));
    }

    getJournalStatus() {
        return this.http.get('/api/journalstatus').pipe(map(
            res => {
                if (!res) {
                    console.log(res)
                } else {
                    localStorage.setItem('currentJournalSatatus', JSON.stringify(res));
                    this.currentJournalSatatusSubject.next(res);
                }
                return res;
            }));
    }

    getpeerlist(){
        return this.http.get('/api/searchpeerlist').pipe(map(
            res => {
                if (!res) {
                    console.log(res)
                } else {
                    localStorage.setItem('currentPeerlist', JSON.stringify(res));
                    this.currentPeerlistSubject.next(res);
                }
                return res;
            }));
    }

    // // login Edit
    login(username: string, password: string) {
        this.loginForm = this.formBuilder.group({
            username: [username],
            password: [password]
        });
        return this.http.post<any>("/api/login", this.loginForm.value).pipe(map(
            res => {
                if (!res) {
                    console.log("null")
                } else {
                    localStorage.setItem('currentUser', JSON.stringify(res[0]));
                    this.currentUserSubject.next(res[0]);
                    console.log("login success")
                }
                return res;
            }));
    }
    // // Login
    login1(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // console.log(user)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentDepartment');
        this.currentDepartmentSubject.next(null);
        localStorage.removeItem('currentMajor');
        this.currentMajorSubject.next(null);
        localStorage.removeItem('currentJournalSatatus');
        this.currentJournalSatatusSubject.next(null);
        localStorage.removeItem('currentPeerlist');
        this.currentPeerlistSubject.next(null);
    }
}