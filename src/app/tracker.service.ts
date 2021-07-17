import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecord } from './IRecord';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  SERVICE_HOST: string = 'http://localhost:8083/api';

  constructor(private http: HttpClient) { }

  getDetails(emailAddress: string): Observable<IRecord[]> {
    let url = '';

    // If emailAddress is missing then try to fetch the first 10 records
    if(!emailAddress) {
      url = this.SERVICE_HOST + '/details';
    } else {
      url = this.SERVICE_HOST + '/details?emailAddress=' + emailAddress;
    }
    return this.http.get<IRecord[]>(url);
  }

  saveDetails(record: IRecord) {
    return this.http.post(this.SERVICE_HOST + '/save', record);
  }
}
