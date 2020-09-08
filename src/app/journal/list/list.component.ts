import { Component, OnInit, EventEmitter, Output, forwardRef, Inject, Input, PipeTransform, Pipe, Directive } from '@angular/core';
import { User, Role, Journal, StatusJournal, PhoneType, StatusJournalTh } from '@app/_models';
import { switchMap, map, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AuthenticationService, JournalstatusService, ApiService } from '@app/_services';
import { TitledetailService } from '@app/_services/titledetail.service';
import { inject } from '@angular/core/testing';
import { AppComponent } from '@app/app.component';
import { JournalreviewService } from '@app/_services/journalreview.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ModalService } from '../_modal';
import { FormGroup, FormControl } from '@angular/forms';


declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  currentUser: User
  journal: any
  date: string
  journalActive: any
  journalEnd: any
  searchInput: any
  journalFrom: FormGroup;
  journalStatus: any
  depathment: any

  constructor(private router: Router, private userService: UserService, private authenticationService: AuthenticationService,
    @Inject(forwardRef(() => AppComponent)) public app: AppComponent, public journalService: TitledetailService, public journalreviewService: JournalreviewService,
    private journalstatusService: JournalstatusService, private api: ApiService, private http: HttpClient, private route: ActivatedRoute, private modalService: ModalService, public checkSelectPeerService: TitledetailService,
    public searchService: TitledetailService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.currentJournalSatatus.subscribe(x => this.journalStatus = x);

    if (this.currentUser) {
      console.log(this.currentUser)
    } else {
      console.log(this.currentUser)
    }

    this.journalFrom = new FormGroup({
      idUserlist: new FormControl(''),
    })
    this.app.changeHeader = true
    this.app.titlepage = "รายการ"
    this.searchInput = searchService.searchInput
    this.onSelect("ทั้งหมด");
    app.getJournal()
    this.getJournal();
    this.getJournalStatus()
  }

  changeRoleFuntion() {
      if (this.currentUser.role == Role.Peer) {
        this.currentUser.role = Role.Author
        this.app.getJournal()
        this.getJournal()
      }
      else if (this.currentUser.role == Role.Author) {
        this.currentUser.role = Role.Peer
        this.app.getJournal()
        this.getJournal()
      }
  }

  // api
  journalAll: any = []
  getJournal() {
    if (this.isUser || this.isAuthor) {
      // console.log(this.currentUser.role)

      this.journalFrom.setValue({ idUserlist: this.currentUser.idUserlist })
      this.url = "/api/searchjournalbyid"
      this.http.post(this.url, this.journalFrom.value).subscribe(res => {
        // console.log(res)
        this.journal = res
        this.journalActive = []
        this.journalAll = []
        this.journalEnd = []
        for (var value of this.journal) {
          if (value.receive != "end") {
            this.journalActive.push(value);
          } else if (value.receive == "end") {
            this.journalEnd.push(value);
          }
        }
        // console.log("this.journalActive ", this.journalActive)
      }, err => {
        console.log("Error", err);
      })
      return this.journalActive
    } else if (this.isPeer) {

      this.journalFrom.setValue({ idUserlist: this.currentUser.idUserlist })

      this.url = "/api/searchjournalpeer"
      this.http.post(this.url, this.journalFrom.value).subscribe(
        res => {
          // console.log(res)
          this.journal = res
          this.journalActive = []
          this.journalEnd = []
          for (var value of this.journal) {
            if (value.check != "end") {
              // console.log(value)
              this.journalActive.push(value);
            } else if (value.check == "end") {
              // console.log(value)
              this.journalEnd.push(value)
            }

          }
          // console.log("this.journalActive ", this.journalActive)
        }, err => {
          console.log("Error", err);
        })
    } else if (this.isAdmin) {
      this.http.get("/api/searchAllJournal").subscribe(res => {
        // console.log(res)
        this.journal = res
        this.journalActive = []
        for (var value of this.journal) {
          if (value.check != "end") {
            if (value.receive == "peer") {
              this.journalActive.push(value);
            }

          }
        }
        console.log("this.journalActive ", this.journalActive)
      }, err => {
        // console.log(err)
      })
    }
  }

  getJournalStatus() {
    // this.http.get('/api/journalstatus').subscribe(
    //   res => {
    //     this.journalStatus = res
    //     console.log(this.journalStatus)
    //   }, err => {
    //     console.log(err)
    //   }
    // )
  }

  url = 'https://jsonplaceholder.typicode.com/posts';
  ngOnInit(): void {
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


    // jw modal
    // this.bodyText = 'This text can be updated in modal 1';
    // this.router.navigate(["/list"]);

  }

  testhttp: any[]

  get isPeer() {
    return this.currentUser && this.currentUser.role === Role.Peer;
  }

  get isAuthor() {
    return this.currentUser && this.currentUser.role === Role.Author;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  // router link page 
  onClickDetail(event) {
    this.app.changeHeader = false
    this.router.navigate(["/detail", { id: event }]);
  }

  onGoToClickEdit(event) {
    // console.log(event)
    this.router.navigate(["/edit", { id: event }]);
  }

  onClickReview(event) {
    this.app.changeHeader = false
    this.router.navigate(["/review", { id: event }]);
  }

  onClickStatus(status, id) {
    console.log(status + "  ", id)
    console.log(" Go to detail " + status)
    this.router.navigate(["/detail", { id: id }]);

  }

  changeRouter() {
    // this.router.navigate([{outlets:{primary:'/', detail_outlet:'/detail'}}]);
  }

  // Date Time
  birthday = new Date(); // April 15, 1988

  checkRole() {
    console.log("CHeck Journal : " + this.journal)
  }

  // get data in table // status Show in selected
  testEnumStatus = StatusJournalTh
  alljoutnal: boolean
  onSelect(selectedItem: any) {
    this.mainCheck = false
    selectedItem == "ทั้งหมด" ? this.alljoutnal = true : this.alljoutnal = false
    this.printedOption = this.selectedOption
    if (this.alljoutnal) {
      this.searchService.searchInput = ""
    }
    // console.log("this.printedOption ", this.printedOption)
  }

  // Select Status
  printedOption: number
  selectedOption: any
  selectStatusFunction() {
    this.selectStatus = true
    this.printedOption = this.selectedOption
    this.mainCheck = false
    this.mainPeer = false
  }
  selectStatus: boolean = false
  mainCheck: boolean = false
  mainPeer: boolean = false
  statusMainCheck: string = 'รอการตรวจสอบความถูกต้อง'
  statusMainPeer: string = 'รอการเลือกผู้ประเมิน'
  journaleEitorialDepartment: any
  setMainOptionCheck() {
    this.journaleEitorialDepartment = []
    for (var value of this.journal) {
      if (value.journalStatus == "รอการตรวจสอบความถูกต้อง") {
        this.journaleEitorialDepartment.push(value)
      }
    }
    this.statusMainCheck = 'รอการตรวจสอบความถูกต้อง'; this.selectedOption = 'รอการตรวจสอบความถูกต้อง'; this.mainCheck = true; this.mainPeer = false; this.selectStatus = false; this.alljoutnal = false;
  }
  setMainOptionPeer() { this.statusMainPeer = 'รอการเลือกผู้ประเมิน'; this.selectedOption = 'รอการเลือกผู้ประเมิน'; this.mainCheck = false; this.mainPeer = true; this.selectStatus = false; this.alljoutnal = false; }

  //Test router params
  onClickMainCheck(journal: any) {
    this.router.navigate(["/detail", { id: journal }]);
  }

  onClickMainSelect(journal: any) {
    this.router.navigate(["admin/peerlist", { id: journal }]);
    this.app.titlepage = "รายชื่อผู้ประเมิน"
  }

  // JW modal
  bodyText: string;

  openModal(id: string) {
    this.checkSelectPeerService.checkSelectPeer = true
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.checkSelectPeerService.checkSelectPeer = false
    this.modalService.close(id);
  }

  //search

  // subStr
  // this.subsrt = this.searchService.searchInput.substr(0, this.searchService.searchInput.indexOf(','));



}
