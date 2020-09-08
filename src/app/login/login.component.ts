import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { AlertService } from '@app/_services/alert.service';
import { HttpClient } from '@angular/common/http';
import { User, Journal } from '@app/_models';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService,
        private http: HttpClient) {
        // redirect to home if already logged in

        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['/returnUrl'] || '/'; //returnUrl
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    errLogin = ''
    userlogin: any
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.loading = false;
            return;
        }

        // this.http.post("/api/login", this.loginForm.value).subscribe(
        //     res => {
        //         if (!res) {
        //             console.log("null")
        //         } else {
        //             console.log("Not null")
        //             this.userlogin = res
        //             localStorage.setItem('currentUser', JSON.stringify(this.userlogin));
        //             this.currentUserSubject.next(this.userlogin);
        //             this.router.navigate([this.returnUrl]);
        //             console.log("login success")
        //         }
        //         console.log(this.userlogin)
        //     },
        //     err => {
        //         console.log(err)
        //     }
        // )
        // this.loading = false;

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // console.log(data)
                    this.loading = false;
                    if (!data) {
                        this.error = "Username or password is incorrect"
                    } else {
                        //     this.authenticationService.getDepartment()
                        //     .pipe(first())
                        //     .subscribe(
                        //         res => {
                        //             console.log(res)
                        //         },
                        //         error => {
                        //             console.log(error)
                        //         });
                        // this.authenticationService.getMajor()
                        //     .pipe(first())
                        //     .subscribe(
                        //         res => {
                        //             console.log(res)
                        //         },
                        //         error => {
                        //             console.log(error)
                        //         });

                        // window.location.href = this.returnUrl
                    }
                    this.router.navigate([this.returnUrl]);
                    window.scroll(0, 0);
                },
                error => {
                    this.alertService.error(error);
                    this.error = "Username or password is incorrect";
                    this.loading = false;
                    console.log("err")
                });
    }
}
