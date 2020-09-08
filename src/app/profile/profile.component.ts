import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { User, Depaertment } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { FakeBackendInterceptor, Getuser } from '@app/_helpers';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showDatainfo = true;
  showAddress: boolean
  profileform : FormGroup
  currentUser: User
  depathment : any

  constructor(@Inject(forwardRef(() => AppComponent)) private app: AppComponent, private authenticationService: AuthenticationService, private fakeUser : Getuser,
  private router: Router) {
    this.app.changeHeader = false

    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // this.currentUser = this.authenticationService.currentUserValue;
    // for (var value of this.currentUser) {
    //   this.currentUser = value
    // }
    this.currentUser = app.currentUser
    this.authenticationService.getDepartment()
    console.log(this.currentUser)

    this.profileform = new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      firstNameEng : new FormControl(),
      lastNameEng : new FormControl(),
      email : new FormControl(),
      tel : new FormControl(),
      telephoneNumber : new FormControl(),
      address : new FormControl(),
      line : new FormControl(),
      facebook : new FormControl(),
      department_id : new FormControl(),
    })


  }

  ngOnInit() {

  }

  ShowContent(showInfo: any) {
    console.log(showInfo);
    if (showInfo == "showDatainfo") {
      this.showDatainfo = true;
      this.showAddress = false;
    }
    if (showInfo == "showContact") {
      this.showDatainfo = false;
      this.showAddress = false;
    }
    if (showInfo == "showAddress") {
      this.showDatainfo = false;
      this.showAddress = true;
    }
  }

  test : User
  
  checkEdit:boolean
  checkEditFunction(){
    
  }

}
