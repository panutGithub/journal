import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-selectpeer',
  templateUrl: './selectpeer.component.html',
  styleUrls: ['./selectpeer.component.css']
})
export class SelectpeerComponent implements OnInit {
  paramsJournalId: any;
  currentUser: any;

  constructor(private route :ActivatedRoute,private authenticationService : AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.route.params.subscribe(params => {
      this.paramsJournalId = params.journal
      console.log("params ",params.journal);
    });
  }

  ngOnInit() {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
