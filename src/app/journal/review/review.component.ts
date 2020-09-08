import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { TitledetailService } from '@app/_services/titledetail.service';
import { User, Review, Major, Depaertment, Journal, Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { JournalreviewService } from '@app/_services/journalreview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpClient, HttpResponse, } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  overallassessment2: Number = 1
  overallassessment: Number = 1
  timeStampedSuccess = new Date

  journal: Journal
  review: any = []
  journalReview: string
  paramsJournalId: any;
  journalShow: any;
  journalStatus: any

  currentUser: User
  currentDepartment: Depaertment
  currentMajor: Major
  currentJournalStaus: any

  reviewForm: FormGroup
  reviewForm1: FormGroup

  journalFrom: FormGroup
  url: any

  disabled = false
  test = "asdasdds"

  constructor(@Inject(forwardRef(() => AppComponent)) private app: AppComponent, public journalService: TitledetailService, private authenticationService: AuthenticationService,
    public journalreviewService: JournalreviewService, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.currentUser = app.currentUser
    this.journalStatus = app.currentJournalStaus
    this.currentDepartment = app.currentDepartment
    this.currentMajor = app.currentMajor
    this.app.changeHeader = false
    console.log(this.journalStatus)
    this.route.params.subscribe(params => {
      this.paramsJournalId = params['id']
    });
    if (this.paramsJournalId == undefined) {
      this.route.queryParamMap.subscribe(params => {
        this.paramsJournalId = { ...params.keys, ...params };
      });
      this.paramsJournalId = this.paramsJournalId.params.id
    }
    this.journalFrom = new FormGroup({
      idJournallist: new FormControl(this.paramsJournalId),
    })
    this.url = "/api/searchjournalid"
    this.http.post(this.url, this.journalFrom.value).subscribe(res => {
      console.log(res)
      this.journal = res[0]
      console.log("journal ", this.journal)
      this.reviewForm1.patchValue({ idPeerlist: this.currentUser.idUserlist, idJournallist_review: this.journal.idJournallist });

      // select review
      this.http.post("/api/searchreviewbyid", this.reviewForm1.value).subscribe(res => {
        this.reviewForm1.patchValue({ idReview: res[0].idReview });
        this.getreview = res[0]
        this.reviewForm1.patchValue({ transactionTime: this.getreview.transactionTime, comment: this.getreview.comment });
        this.reviewForm1.patchValue({ abstract_review: this.getreview.abstract_review, commentabstract: this.getreview.commentabstract });
        this.reviewForm1.patchValue({ keyword: this.getreview.keyword, commentkeyword: this.getreview.commentkeyword });
        this.reviewForm1.patchValue({ introduction: this.getreview.introduction, commentintroduction: this.getreview.commentintroduction });
        this.reviewForm1.patchValue({ objective: this.getreview.objective, commentobjective: this.getreview.commentobjective });
        this.reviewForm1.patchValue({ researchhypothesis: this.getreview.researchhypothesis, commenthypothesis: this.getreview.commenthypothesis });
        this.reviewForm1.patchValue({ researchquestion: this.getreview.researchquestion, commentresearchquestion: this.getreview.commentresearchquestion });
        this.reviewForm1.patchValue({ researchmethodology: this.getreview.researchmethodology, commentmethodology: this.getreview.commentmethodology });
        this.reviewForm1.patchValue({ population: this.getreview.population, commentpopulation: this.getreview.commentpopulation });
        this.reviewForm1.patchValue({ sample: this.getreview.sample, commentsample: this.getreview.commentsample });
        this.reviewForm1.patchValue({ researchmachine: this.getreview.researchmachine, commentresearchmachine: this.getreview.commentresearchmachine });
        this.reviewForm1.patchValue({ datacollection: this.getreview.datacollection, commentdatacollection: this.getreview.commentdatacollection });
        this.reviewForm1.patchValue({ dataanalysis: this.getreview.dataanalysis, commentdataanalysis: this.getreview.commentdataanalysis });
        this.reviewForm1.patchValue({ researchresults: this.getreview.researchresults, commentresearchresults: this.getreview.commentresearchresults });
        this.reviewForm1.patchValue({ discussionresearchresults: this.getreview.discussionresearchresults, commentdiscussionresearchresults: this.getreview.commentdiscussionresearchresults });
        this.reviewForm1.patchValue({ researchfindings: this.getreview.researchfindings, commentresearchfindings: this.getreview.commentresearchfindings });
        this.reviewForm1.patchValue({ suggestionsresearchuse: this.getreview.suggestionsresearchuse, commentsuggestionsresearchuse: this.getreview.commentsuggestionsresearchuse });
        this.reviewForm1.patchValue({ referencedocument: this.getreview.referencedocument, commentreferencedocument: this.getreview.commentreferencedocument });
        this.reviewForm1.patchValue({ overallresearchquality: this.getreview.overallresearchquality, commentoverallresearchquality: this.getreview.commentoverallresearchquality });
        this.reviewForm1.patchValue({ overallresearchqualityappropriate: this.getreview.overallresearchqualityappropriate });
        console.log(this.getreview)
      }, err => {
        console.log(err)
      })

      this.reviewForm = new FormGroup({
        idReview: new FormControl(''),
        userId: new FormControl(this.currentUser.idUserlist),
        journalId: new FormControl(this.journal.idJournallist),
        review: new FormControl('', [Validators.required]),
        profile: new FormControl('')
      })
    }, err => {
      console.log("Error", err);
    })

    this.reviewForm = new FormGroup({
      idReview: new FormControl(''),
      userId: new FormControl(),
      journalId: new FormControl(),
      // review: new FormControl('', [Validators.required]),
      profile: new FormControl('')
    })

    this.reviewForm1 = new FormGroup({
      idReview: new FormControl(''),
      idPeerlist: new FormControl(),
      idJournallist_review: new FormControl(),
      comment: new FormControl(),
      abstract_review: new FormControl('', [Validators.required]), //1
      commentabstract: new FormControl(''),
      keyword: new FormControl('', [Validators.required]), //2
      commentkeyword: new FormControl(''),
      introduction: new FormControl('', [Validators.required]), //3
      commentintroduction: new FormControl(''),
      objective: new FormControl('', [Validators.required]), //4
      commentobjective: new FormControl(''),
      researchhypothesis: new FormControl(''), //5
      commenthypothesis: new FormControl(''),
      researchquestion: new FormControl(''),//6
      commentresearchquestion: new FormControl(''),
      researchmethodology: new FormControl('', [Validators.required]), //7
      commentmethodology: new FormControl(''),
      population: new FormControl('', [Validators.required]),//8
      commentpopulation: new FormControl(''),
      sample: new FormControl('', [Validators.required]),//9
      commentsample: new FormControl(''),
      researchmachine: new FormControl('', [Validators.required]),//10
      commentresearchmachine: new FormControl(''),
      datacollection: new FormControl('', [Validators.required]),//11
      commentdatacollection: new FormControl(''),
      dataanalysis: new FormControl('', [Validators.required]),//12
      commentdataanalysis: new FormControl(''),
      researchresults: new FormControl('', [Validators.required]),//13
      commentresearchresults: new FormControl(''),
      discussionresearchresults: new FormControl('', [Validators.required]),//14
      commentdiscussionresearchresults: new FormControl(''),
      researchfindings: new FormControl('', [Validators.required]),//15
      commentresearchfindings: new FormControl(''),
      suggestionsresearchuse: new FormControl('', [Validators.required]),//16
      commentsuggestionsresearchuse: new FormControl(''),
      referencedocument: new FormControl('', [Validators.required]),//17
      commentreferencedocument: new FormControl(''),
      overallresearchquality: new FormControl('', [Validators.required]),//18
      commentoverallresearchquality: new FormControl(''),
      overallresearchqualityappropriate: new FormControl(''),
      transactionTime: new FormControl('')
    })

    console.log(this.reviewForm1.value)



  }

  reactiveForm: FormGroup

  // reactiveForm: FormGroup

  showreviewForm1() {
    console.log(this.reviewForm1.value)
  }

  profileForm: FormGroup;
  getreview: any
  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
    console.log("Test")

  }

  get f() { return this.reviewForm.controls; }
  get f1() { return this.reviewForm1.controls }

  disabledreviewForm1 = false

  get cF1() {
    if (this.reviewForm1.invalid) {
      console.log("this.reviewForm1.value")
      console.log(this.reviewForm1.value)
      console.log(this.disabledreviewForm1)
      return this.disabledreviewForm1 = true;
    } else {
      console.log("!this.reviewForm1.value")
      console.log(this.reviewForm1.value)
      console.log(this.disabledreviewForm1)
      return this.disabledreviewForm1 = false;
    }
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

  loading = false;
  submitted = false
  onSubmit(btn) {
    console.log("Submit")
    this.loading = true;
    this.submitted = true;
    // stop here if form is invalid
    // if (this.reviewForm.invalid) {
    //   this.loading = false;
    //   return;
    // }
    if (this.reviewForm1.invalid) {
      this.loading = false;
      console.log(this.reviewForm1.value)
      return;
    }
    console.log("Submit 2")

    if (this.reviewForm1.get('abstract_review').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentabstract: '' }); 
    }
    if (this.reviewForm1.get('keyword').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentkeyword:'' });
    }
    if (this.reviewForm1.get('introduction').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentintroduction:'' });
    }
    if (this.reviewForm1.get('objective').value == "เหมาะสม") {
      this.reviewForm1.patchValue({ commentobjective: '' });
    }
    if (this.reviewForm1.get('researchhypothesis').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commenthypothesis: '' });
    }
    if (this.reviewForm1.get('researchquestion').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentresearchquestion: '' });
    }
    if (this.reviewForm1.get('researchmethodology').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentmethodology:''});
    }
    if (this.reviewForm1.get('population').value == "เหมาะสม") {
      this.reviewForm1.patchValue({ commentpopulation: '' });
    }
    if (this.reviewForm1.get('sample').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentsample: '' });
    }
    if (this.reviewForm1.get('researchmachine').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentresearchmachine: ''});
    }
    if (this.reviewForm1.get('datacollection').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentdatacollection: '' });
    }
    if (this.reviewForm1.get('dataanalysis').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentdataanalysis: ''});
    }
    if (this.reviewForm1.get('researchresults').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentresearchresults: '' });
    }
    if (this.reviewForm1.get('discussionresearchresults').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentdiscussionresearchresults: '' });
    }
    if (this.reviewForm1.get('researchfindings').value == "เหมาะสม") {
      this.reviewForm1.patchValue({   commentresearchfindings: '' });
    }
    if (this.reviewForm1.get('suggestionsresearchuse').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentsuggestionsresearchuse: '' });
    }
    if (this.reviewForm1.get('referencedocument').value == "เหมาะสม") {
      this.reviewForm1.patchValue({  commentreferencedocument:''});
    }
    if (this.reviewForm1.get('overallresearchquality').value == "เหมาะสม") {
      this.reviewForm1.patchValue({ commentoverallresearchquality: '' });
    }

    this.http.post("/api/updatereview", this.reviewForm1.value).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
    // uploadfile
    const formData = new FormData();
    formData.append('file', this.profileForm.get('profile').value);
    this.http.post("/api/uploadreview", formData).subscribe(res => {
      console.log("Upload File success", res)
    }, err => {
      console.log("error Upload File ", err)
    })
    this.submitted = false;
    this.loading = false;
  }

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

  dowsloadFile: FormGroup

  downloadFile() {
    console.log("dowsload")

    this.dowsloadFile = new FormGroup({
      idAuthor: new FormControl("" + this.journal.idAuthor),
      id: new FormControl(this.journal.idJournallist)
    });

    this.http.post("/api/file", this.dowsloadFile.value).subscribe(res => {
      console.log("dowsload File success", res)
    }, err => {
      console.log("error dowsload File ", err)
    })

  }

  onDowsload() {
    console.log("onDowsload")
    this.http.post("/api/dowsloadjournalreview", this.reviewForm).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  timeStampedSuccessFunction() {
    this.timeStampedSuccess = new Date
  }

  get getArticleId() {
    return;
  }

  reviewId: any
  reviewShow: any
  checkReviewid: boolean

}
