import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    apiURL:string = environment.API_URL;
    //apiURL:string = "http://localhost:3000/api";

    constructor(private http:HttpClient) { }

    callApi(data: any, apiEndPoint: string) {
      const requestPayload = {
        data
      };
      const consolecolor = 'font-size:12px; font-weight: bold;padding:3px 2px;color:';
      console.log('%c' + apiEndPoint + ':', consolecolor + 'green');
      console.dir(apiEndPoint + ':' + JSON.stringify(requestPayload, null, 2));
      return this.http.post(apiEndPoint, requestPayload, this.httpOptions);
    }



    loginUser(user) {
        return this.http.post<any>(
            `${this.apiURL}/login`,
            user
        );
    }

    logoutUser(token){
        return this.http.post<any>(
            `${this.apiURL}/logout`,
            {
                'key': 'value'
            },
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    isLoggedIn(){
        return !!localStorage.getItem('token');
    }
}
