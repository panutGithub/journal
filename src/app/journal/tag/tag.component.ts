import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Journal, Role, User, StatusJournalTh, StatusJournal } from '@app/_models';
import { AppComponent } from '@app/app.component';
import { TitledetailService } from '@app/_services/titledetail.service';

import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  currentUser: User
  journal: any = []

  constructor(@Inject(forwardRef(() => AppComponent)) private app: AppComponent, public journalService: TitledetailService, private authenticationService: AuthenticationService, private router: Router,
    public fake: TitledetailService) {

    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.app.changeHeader = true;
    this.app.titlepage = "การติดตาม"
    this.journal = this.app.journal
    // this.journal = this.fake.journal
    this.journalPeerFunction();
    this.statusPeerFunction()
  }

  ngOnInit() {
    

  }
  // for (let i = 0; i < this.fake.journal.length; i++) {
  //   if (this.currentUser.userId === this.fake.journal[i].idAuthor) {
  //     this.journal.push(this.fake.journal[i])
  //   }
  // }


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


  // table
  testlist() {

    // for (var i = 0, len = this.journal.length; i < len; i++) {
    //   console.log(this.journal[i].id); //Would give you the id of each client
    // }
  }

  onClickDetail() {
    this.app.changeHeader = false
  }

  checkRole() {
    console.log("CHeck Role : " + this.currentUser.role)
  }
  // status peer
  testEnumStatus = StatusJournalTh

  statusAuthor: any = [this.testEnumStatus.รอการตรวจสอบความถูกต้อง, this.testEnumStatus.ต้องทำการแก้ไข, this.testEnumStatus.ผ่านการตรวจสอบ, this.testEnumStatus.รอการเลือกผู้ประเมิน,
  this.testEnumStatus.รอการประเมิน, this.testEnumStatus.การประเมินเสร็จสิ้น, this.testEnumStatus.ไม่ผ่าน, this.testEnumStatus.ผ่าน]

  statusPeer: any = [this.testEnumStatus.รอการประเมิน, this.testEnumStatus.รอการแก้ไข, this.testEnumStatus.การประเมินเสร็จสิ้น]

  messages: any[]

  journalPeer: any = []

  journalPeerFunction() {
    for (let i = 0; i < this.journal.length; i++) {
      if(this.journal[i].peerId.length > 0){
        console.log("1")
        for (let ii = 0; ii < this.journal[i].peerId.length; ii++) {
          if (this.journal[i].peerId[ii] == this.currentUser.idUserlist) {
            console.log("2")
            for (let iii = 0; iii < this.statusPeer.length; iii++) {
              console.log(this.journal[i].journalStatus,"  ",this.statusPeer[iii])
              if(this.journal[i].journalStatus == this.statusPeer[iii]){
                this.journalPeer.push(this.journal[i])
                console.log(this.journal[i])
              }
            }
          }
        }
      }
    }
  }
    
  statusPeerFunction() {

    // this.statusPeer = [this.testEnumStatus.รอการประเมิณ, this.testEnumStatus.รอการแก้ไข, this.testEnumStatus.การประเมินเสร็จสิ้น]

    // this.statusAuthor = [this.testEnumStatus.รอการตรวจสอบความถูกต้อง,this.testEnumStatus.ต้องทำการแก้ไข,this.testEnumStatus.ผ่านการตรวจสอบ,this.testEnumStatus.รอการเลือกผู้ประเมิน,
    //   this.testEnumStatus.รอการประเมิณ,this.testEnumStatus.การประเมินเสร็จสิ้น,this.testEnumStatus.ไม่ผ่าน,this.testEnumStatus.ผ่าน]

    // รอการตรวจสอบความถูกต้อง ="รอการตรวจสอบความถูกต้อง",         // User admin
    // ต้องทำการแก้ไข = "ต้องทำการแก้ไข",                         // User
    // รอตอบกลับการแก้ไข = "รอตอบกลับการแก้ไข",                  // admin
    // ผ่านการตรวจสอบ = "ผ่านการตรวจสอบ",                       // user admin
    // พร้อมทำการประเมิน = "พร้อมทำการประเมิน",                    // admin
    // รอการเลือกผู้ประเมิน = "รอการเลือกผู้ประเมิน",                   // user admin
    // รอการประเมิณ = "รอการประเมิณ",                            // user peer admin
    // รอการแก้ไข = "รอการแก้ไข",                                // peer admin
    // การประเมินเสร็จสิ้น = "การประเมินเสร็จสิ้น",                     // user peer 
    // ไม่ผ่าน  = "ไม่ผ่าน",                                      // user peer admin 
    // ผ่าน = "ผ่าน"                                             // user admin
    // // // // //
    // Check = "รอการตรวจสอบความถูกต้อง",                    // User admin
    // Adjust = "ต้องทำการแก้ไข",                            // User
    // WaitingAdjust = "รอตอบกลับการแก้ไข",                  // admin
    // PassedChecking = "ผ่านการตรวจสอบ",                    // user admin
    // ReadyConsider = "พร้อมทำการประเมิน",                   // admin
    // WithSelectPeer = "รอการเลือกผู้ประเมิน",                  // user admin
    // Waiting = "รอการประเมิณ",                             // user peer admin
    // SubmissionWaitingEdit = 'รอการแก้ไข',                 // peer admin
    // Finish = 'การประเมินเสร็จสิ้น',                          // user peer 
    // Failed = 'ไม่ผ่าน'                                     // user admin
    // Success = 'ผ่าน'                                     // user admin

  }
  url = ""
  onClickstatus(status, articleid) {
    console.log("onClickstatus ",status)
    if (status == "ต้องทำการแก้ไข") {
      console.log("ต้องทำการแก้ไข")
      this.router.navigate(["/edit", { id: articleid }]);
    }
    else if (status == "รอการประเมิน") {
      console.log("status ",status)
      this.router.navigate(["/review",articleid ]);
    } 
    // this.router.navigate(["/edit", {journal: articleid}]);
  }

  testUrl() {
    console.log(this.url)
  }

  onGoToClickJournal(journal: any) {
    this.router.navigate(["/review", { journal: journal }]);
    console.log("qasdasasdasd")
  }
}
