import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, AlertService, TitledetailService } from '@app/_services';

@Component({
  selector: 'app-registerpeer',
  templateUrl: './registerpeer.component.html',
  styleUrls: ['./registerpeer.component.css']
})
export class RegisterpeerComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  department: any
  major: any
  departmentNgmodel: any
  majorNgmodel: any
  expertise: any
  expertiseNgmodel: any

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService,
    public fake: TitledetailService, private http: HttpClient) {
 
    this.registerForm = new FormGroup({

      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      major: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      facebook: new FormControl(''),
      line: new FormControl(''),
      address: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.required, Validators.minLength(10)]),
      expertiseName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[a-z0-9]+[a-z0-9]+[a-z0-9]+[a-z0-9]+[a-z0-9]+[a-z0-9]')])
      ),
      role: new FormControl('User'),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    });
  }

  ngOnInit() {
    let url = "/api/"
    this.http.get("/api/searchdepartment").subscribe(
      res => {
        this.department = res
        console.log(this.department)
        for (var value of this.department) {
          this.departmentNgmodel = value.departmentName
          break;
        }
      },
      err => {
        console.log(err)
      });

    this.http.get("/api/searchexpertise").subscribe(
      res => {
        this.expertise = res
        console.log(this.expertise)
      }, err => {
        console.log(err)
      }
    )

    this.http.get("/api/searchmajor").subscribe(
      res => {
        this.major = res
        console.log(res)
        this.onClickDepartment();
      },
      err => {
        console.log(err)
      })


  }

  // major
  majorByDepartment: any
  onClickMajor() {
    // this.majorNgmodel = this.departmentNgmodel
    console.log("majorNgmodel ", this.majorNgmodel)
  }

  // Department
  onClickDepartment() {
    console.log(this.departmentNgmodel)
    this.majorByDepartment = []

    // this.http.get("/api/searchmajorbyDepartment?department="+this.departmentNgmodel).subscribe(
    //     res =>{
    //         this.majorByDepartment = res
    //         for (var value of this.majorByDepartment) {
    //             this.majorNgmodel = value.nameMajor
    //             break;
    //         }
    //     },err=>{
    //         console.log(err)
    //     }
    // )

    for (var valueDepartment of this.department) {
      // console.log("major2   ", valueDepartment)
      if (this.departmentNgmodel == valueDepartment.departmentName) {
        for (var value of this.major) {
          // console.log("major1  ", value)
          // console.log("major2   ", valueDepartment)
          if (valueDepartment.idDepartment === value.idDepartment) {
            // console.log("valueDepartment.id ", valueDepartment.id)
            // console.log("value.idDepartment ", value.idDepartment)
            this.majorByDepartment.push(value)
          }
        }
      }
    }
    this.majorNgmodel = this.majorByDepartment[0].nameMajor
    console.log(this.majorNgmodel)
    this.onClickExpertise()
  }

  // expertise
  expertiseByMajor: any
  onClickExpertise() {
    this.expertiseByMajor = []
    for (var getmajor of this.major) {
      if (this.majorNgmodel == getmajor.nameMajor) {
        for (var getexp of this.expertise) {
          if (getmajor.idMajor == getexp.idMajor) {
            this.expertiseByMajor.push(getexp)
          }
        }
      }
    }
    this.expertiseNgmodel = this.expertiseByMajor[0].expertiseName
    console.log(this.expertiseNgmodel)
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  alert = ""
  alertName = ""
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log("submit 2")

    this.loading = true;
    let url = "/api/insertpeer"
    this.http.post(url, this.registerForm.value).subscribe(
      (res) => {
        this.alertName = "Registration successful"; this.alert = "success"; this.alertService.success('Registration successful', true); this.loading = false; console.log(res);
        this.registerForm.reset();
      },
      (err) => { this.alertName = err; this.alert = "err"; this.alertService.error(err); this.loading = false; console.log(err); }
    );


    // this.userService.register(this.registerForm.value).pipe(first()).subscribe(
    //     data => {
    //         this.alertService.success('Registration successful', true);
    //         this.router.navigate(['/login']);
    //     },
    //     error => {
    //         console.log("Error", error)
    //         this.alertService.error(error);
    //         this.error = error;
    //         this.loading = false;
    //     });
  }
}
