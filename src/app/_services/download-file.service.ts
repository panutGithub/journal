import { Injectable } from '@angular/core';
import {HttpResponse,HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DownloadFileService {

  constructor(private http: HttpClient) {}

  downloadFile(userid:any,journalid:any):Observable<HttpResponse<Blob>>{
      return this.http.get('link-api', {responseType: 'blob',observe:'response'});
  }
}