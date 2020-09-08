import { Component, Input, OnInit, AfterViewChecked, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { User, Role, Journal, Depaertment, Major } from './_models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from './_services';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TitledetailService } from './_services/titledetail.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ListComponent } from './journal/list/list.component';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

declare var $: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('childAnimation', [
            state('open', style({ width: '180px', opacity: 1, backgroundColor: '#222' })),
            state('closed', style({ width: '70px', backgroundColor: '#0089FF' })),
            transition('* => *', [animate('0.5s')]),
        ]),
        trigger('lineanimation', [state('lineopen', style({ width: '50px' })),
        state('lineclosed', style({ width: '40px' })),
        transition('* => *', [animate('0.5s')]),
        ])
    ]
})
export class AppComponent implements AfterViewChecked {
    ngAfterViewChecked(): void {
    }

    isOpen: boolean

    currentUser: User
    currentPeerlist: any
    currentDepartment: Depaertment
    currentMajor: Major
    currentJournalStaus: any
    journal: any

    journalStatus: any
    journalActive: any = []
    journalFrom: FormGroup;

    constructor(private router: Router, private authenticationService: AuthenticationService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, public checkSelectPeerService: TitledetailService, public fake: TitledetailService,
        public searchService: TitledetailService, private http: HttpClient) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.authenticationService.currentDepartment.subscribe(x => this.currentDepartment = x);
        this.authenticationService.currentMajor.subscribe(x => this.currentMajor = x);
        this.authenticationService.currentJournalSatatus.subscribe(x => this.currentJournalStaus = x);
        this.authenticationService.currentPeerlist.subscribe(x => this.currentPeerlist = x);
 
