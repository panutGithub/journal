import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthenticationService, TitledetailService } from '@app/_services';
import { AppComponent } from '@app/app.component';
import { User } from '@app/_models';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentUser: User

  a = [
    { id: [1, 2, 3], name: "B1" },
    { id: [4, 5, 6], name: "B1" },
    { id: [7, 8, 9], name: "B1" },

  ]

  disabled = true;
  model: NgbDateStruct
  date: { year: number, month: number };

  titlepageEdit = "Test Edit"

  nameUserth = "Test Name"
  surNameth = "Test Surname"
  @Input("inputTitlepage") titlepageTh = ""
  listAuthor = [{ id: 1, name: "A1" }]
  listKeywoed = [{ id: 1, name: "B1" }]
  journal: any = []
  paramsJournalId: any
  journalFrom: FormGroup


  url = ''
  order: string;

  constructor(private router: Router, private authenticationService: AuthenticationService, @Inject(forwardRef(() => AppComponent)) private app: AppComponent, private calendar: NgbCalendar, private journalService: TitledetailService,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.app.changeHeader = false

    // get params 1
    // this.route.queryParams.subscribe(params => {
    //   console.log(params); // {order: "popular"}
    //   this.paramsJournalId = params.id;
    //   console.log(this.paramsJournalId); // popular
    // });

    // get params 2
    this.route.params.subscribe(params => {
      this.paramsJournalId = params['id']
      // console.log("params ", this.paramsJournalId);
    });

    //get params 3 
    // if (this.paramsJournalId == undefined) {

    //   this.route.queryParamMap.subscribe(params => {
    //     this.paramsJournalId = { ...params.keys, ...params };
    //   });
    //   this.paramsJournalId = this.paramsJournalId.params.id
    // }

    const _body = new HttpParams()
      .set('userid', this.paramsJournalId)
    this.url = "/api/searchjournalid"
    this.http.post(this.url + "?id=" + this.paramsJournalId + "", _body.toString()).subscribe(res => {
      console.log(res)
      this.journal = res
      for (var get of this.journal) {
        this.journal = get
        // console.log(get)
      }
      console.log("journal ", this.journal)
    }, err => {
      console.log("Error", err);
    })

    this.showJournalOnId()


    this.journalFrom = new FormGroup({
      profile: new FormControl('', [Validators.required]),
    });
  }

  profileForm: FormGroup;
  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  onClickaddauthor() {
    if (this.journalShow.coAuthor == null) {
      this.journalShow.coAuthor = ['']
      this.coAuthor = this.journalShow.coAuthor
    }
    else {
      this.coAuthor.push("");
      console.log(this.coAuthor.length)
    }
  }

  onClickRemove(course) {
    // if (this.coAuthor.length > 1) {
    //   let index = this.coAuthor.indexOf(course);
    //   this.coAuthor.splice(index, 1);
    // }
    let index = this.coAuthor.indexOf(course);
    this.coAuthor.splice(index, 1);
  }

  onClickaddkeyword() {
    if (this.journalShow.keyword == null) {
      this.journalShow.keyword = ['']
      this.keyWord = this.journalShow.keyword
    }
    else {
      this.keyWord.push("");
      console.log(this.keyWord.length)
    }

  }

  onClickRemovekeyword(keyword) {
    let index = this.keyWord.indexOf(keyword);
    this.keyWord.splice(index, 1);
  }

  test() {
    // console.log(this.journal)
    console.log(this.model)
  }

  checkList(): boolean {
    if (this.listKeywoed.length == 0)
      return true
    else {
      return false
    }
  }

  checkListAuthor(): boolean {
    if (this.listAuthor.length == 0)
      return true
  }

  // object: { [key: number]: string} = {2: 'foo', 1: 'bar'};
  // map = new Map([[2, 'foo'], [1, 'bar']]);

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getdate(date) {
    console.log(date)
  }

  journalShow: any = []
  coAuthor: any[]
  keyWord: any[]

  showJournalOnId() {

  }

  // uploadfile
  fileName: any
  uploadSingle(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0];
      this.profileForm.get('profile').setValue(this.fileName);
    }
  }


  loading = false;
  onSubmit() {

    this.loading = true;

    // stop here if form is invalid
    if (this.journalFrom.invalid) {
      console.log("1")
      this.loading = false;
      return;
    }

    // uploadfile
    const formData = new FormData();
    formData.append('file', this.profileForm.get('profile').value);
    this.http.post("/api/uploadsection2", formData).subscribe(res => {
      console.log("Upload File success", res)
    }, err => {
      console.log("error Upload File ", err)
    })
  }

}
