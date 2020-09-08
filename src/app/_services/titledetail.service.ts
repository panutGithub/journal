import { Injectable } from '@angular/core';
import { Journal, StatusJournal, User, Role, Review } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class TitledetailService {

  changeRole: any
  checkSelectPeer: boolean
  searchInput = ''
  keywordInService: any = []
  journalService : any = []

  journal: Journal[] = [
    // {
    //   id: 1, articleid: 'A1', idAuthor: "userA1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "คอมพิวเตอร์", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: [''], headingTh: "A1 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.Check,
    //   abstractTh: "abstractTh", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 2, articleid: 'A2', idAuthor: "peerP1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "เคมี", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Banana'], headingTh: "A2 School peerP1", headingEng: "headingEng", keyword: ['A2', 'B2', 'C2'], journalStatusid: 1, journalStatus: StatusJournal.Success,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 3, articleid: 'A3', idAuthor: "peerP1", peerId: ['peerP2', ''], expertiseid: 1, assessmentid: 1, aboutMajor: "ชีวะ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A3 Science peerP1", headingEng: "headingEng", keyword: ['A3', 'B3', 'C3'], journalStatusid: 1, journalStatus: StatusJournal.Waiting,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 4, articleid: 'A4', idAuthor: "userA1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "วิทยาศาสตร์การกีฬา", expertise: "Computer", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A4 Com Science userA1", headingEng: "headingEng", keyword: ['A4', 'B4', 'C4'], journalStatusid: 1, journalStatus: StatusJournal.Adjust,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 5, articleid: 'A5', idAuthor: "userA1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "สถิติ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A5 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.WithSelectPeer,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 6, articleid: 'A6', idAuthor: "peerP1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "สาธารณะสุข", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A6 School peerP1", headingEng: "headingEng", keyword: ['A2', 'B2', 'C2'], journalStatusid: 1, journalStatus: StatusJournal.Check,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 7, articleid: 'A7', idAuthor: "peerP1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "สิ่งทอ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A7 Science peerP1", headingEng: "headingEng", keyword: ['A3', 'B3', 'C3'], journalStatusid: 1, journalStatus: StatusJournal.PassedChecking,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 8, articleid: 'A8', idAuthor: "userA1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "เทคโนโลยีอุสาหกรรม", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A8 Com Science userA1", headingEng: "headingEng", keyword: ['A4', 'B4', 'C4'], journalStatusid: 1, journalStatus: StatusJournal.ReadyConsider,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 9, articleid: 'A9', idAuthor: "userA1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "ชีวะ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: [], headingTh: "A9 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.WaitingAdjust,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 10, articleid: 'A10', idAuthor: "peerP1", peerId: [""], expertiseid: 1, assessmentid: 1, aboutMajor: "เคมี", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A10 School peerP1", headingEng: "headingEng", keyword: ['A2', 'B2', 'C2'], journalStatusid: 1, journalStatus: StatusJournal.WithSelectPeer,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 11, articleid: 'A11', idAuthor: "peerP1", peerId: ['peerP2', 'peerP3'], expertiseid: 1, assessmentid: 1, aboutMajor: "คอมพิวเตอร์", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A11 Science peerP1", headingEng: "headingEng", keyword: ['A3', 'B3', 'C3'], journalStatusid: 1, journalStatus: StatusJournal.Waiting,
    //   abstractTh: "abstractTh peerP1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place ",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 12, articleid: 'A12', idAuthor: "peerP2", peerId: ['peerP2', 'peerP3'], expertiseid: 1, assessmentid: 1, aboutMajor: "สิ่งทอ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A12 Com Science userA1", headingEng: "headingEng", keyword: ['A4', 'B4', 'C4'], journalStatusid: 1, journalStatus: StatusJournal.Waiting,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
    // {
    //   id: 13, articleid: 'A13', idAuthor: "peerP3", peerId: ["peerP2", 'peerP1'], expertiseid: 1, assessmentid: 1, aboutMajor: "สถิติ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A13 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.Waiting,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['R3', 'R4']
    // },
    // {
    //   id: 14, articleid: 'A14', idAuthor: "userA1", peerId: ['peerP3', 'peerP1'], expertiseid: 1, assessmentid: 1, aboutMajor: "สถิติ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A14 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.Waiting,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['R1', 'R2']
    // },
    // {
    //   id: 15, articleid: 'A15', idAuthor: "userA1", peerId: ['peerP3', 'peerP1'], expertiseid: 1, assessmentid: 1, aboutMajor: "สถิติ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A15 System userA1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.Adjust,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['R5', 'R6']
    // },
    // {
    //   id: 16, articleid: 'A16', idAuthor: "peerP1", peerId: ['peerP3', 'peerP2'], expertiseid: 1, assessmentid: 1, aboutMajor: "สถิติ", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //   coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "A16 System peerP1", headingEng: "headingEng", keyword: ['A1', 'B1', 'C1'], journalStatusid: 1, journalStatus: StatusJournal.Adjust,
    //   abstractTh: "abstractTh userA1", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place",
    //   editioNumber: 11, yearOfWriting: "2019 - 12 - 1", transactionTime: '2019 - 10 - 1', pathFile: 'C:\\Test path', reviewId: ['']
    // },
  ]
  //coAuthor: ['Apple', 'Orange', 'Banana'], 
  usersAll: User[] = [
    // { id: 1, userId: 'peerP1', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", role: Role.Admin, expertiseName: "คอมพิวเตอร์", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 2, userId: 'userA1', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "คณิตศาสตร์ประยุกค์", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 3, userId: 'peerB1', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', role: Role.Peer, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "สาธารณสุขชุมชน", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 4, userId: 'peerA3', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "ชีววิทยา", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 5, userId: 'userB1', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "เคมี", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 6, userId: 'peerB4', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', role: Role.Peer, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "สถิติประยุกค์", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 7, userId: 'peerA5', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "คอมพิวเตอร์", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 8, userId: 'userB3', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "วิทยาศาสตร์สิ่งแวดล้อม", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 9, userId: 'peerB6', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", role: Role.Peer, expertiseName: "การกีฬา", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 10, userId: 'peerA7', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "ชีววิทยา", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 11, userId: 'userB5', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "เคมี", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 12, userId: 'peerA8', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', role: Role.Peer, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "อาหาร", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 13, userId: 'peerB9', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "อาหาร", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 21, userId: 'userB8', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "วิทยาศาสตร์สิ่งแวดล้อม", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 31, userId: 'peerB10', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', role: Role.Peer, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "สาธารณสุขชุมชน", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 41, userId: 'peerA11', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "เทคโนโลยีอุสาหกรรม", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 51, userId: 'userB11', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "ภูมิศาสตร์และภูมิสารสนเทศ", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" },
    // { id: 61, userId: 'peerB12', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', role: Role.Peer, firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", expertiseName: "สิ่งท่อ", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com" }

  ];

  department: any = [
    { name: "คณะวิทยาศาสตร์" },
    { name: "คณะครุศาสตร์" },
    { name: "คณะเทคโนโลยีอุตสาหกรรม" },
    { name: "คณะเทคโนโลยีการเกษตร" },
    { name: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
    { name: "คณะวิทยาการจัดการ" },
    { name: "คณะพยาบาลศาสตร์" },
    { name: "บัณฑิตวิทยาลัย" },
  ]

  review: Review[] = [
    { id: 'R1', userId: 'peerP1', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 1-----------------------------------------------------------', reviewAll: '11' },
    { id: 'R2', userId: 'peerP1', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 2-----------------------------------------------------------', reviewAll: '22' },
    { id: 'R3', userId: 'peerP2', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 3-----------------------------------------------------------', reviewAll: '33' },
    { id: 'R4', userId: 'peerP2', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 4-----------------------------------------------------------', reviewAll: '44' },
    { id: 'R5', userId: 'peerP3', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 5-----------------------------------------------------------', reviewAll: '55' },
    { id: 'R6', userId: 'peerP3', review1: '2', review2: '3', review3: '4', review4: '5', review5: '6', review6: '7', review: 'Review 6-----------------------------------------------------------', reviewAll: '66' },
  ]

  constructor() {
  }

  // Date Time

  currentDate() {
  }
}
