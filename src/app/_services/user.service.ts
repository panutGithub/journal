import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Journal } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    writeJournal(journal:Journal){
        console.log(this.http.post(`${environment.apiUrl}/users/write`,journal)) 
        return this.http.post(`${environment.apiUrl}/users/write`,journal)
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}