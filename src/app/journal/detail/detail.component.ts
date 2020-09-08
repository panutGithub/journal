import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TitledetailService, AuthenticationService } from '@app/_services';
import { User, Role, Depaertment, Major } from '@app/_models';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ModalService } from '../_modal';
import { PhonePipe } from '@app/phone.pipe';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { DownloadFileService } from '@app/_services/download-file.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {

  checkReviewnull = true

  currentUser: any
  userjournal: any
  currentPeerlist: any
  currentDepartment: Depaertment
  currentMajor: Major

  reviews: any
  reviews1: any
  reviews2: any
  paramsJournalId: any
  journal: any = []

  url: any
  uploadFrom: FormGroup;
  journalFrom: FormGroup;
  reviewFrom: FormGroup
  journalStatus: any;


  constructor(@Inject(forwardRef(() => AppComponent)) private app: AppComponent, private route: ActivatedRoute, private router: Router, private journalService: TitledetailService, private authenticationService: AuthenticationService,
    private http: HttpClient, private modalService: ModalService, private fb: FormBuilder, private downloadservice: DownloadFileService) {
    this.app.changeHeader = false
    this.currentDepartment = app.currentDepartment
    this.currentMajor = app.currentMajor
    this.checkReviewnull = true
    this.currentUser = app.currentUser
    this.currentPeerlist = app.currentPeerlist
    this.journalStatus = app.currentJournalStaus
    // test params
    this.route.params.subscribe(params => {
      this.paramsJournalId = params['id']
      console.log("params ", this.paramsJournalId);
    });
    if (this.paramsJournalId == undefined) {

      this.route.queryParamMap.subscribe(params => {
        this.paramsJournalId = { ...params.keys, ...params };
      });
      this.paramsJournalId = this.paramsJournalId.params.id
    }
    // this.route.paramMap.subscribe(params => {
    //   console.log("params 2 ", params)
    // });
    this.journalFrom = new FormGroup({
      idJournallist: new FormControl(this.paramsJournalId),
    })
    this.url = "/api/searchjournalid"
    this.http.post(this.url, this.journalFrom.value).subscribe(res => {
      console.log(res)
      this.journal = res[0]
      this.http.post("/api/searchuserbyid", { idUserlist: this.journal.idAuthor }).subscribe(res => {
        console.log(res)
        this.userjournal = res[0]
        console.log(this.userjournal)
      }, err => {
        console.log(err)
      })

      console.log("journal ", this.journal)
      if (!this.journal.reviewId1 && !this.journal.reviewId2) {
        this.checkReviewnull = true
        console.log("null ", this.journal.reviewId1, "  ", this.journal.reviewId2)
        console.log(!this.journal.reviewId1 + " " + !this.journal.reviewId2)
      } else {
        this.checkReviewnull = false
        console.log("else")
        console.log(!this.journal.reviewId1 + " " + !this.journal.reviewId2)
      }
    }, err => {
      console.log("Error", err);
    })

    this.reviewFrom = new FormGroup({
      idJournallist_review: new FormControl(this.paramsJournalId),
    })

    this.getreview()

    // this.getJournalStatus()

    // this.journal = this.journalService.journal
    // this.reviews = this.journalService.review

    this.uploadFrom = new FormGroup({
      profile: new FormControl('', Validators.required)
    })


    this.selectPeerForm = new FormGroup({
      id: new FormControl(this.journal.id),
      peerid1: new FormControl('', Validators.required),
      peerid2: new FormControl('', Validators.required)
    });

    this.journalFrom = new FormGroup({
      profile: new FormControl("", Validators.required),
    });

    console.log(this.journal.idJournallist)

    this.journalstatusform = new FormGroup({
      idJournallist: new FormControl(this.journal.idJournallist),
      journalStatusid: new FormControl('', Validators.required)
    });

    console.log(this.reviews)
    this.showJournalOnId()
  }

  // getJournalStatus() {
  //   this.http.get('/api/journalstatus').subscribe(
  //     res => {
  //       this.journalStatus = res
  //       console.log(this.journalStatus)
  //     }, err => {
  //       console.log(err)
  //     }
  //   )
  // }

  getreview() {

    this.http.post("/api/searchreviewbyjournalid", this.reviewFrom.value).subscribe(res => {
      if (res) {
        this.reviews1 = res[0]
        this.reviews2 = res[1]
        this.reviews = false
      } else {
        this.reviews = true
      }
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  profileForm: FormGroup;
  showjournalStatus: any
  ngOnInit() {
    // upload
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });

    this.showjournalStatus = 0

  }


  loading = false;
  onSubmit() {

    // stop here if form is invalid
    if (this.journalFrom.invalid) {
      console.log("journalFrom invalid")
      return;
    }

    console.log("Submit 2")

    // uploadfile
    const formData = new FormData();
    formData.append('file', this.profileForm.get('profile').value);
    formData.append('userid', this.currentUser.idUserlist);
    formData.append('journalName', this.journal.headingEng);
    this.http.post("/api/uploadjournal", formData).subscribe(res => {
      console.log("Upload File success", res)
    }, err => {
      console.log("error Upload File ", err)
    })

    this.loading = false;
  }

  // onSubmit peerlist
  submittedpeerlist = false;
  submittedalert = false
  onSubmitpeerlist(id: string) {
    console.log("closeModal")

    if (this.selectPeerForm.value.peerid1 == this.selectPeerForm.value.peerid2) {
      this.submittedalert = true
      return
    } else {
      this.submittedalert = false
    }

    if (this.selectPeerForm.invalid) {
      console.log(this.selectPeerForm.value)
      this.submittedpeerlist = true
      return
    } else {
      this.submittedpeerlist = false
      this.modalService.close(id);
    }

    this.http.post("/api/insertreview" + "?idJournallist=" + this.journal.idJournallist + "&idPeerlist=" + this.selectPeerForm.value.peerid1 + "", {}).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

    this.http.post("/api/insertreview" + "?idJournallist=" + this.journal.idJournallist + "&idPeerlist=" + this.selectPeerForm.value.peerid2 + "", {}).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })

    this.getreview()

  }

  journalstatusform: FormGroup
  onSubmitjournalstatus() {
    this.journalstatusform.patchValue({ idJournallist: this.journal.idJournallist });
    this.journalstatusform.patchValue({ journalStatusid: this.showjournalStatus });
    console.log(this.journalstatusform.value)
    //  this.journalstatusform.value
    this.http.post("/api/updeadjournalstatus", {}, { params: { idJournallist: this.journal.idJournallist, journalStatusid: this.showjournalStatus } }).subscribe(
      res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
  }

  testpeer() {
    console.log(this.selectPeerForm.value)
    console.log(this.selectPeerForm.value.peerid1)
    console.log(this.selectPeerForm.value.peerid2)
    console.log(this.journalstatusform.value)

  }

  // upload 
  checkTypePDF = ''
  fileName: any

  uploadSingle(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0];
      if (this.fileName.type == "application/pdf") {
        console.log("This file type pdf")
        this.profileForm.get('profile').setValue(this.fileName);
        this.checkTypePDF = ''
        this.loading = false
      } else {
        this.fileName = ''
        this.checkTypePDF = "This file not PDF"
        this.loading = true
        console.log("This file not PDF")
      }
    }
  }

  // download
  // downloadFile() {
  //   this.downloadservice.downloadFile()
  // } 

  testreload() {
    window.location.href;
    console.log(window.location.href)
  }

  name = 'DownloadFile by LDK';

  downloadBtn() {
    window.open('/api/downloadjournalbyuserbyname' + "?userid=" + 2 + "&journalid=" + this.journal.idJournallist)
  }

  exportFile() {
    this.http.get('url-api', { responseType: 'blob' }).subscribe(
      res => {
        // saveAs(res.url);
      },
      res => {
        // notify error
      }
    )
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

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get checkPeerForm() { return this.selectPeerForm.controls; }

  // get f() { return this.registerForm.controls; }

  comment: boolean
  onClickComment() {
    this.comment = !this.comment
  }
  // userlist.firstName as name , userlist.lastName as lastname
  selectPeer: boolean
  peerlist: any
  peerlistshow: any = []
  searchpeerbyexpertise: FormGroup
  onClickpeerList(value) {
    this.selectPeer = !this.selectPeer

    this.searchpeerbyexpertise = new FormGroup({
      department_id: new FormControl(value)
    });

    this.http.get("/api/searchpeerlist", this.searchpeerbyexpertise.value).subscribe(res => {
      console.log(res)
      this.peerlist = res
      this.peerlistshow = []
      for (var get of this.peerlist) {
        if (get.idUserlist != this.userjournal.idUserlist) {
          this.peerlistshow.push(get)
        }
      }
    }, err => {
      console.log(err)
    })

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.selectPeer = false
    console.log("closeModal")
    this.modalService.close(id);
  }


  journalShow: any
  selectPeerForm: FormGroup;
  peerlistNgmodel1: any
  peerlistNgmodel2: any
  showJournalOnId() {
    //   for (let i = 0; i < this.journal.length; i++) {
    //     if (this.journal[i].articleid == this.paramsJournalId) {
    //       console.log("this journal current : ", this.journal[i].articleid)
    //       this.journalShow = this.journal[i]
    //       break
    //     }
    //   }
  }

}
