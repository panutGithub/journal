import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from './hero';
import { AppComponent } from '@app/app.component';
import { TitledetailService, UserService, AlertService, AuthenticationService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Journal, StatusJournal, User, Major, Depaertment } from '@app/_models';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class WriteComponent implements OnInit {

  titlepageTh = "ส่งบทความ"
  disabled = true;
  model: NgbDateStruct;
  date: { year: number, month: number };

  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  myHero = this.heroes[0];

  nameUserth = "Test Name"
  surNameth = "Test Surname"
  listAuthor = [{ id: 1, name: "A1" }]
  listKeywoedth = [{ id: 1, name: "B1" }]
  listKeywoedeng = [{ id: 1, name: "B1" }]
  journalFrom: FormGroup
  fileUpload: FormGroup

  journal: any[]
  currentDepartment: Depaertment
  currentMajor: Major
  paramsJournalId: any
  alertName: any;
  alert: string;
  today: number = Date.now();
  currentUser: User;

  constructor(private calendar: NgbCalendar, @Inject(forwardRef(() => AppComponent)) public app: AppComponent, private journalService: TitledetailService, private route: ActivatedRoute,
    private userService: UserService, private router: Router, private alertService: AlertService, private http: HttpClient, private fb: FormBuilder,
    private authenticationService: AuthenticationService, private formBuilderKeywordth: FormBuilder, private formBuilderKeywordeng: FormBuilder, private formBuilder: FormBuilder) {
    this.app.changeHeader = false;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.currentDepartment.subscribe(x => this.currentDepartment = x);
    this.authenticationService.currentMajor.subscribe(x => this.currentMajor = x);

    console.log(this.currentUser)

    this.journalFrom = new FormGroup({
      idAuthor: new FormControl(app.currentUser.idUserlist),
      aboutMajorid: new FormControl('', [Validators.required]),
      // expertiseid: new FormControl(getValue.expertiseid),
      headingTh: new FormControl('', [Validators.required]),
      headingEng: new FormControl('', [Validators.required]),
      coAuthor: new FormControl(''),
      // expertise: new FormControl('', [Validators.required]),
      keywordTh: new FormControl('', [Validators.required]),
      keywordEng: new FormControl('', [Validators.required]),
      abstractTh: new FormControl('', [Validators.required]),
      abstractEng: new FormControl('', [Validators.required]),
      // yearOfWriting: new FormControl('', [Validators.required]),
      // journalStatusid: new FormControl(getValue.journalStatusid),
      journalStatusid: new FormControl('1', [Validators.required]),
      address: new FormControl(this.currentUser.address),
      transactionTime: new FormControl(this.today),
      // reviewId: new FormControl('', [Validators.required]),
      profile: new FormControl("", Validators.required),
      check: new FormControl(3),
      send: new FormControl('author'),
      receive: new FormControl('editorial department')
    });



  }

  profileForm: FormGroup;
  private dynamicFormCoAuthor: FormGroup;
  private dynamicFormKeywordth: FormGroup;
  private dynamicFormKeywordeng: FormGroup;

  major: any
  ngOnInit() {
    // upload
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });

    // Dynamic Reactive Forms
    this.dynamicFormCoAuthor = this.formBuilder.group({
      tickets: new FormArray([])
    });
    // keywordth
    this.dynamicFormKeywordth = this.formBuilderKeywordth.group({
      ticketsKeywordth: new FormArray([])
    });
    // keywordeng
    this.dynamicFormKeywordeng = this.formBuilderKeywordeng.group({
      ticketsKeywordeng: new FormArray([])
    });

    this.onChangeTickets(1);
    this.onChangeTicketsKeywordth(1);
    this.onChangeTicketsKeywordeng(1);

  }

  // convenience getters for easy access to form fields
  // coAuthor
  get f1() { return this.dynamicFormCoAuthor.controls; }
  get t() { return this.f1.tickets as FormArray; }

  // keyword th
  get fKeywordth() { return this.dynamicFormKeywordth.controls; }
  get tKeywordth() { return this.fKeywordth.ticketsKeywordth as FormArray; }

  // keyword eng
  get tKeywordeng() { return this.fKeywordeng.ticketsKeywordeng as FormArray; }
  get fKeywordeng() { return this.dynamicFormKeywordeng.controls; }

  // CoAuthor
  onChangeTickets(e) {
    // const numberOfTickets = e.target.value || 0;
    const numberOfTickets = e || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          name: ['']
          // email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicFormCoAuthor.reset();
    this.t.clear();
    this.listAuthor = [{ id: 1, name: "A1" }]
    this.onChangeTickets(1);
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

  // KeywordTh FormArray
  onChangeTicketsKeywordth(e) {
    // const numberOfTickets = e.target.value || 0;
    const numberOfTickets = e || 0;
    if (this.tKeywordth.length < numberOfTickets) {
      for (let i = this.tKeywordth.length; i < numberOfTickets; i++) {
        this.tKeywordth.push(this.formBuilderKeywordth.group({
          name: ['', Validators.required]
          // email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.tKeywordth.length; i >= numberOfTickets; i--) {
        this.tKeywordth.removeAt(i);
      }
    }
  }

  onResetKeywordth() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicFormKeywordth.reset();
    this.tKeywordth.clear();
    this.listKeywoedth = [{ id: 1, name: "A1" }]
    this.onChangeTicketsKeywordth(1);
  }

  onClearKeywordth() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.tKeywordth.reset();
  }

  // KeywordEng FormArray
  onChangeTicketsKeywordeng(e) {
    // const numberOfTickets = e.target.value || 0;
    const numberOfTickets = e || 0;
    if (this.tKeywordeng.length < numberOfTickets) {
      for (let i = this.tKeywordeng.length; i < numberOfTickets; i++) {
        this.tKeywordeng.push(this.formBuilderKeywordeng.group({
          name: ['', Validators.required]
          // email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.tKeywordeng.length; i >= numberOfTickets; i--) {
        this.tKeywordeng.removeAt(i);
      }
    }
  }

  onResetKeywordeng() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicFormKeywordeng.reset();
    this.tKeywordeng.clear();
    this.listKeywoedeng = [{ id: 1, name: "A1" }]
    this.onChangeTicketsKeywordeng(1);
  }

  onClearKeywordeng() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.tKeywordeng.reset();
  }

  // from write journal
  loading = false;
  submitted = false;
  error = '';
  fileUploadrequest = ''
  aboutMajorrequest = ''
  headingEng = ''
  item: any
  valueCoauthor = ''
  valueKeywordth = ''
  valueKeywordeng = ''

  journalid: any
  onSubmit(journalFrominput: any) {

    var arrayControl = this.dynamicFormCoAuthor.get('tickets') as FormArray;
    var item = arrayControl.at(0);
    this.valueCoauthor = ''
    for (let i = 0; i < arrayControl.length; i++) {
      if (i == (arrayControl.length - 1) && arrayControl.length == 1) {
        var item = arrayControl.at(i);
        this.valueCoauthor += item.value.name
      } else if (i == (arrayControl.length - 1) && arrayControl.length > 1) {
        var item = arrayControl.at(i);
        this.valueCoauthor += item.value.name
      } else if (i != (arrayControl.length - 1)) {
        var item = arrayControl.at(i);
        this.valueCoauthor += item.value.name + ","
      }
    }
    console.log(this.valueCoauthor)

    arrayControl = this.dynamicFormKeywordth.get('ticketsKeywordth') as FormArray;
    this.valueKeywordth = ''
    for (let i = 0; i < arrayControl.length; i++) {
      if (i == (arrayControl.length - 1) && arrayControl.length == 1) {
        var item = arrayControl.at(i);
        this.valueKeywordth += item.value.name
      } else if (i == (arrayControl.length - 1) && arrayControl.length > 1) {
        var item = arrayControl.at(i);
        this.valueKeywordth += item.value.name
      } else if (i != (arrayControl.length - 1)) {
        var item = arrayControl.at(i);
        this.valueKeywordth += item.value.name + ","
      }
    }
    console.log(this.valueKeywordth)

    arrayControl = this.dynamicFormKeywordeng.get('ticketsKeywordeng') as FormArray;
    this.valueKeywordeng = ''
    for (let i = 0; i < arrayControl.length; i++) {
      if (i == (arrayControl.length - 1) && arrayControl.length == 1) {
        var item = arrayControl.at(i);
        this.valueKeywordeng += item.value.name
      } else if (i == (arrayControl.length - 1) && arrayControl.length > 1) {
        var item = arrayControl.at(i);
        this.valueKeywordeng += item.value.name
      } else if (i != (arrayControl.length - 1)) {
        var item = arrayControl.at(i);
        this.valueKeywordeng += item.value.name + ","
      }
    }
    console.log(this.valueKeywordeng)
    this.journalFrom.patchValue({ coAuthor: this.valueCoauthor, keywordTh: this.valueKeywordth, keywordEng: this.valueKeywordeng });

    // display form values on success
    console.log("Submit")
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.journalFrom.invalid) {
      console.log("journalFrom invalid")
      console.log(this.journalFrom.value)
      this.loading = false;
      if (journalFrominput.profile) {
        this.fileUploadrequest = "* กรุณาเลือกไฟล์บทความ (PDF)"
      } else {
        this.fileUploadrequest = ''
      }
      return;
    } else {
      console.log(this.journalFrom.invalid)
    }

    // stop here if form is invalid
    if (this.dynamicFormKeywordth.invalid) {
      return;
    }

    console.log("Submit 2")

    console.log(this.journalFrom.value)

    this.http.post("/api/insertjournal", this.journalFrom.value).subscribe(
      res => {
        this.journalid = res
        console.log("this.journalid :", this.journalid)
        console.log("insert journal success ", res)
        this.alert = 'success'
        if (this.journalFrom.valid) {
          console.log("Form Submitted!");

          // uploadfile
          const formData = new FormData();
          formData.append('file', this.profileForm.get('profile').value);
          formData.append('userid', "" + this.currentUser.idUserlist);

          formData.append('journalid', this.journalid);
          this.http.post("/api/uploadjournal", formData).subscribe(
            res => {
              console.log("Upload File success", res)
            }, err => {
              console.log("error Upload File ", err)
            })


          this.journalFrom.reset();
          this.onClear()
          this.onClearKeywordth()
          window.scroll(0, 0);
          setTimeout(() => {
            this.router.navigate(['/'])
          }
            , 3000);
        }
      }, err => {
        console.log("error insert journal ", err)
        this.alert = 'fail'
        window.scroll(0, 0);
      })



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

  get f() { return this.journalFrom.controls; }


  selectToday() {
    this.model = this.calendar.getToday();
  }

  onClickaddauthor() {
    this.listAuthor.push({ id: this.listAuthor.length + 1, name: "A" + (this.listAuthor.length + 1) });
    console.log(this.listAuthor.length)
    console.log(this.listAuthor)
    this.onChangeTickets(this.listAuthor.length)

  }

  onClickRemove(course) {
    if (this.listAuthor.length > 1) {
      let index = this.listAuthor.indexOf(course);
      this.listAuthor.splice(index, 1);
      this.onChangeTickets(this.listAuthor.length)
    }
  }

  onClickaddkeywordth() {
    this.listKeywoedth.push({ id: this.listKeywoedth.length + 1, name: "A" + (this.listKeywoedth.length + 1) });
    console.log(this.listKeywoedth.length)
    this.onChangeTicketsKeywordth(this.listKeywoedth.length)

  }

  onClickRemovekeywordth(keyword) {
    if (this.listKeywoedth.length > 1) {
      let index = this.listKeywoedth.indexOf(keyword);
      this.listKeywoedth.splice(index, 1);
      this.onChangeTicketsKeywordth(this.listKeywoedth.length)

    }
  }

  onClickaddkeywordeng() {
    this.listKeywoedeng.push({ id: this.listKeywoedeng.length + 1, name: "A" + (this.listKeywoedeng.length + 1) });
    console.log(this.listKeywoedeng.length)
    this.onChangeTicketsKeywordeng(this.listKeywoedeng.length)

  }

  onClickRemovekeywordeng(keyword) {
    if (this.listKeywoedeng.length > 1) {
      let index = this.listKeywoedeng.indexOf(keyword);
      this.listKeywoedeng.splice(index, 1);
      this.onChangeTicketsKeywordeng(this.listKeywoedeng.length)

    }
  }

  checkList(): boolean {
    if (this.listKeywoedth.length == 0)
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


}
