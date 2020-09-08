import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(private calendar: NgbCalendar, private userService: UserService, private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.idUserlist).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }

    model: NgbDateStruct;
    date: { year: number, month: number };


    selectToday() {
        this.model = this.calendar.getToday();
    }
}