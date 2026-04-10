import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  callApi(data: any, apiEndPoint: string) {
    const requestPayload = {
      data
    };

    const consolecolor = 'font-size:12px; font-weight: bold;padding:3px 2px;color:';
    console.log('%c' + apiEndPoint + ':', consolecolor + 'green');
    console.dir(apiEndPoint + ':' + JSON.stringify(requestPayload, null, 2));
    return this.http.post(apiEndPoint, requestPayload, this.httpOptions);
  }
}


