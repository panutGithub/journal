import { Component, OnInit, Input, forwardRef, Inject } from '@angular/core';
import { Role, User, ExpertiseTh } from '@app/_models';
import { AuthenticationService, TitledetailService } from '@app/_services';
import { AppComponent } from '@app/app.component';
import { ModalService } from '../_modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-peerlist',
  templateUrl: './peerlist.component.html',
  styleUrls: ['./peerlist.component.css']
})
export class PeerlistComponent implements OnInit {
  currentUser: User
  checkSelectPeer: boolean = false
  peerList: any
  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent, private authenticationService: AuthenticationService, public fake: TitledetailService,
    public checkSelectPeerService: TitledetailService, private modalService: ModalService, private http: HttpClient) {
    this.currentUser = app.currentUser
    this.peerList = fake.usersAll
    this.departmentAll = fake.department
    this.checkSelectPeer = this.checkSelectPeerService.checkSelectPeer
    app.titlepage = "รายชื่อผู้ประเมิน"
    this.onSelect("ทั้งหมด")
    this.peerlistapi()
    this.searchUserall()

    // this.http.get('/api/searchpeer').subscribe(res => {
    //   console.log(res)
    //   this.peerList = res
    // }, err => {
    //   console.log(err)
    // })

  }

  peerlistapi() {
    this.http.get('/api/searchAllUser').subscribe(res => {
      console.log(res)
      this.peerList = res
    }, err => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  // get expertise
  test = "ทั้งหมด"
  testEnumExpertise = ExpertiseTh
  allPeer: boolean
  onSelect(selectedItem: any) {
    selectedItem == "ทั้งหมด" ? this.allPeer = true : this.allPeer = false
    console.log("onSelect ", selectedItem)
  }

  filterSearch: any = "expertise"
  onClickfilter(input) {
    this.filterSearch = input
    console.log("Test filter ", input)
  }

  // get department
  departmentAll: any = []
  checkListPeer: any = []
  checkboxleanShow: boolean = true
  checkboxleanHide: boolean = true
  checkSubmit: boolean = false
  disabled = false
  get onSubmit() {
    if (this.checkListPeer.length < 2) {
      return this.checkSubmit = true
    }
  }



  checkBoxPeer(list) {
    console.log("Start  ", this.checkListPeer)
    let x = 0
    for (let i = 0; i < this.checkListPeer.length; i++) {
      if (list.id == this.checkListPeer[i].id) {
        x++;
        console.log(list.id, '   ', this.checkListPeer[i].id)
      }
    }

    if (x == 0 && this.checkListPeer.length < 2) {
      this.checkListPeer.push(list)
      console.log('x = 0', this.checkListPeer)
    }
    else if (x == 1) {
      console.log("x==1")
      for (let i = 0; i < this.checkListPeer.length; i++) {
        if (list.id == this.checkListPeer[i].id) {
          let index = this.checkListPeer.indexOf(list);
          this.checkListPeer.splice(index, 1);
          // this.checkListPeer[i] = {}
        }
      }
    }
    console.log(this.checkListPeer)
    // console.log(list)
  }

  userbyid: any = [{
    id: 3,
    username: null,
    password: null,
    title: null,
    role: "",
    firstName: "",
    lastName: "",
    firstNameEng: "123",
    lastNameEng: "",
    department_id: "",
    major_id: "",
    expertise_id: "",
    department: "",
    major: "",
    expertise: "",
    email: "",
    telephoneNumber: "",
    tel: "",
    address: "",
    line: "",
    facebook: "",
    accountNumber: null,
    bank: null
  }]
  userAll: any = []
  searchUserall() {
    this.user = []
    this.http.get('/api/searchAllUser').subscribe(res => {
      console.log(res)
      this.userAll = res
    }, err => {
      console.log(err)
    })
  }
  author: any
  searchAuthor() {
    this.author = []
    this.http.get('/api/searchUser').subscribe(res => {
      console.log(res)
      this.author = res
    }, err => {
      console.log(err)
    })
  }
  peerlist :any
  searchPeerlist(){
    this.peerlist = []
    this.http.get('/api/searchpeerlist').subscribe(
      res=>{
        this.peerlist = res
        console.log(res)
      },err=>{
        console.log(err)
      }
    )
  }

  changeRole(){
    this.http.post('/api/',{}).subscribe(
      res=>{

      },err=>{

      }
    )
  }

  user: any
  openModal(id: any, userid) {
    this.checkSelectPeerService.checkSelectPeer = true
    this.modalService.open(id);
    console.log(userid)
    for (var getuserlist of this.peerList) {
      if (userid == getuserlist.idUserlist) {
        this.user = getuserlist
        console.log(getuserlist)
        break
      }
    }

    console.log(this.user) 
    if(userid != "register"){
      this.test123(userid)
    }
  }

  test123(userid) {
    const req = this.http.post('/api/searchuserbyid', { idUserlist: '' + userid })
    req.subscribe(res => {
      console.log(res)
      this.user = res
    })
  }

  closeModal(id: any) {
    this.checkSelectPeerService.checkSelectPeer = false
    this.modalService.close(id);
  }



}