        console.log("App Start")
        if (!this.currentUser) {
            console.log("this.currentUser Null")
        } else {
            // for (var value of this.currentUser) {
            //     this.currentUser = value
            // }
            console.log(this.currentUser)
            console.log("Department ", this.currentDepartment)
            console.log("Major ", this.currentMajor)
            console.log("journal status ", this.currentJournalStaus)
            console.log("Peerlist " , this.currentPeerlist)

            this.hidemanu = true
        }
        this.journalFrom = new FormGroup({
            idUserlist: new FormControl(''),
        })
        this.getJournal()
        // this.getJournalStatus()
    }


    ngOnInit(): void {
        // popovers
        $('[data-toggle="popover"]').popover()
        $('.example-popover').popover({
            container: 'body'
        })

        this.authenticationService.getDepartment()
            .pipe(first())
            .subscribe(
                res => {
                    console.log(res)
                },
                error => {
                    console.log(error)
                });

        this.authenticationService.getMajor()
            .pipe(first())
            .subscribe(
                res => {
                    console.log(res)
                },
                error => {
                    console.log(error)
                });

        this.authenticationService.getJournalStatus()
            .pipe(first())
            .subscribe(
                res => {
                    console.log(res)
                },
                error => {
                    console.log(error)
                });
        this.authenticationService.getpeerlist()
            .pipe(first())
            .subscribe(
                res => {
                    console.log(res)
                },
                error => {
                    console.log(error)
                });

    }

    // api
    url: any
    showNumberJournal = 0
    getJournal() {
        if (this.isUser || this.isAuthor) {
            // console.log(this.currentUser.role)
            // const _body = new HttpParams()
            //     .set('userid', this.currentUser.userId)
            this.journalFrom.setValue({ idUserlist: this.currentUser.idUserlist })
            this.url = "/api/searchjournalbyid"
            this.http.post(this.url, this.journalFrom.value).subscribe(res => {
                // console.log(res)
                this.journal = res
                this.journalActive = []
                this.showNumberJournal = 0
                for (var value of this.journal) {
                    if (value.receive == "author") {
                        this.showNumberJournal += 1
                        this.journalActive.push(value);
                        // console.log("receive == author ", value)
                    }
                }
                // console.log(this.showNumberJournal)
                // console.log("this.journalActive ", this.journalActive)
            }, err => {
                console.log("Error", err);
            })
        } else if (this.isPeer) {
            // console.log(this.currentUser.role)
            this.journalFrom.setValue({ idUserlist: this.currentUser.idUserlist })

            this.url = "/api/searchjournalpeer"
            this.http.post(this.url, this.journalFrom.value).subscribe(res => {
                console.log(res)
                this.journal = res
                this.journalActive = []
                this.showNumberJournal = 0
                for (var value of this.journal) {
                    if (value.receive != "end") {
                        if (value.receive == "peer") {
                            this.showNumberJournal += 1
                            this.journalActive.push(value);
                            console.log("receive == peer ", value)
                        }
                    }
                }
                console.log("this.journalActive ", this.journalActive)
            }, err => {
                console.log("Error", err);
            })
        } else if (this.isAdmin) {
            // console.log(this.currentUser.role)
            this.http.get("/api/searchAllJournal").subscribe(res => {
                console.log(res)
                this.journal = res
                this.journalActive = []
                this.showNumberJournal = 0
                for (var value of this.journal) {
                    if (value.check != "end") {
                        if (value.receive == "editorial department") {
                            this.showNumberJournal += 1
                            this.journalActive.push(value);
                            // console.log("check == 1 ",value)
                        }

                    }
                }
                console.log("this.journalActive ", this.journalActive)
            }, err => {
                console.log(err)
            })
        }
    }

    // getJournalStatus() {
    //     this.http.get('/api/journalstatus').subscribe(
    //         res => {
    //             this.journalStatus = res
    //             console.log(this.journalStatus)
    //         }, err => {
    //             console.log(err)
    //         }
    //     )
    // }
    // journalEnd: any = []
    // journalAll: any = []
    // getJournal() {
    //     if (this.isUser || this.isAuthor) {
    //         console.log(this.currentUser.role)
    //         const _body = new HttpParams()
    //             .set('userid', this.currentUser.userId)
    //         this.url = "/api/searchjournalbyid"
    //         this.http.post(this.url + "?userid=" + this.currentUser.userId + "", _body.toString()).subscribe(res => {
    //             // console.log(res)
    //             this.journal = res
    //             this.journalActive = []
    //             this.journalAll = []
    //             this.showNumberJournal = 0
    //             for (var value of this.journal) {
    //                 if (value.receive != "end") {
    //                     this.journalActive.push(value);
    //                     this.showNumberJournal += 1
    //                     // console.log("receive == author ", value)
    //                 } else if (value.receive == "end") {
    //                     this.journalAll.push(value);
    //                 }
    //             }
    //             console.log("this.journalActive ", this.journalActive)
    //         }, err => {
    //             console.log("Error", err);
    //         })
    //         return this.journalActive
    //     } else if (this.isPeer) {
    //         const _body = new HttpParams()
    //             .set('userid', this.currentUser.userId)
    //         this.url = "/api/searchjournalpeer"
    //         this.http.post(this.url + "?peerid=" + this.currentUser.userId + "", _body.toString()).subscribe(res => {
    //             console.log(res)
    //             this.journal = res
    //             this.journalActive = []
    //             this.journalEnd = []
    //             for (var value of this.journal) {
    //                 if (value.check != "end") {
    //                     console.log(value)
    //                     if (value.receive == "peer") {
    //                         this.showNumberJournal += 1
    //                         this.journalActive.push(value);
    //                     }
    //                 } else if (value.check == "end") {
    //                     console.log(value)
    //                     this.journalEnd.push(value)
    //                 }

    //             }
    //             console.log("this.journalActive ", this.journalActive)
    //         }, err => {
    //             console.log("Error", err);
    //         })
    //     } else if (this.isAdmin) {
    //         this.http.get("/api/searchAllJournal").subscribe(res => {
    //             console.log(res)
    //             this.journal = res
    //             this.journalActive = []
    //             for (var value of this.journal) {
    //                 if (value.check != "end") {
    //                     if (value.receive == "peer") {
    //                         this.journalActive.push(value);
    //                     }

    //                 }
    //             }
    //             console.log("this.journalActive ", this.journalActive)
    //         }, err => {
    //             console.log(err)
    //         })
    //     }
    // }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }
    get isPeer() {
        return this.currentUser && this.currentUser.role === Role.Peer;
    }
    get isAuthor() {
        return this.currentUser && this.currentUser.role === Role.Author;
    }

    get isUser() {
        return this.currentUser && this.currentUser.role === Role.User;
    }

    // menu

    toggle() {
        this.isOpen = !this.isOpen;
    }

    onClickList() {
        this.titlepage = "รายการ"
        this.changeHeader = true
        this.router.navigate(['/']);
    }

    onClickTag() {
        this.titlepage = "การติดตาม"
        this.changeHeader = true
    }

    hidemanu = false
    logout() {
        this.hidemanu = false
        this.changeHeader = true
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    onClickProfile() {
        this.changeHeader = false
        this.router.navigate(["/profile"])
    }

    onClickListPeer() {
        this.titlepage = "รายชื่อผู้ประเมิน"
        this.changeHeader = true
        this.checkSelectPeerService.checkSelectPeer = false
    }

    // menu

    //journal-header
    changeHeader = true
    nameUserth = "Test Name"
    surNameth = "Test Surname"
    nameUsereng = "Test Name"
    surNameeng = "Test Surname"
    titlepageEng = "Tag Journal"
    roleTh = "ผู้แต่ง"
    roleEng = "author"
    currentRoleTh = "สถานะปัจจุบัน"
    currentRoleEng = "Current Role"
    searchtextTh = "ค้นหา"
    searchtextEng = "Search"
    titlepage = "รายการ"

    checkRole = 2
    public href: string = "";

    changeRoleFuntion() {
        if (this.checkRole == 1) {
            return false
        }
        else if (this.checkRole == 2) {
            if (this.currentUser.role == Role.Peer) {
                this.currentUser.role = Role.Author
                this.getJournal()
                return true
            }
            else if (this.currentUser.role == Role.Author) {
                this.currentUser.role = Role.Peer
                this.getJournal()
                return true
            }
        }
    }
    //journal-header

    // searchTag
    searchInput(event) {
        this.searchService.searchInput = event.target.value
    }
    searchTaginput = ''
    clear() {
        this.searchService.searchInput = ''
        this.searchTaginput = this.searchService.searchInput
    }


}

