import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Role, Journal, StatusJournal } from '@app/_models';



const users: User[] = [
    // { idUserlist: 1, userId: 'adminA1', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'สาขาคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Admin },
    // { idUserlist: 2, userId: 'userA1', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะเทคโนโลยี', major: 'สาขาเคมี', email: '123B@hotmail.com', tel: '099-2222-3333', telephoneNumber: '021-222-333', facebook: 'asd 444', line: "@123-22", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.User },
    // { idUserlist: 3, userId: 'peerP1', username: 'peer1', password: 'peer1', firstName: 'AuthorP1', lastName: 'UserP1', firstNameEng: 'NameP1', lastNameEng: 'lastname', department: 'คณะการจัดการ', major: 'สาขาคณิตศาสตร์', email: '123C@hotmail.com', tel: '091-3333-4444', telephoneNumber: '021-333-444', facebook: 'asd 333', line: "@123-33", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Peer },
    // { idUserlist: 4, userId: 'peerP2', username: 'peer2', password: 'peer2', firstName: 'AuthorP2', lastName: 'UserP2', firstNameEng: 'NameP2', lastNameEng: 'lastnameP1', department: 'คณะการจัดการ', major: 'สาขาคณิตศาสตร์', email: '123C@hotmail.com', tel: '091-3333-4444', telephoneNumber: '021-333-444', facebook: 'asd 333', line: "@123-33", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Peer },
    // { idUserlist: 5, userId: 'peerP3', username: 'peer3', password: 'peer3', firstName: 'AuthorP3', lastName: 'UserP3', firstNameEng: 'NameP3', lastNameEng: 'lastnameP1', department: 'คณะการจัดการ', major: 'สาขาคณิตศาสตร์', email: '123C@hotmail.com', tel: '091-3333-4444', telephoneNumber: '021-333-444', facebook: 'asd 333', line: "@123-33", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Peer }
];
 
const journal: Journal[] = [
    // {
    //     id: 1, articleid: 'A1', idAuthor: "userB2", expertiseid: 1, assessmentid: 1, aboutMajor: "", expertise: "expertise", authorName: "authorName", authorLastname: "authorLastname",
    //     coAuthor: ['Apple', 'Orange', 'Banana'], headingTh: "headingTh", headingEng: "headingEng", keyword: ['A', 'B', 'C'], journalStatusid: 1, journalStatus: StatusJournal.SubmissionWaitingEdit,
    //     abstractTh: "abstractTh", abstractEng: "abstractEng", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com",
    //     editioNumber: 11, yearOfWriting: "2019 - 12 - 1", pathFile: 'C:\\Test path'
    // }
]

// let users = JSON.parse(localStorage.getItem('users')) || [];
let journal1 = JSON.parse(localStorage.getItem('journal1')) || [];

@Injectable({ providedIn: 'root' })
export class FakeBackendInterceptor implements HttpInterceptor {
    usersApi : any
    constructor(private http: HttpClient){
       
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/write') && method === 'POST':
                    return write();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }
  
        // route functions

        function authenticate() { 
            
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.idUserlist,
                // userId: user.userId,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.idUserlist}`
            });
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.idUserlist)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function write() {
            console.log("function write()")
            const user = body
            console.log("user ",user)
            if (journal.find(x => x.articleid === user.articleid)) {
                console.log("x.articleid === user.articleid")
                return error('Username "' + user.articleid + '" is already taken')
            }
            console.log("set user.articleid")
            user.yearOfWriting = new Date
            user.articleid = "A1"+journal.length ? Math.max(...journal.map(x => x.idJournallist)) + 1 : 1;
            console.log("set push")
            journal.push(user);
            console.log("localStorage")
            localStorage.setItem('journal1', JSON.stringify(journal1));

            return ok();
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().idUserlist !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.idUserlist === idFromUrl());
            return ok(user);
        }

        // function deleteUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     users = users.filter(x => x.id !== idFromUrl());
        //     localStorage.setItem('users', JSON.stringify(users));
        //     return ok();
        // }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.idUserlist === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

@Injectable({ providedIn: 'root' })
export class Getuser {
    users1: User[] = [
        // { id: 1, userId: 'peerA1', username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะวิทยาศาสตร์', major: 'วิทยาการคอมพิวเตอร์', email: '123A@hotmail.com', tel: '098-1111-2222', telephoneNumber: '021-111-222', facebook: 'asd 555', line: "@123-11", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Admin },
        // { id: 2, userId: 'userB1', username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะครุศาสตร์', major: 'วิทยาศาสตร์ทั่วไป', email: '123B@hotmail.com', tel: '099-2222-3333', telephoneNumber: '021-222-333', facebook: 'asd 444', line: "@123-22", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.User },
        // { id: 3, userId: 'peerB1', username: 'peer', password: 'peer', firstName: 'Author', lastName: 'User', firstNameEng: 'Name', lastNameEng: 'lastname', department: 'คณะการจัดการ', major: 'บัญชี', email: '123C@hotmail.com', tel: '091-3333-4444', telephoneNumber: '021-333-444', facebook: 'asd 333', line: "@123-33", address: "Dummy Address Lorem Ipsum Sit Amet Dummy Pin Dummy place Telephone : 1-800-123-4567 Email : info@dummy.com", role: Role.Peer }
    ];

}