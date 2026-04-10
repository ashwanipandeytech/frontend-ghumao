import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Package } from '../models/package.model';
import { Itinerary } from '../models/itinerary.model';
import { Category } from '../models/category.model';
import { Banner } from '../models/banner.model';
import { Offer } from '../models/offer.model';
import { Popup } from '../models/popup.model';
import { Destination } from '../models/destination.model';
import { Testimonial } from '../models/testimonial.model';
import { Seo } from '../models/seo.model';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  authKey='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWNkZmU3Y2E5Nzg4MjU5MWI2OTdmMjY5Mzc1MjQwNmMzM2M5MWMyYzc5YmZhM2RmMDA4YWU0N2I3NzJjMmUxMjMzOWEzYmI4ZjRlOWViZmIiLCJpYXQiOjE2NTc4MTQzNjQuNzI4NjcxLCJuYmYiOjE2NTc4MTQzNjQuNzI4Njc4LCJleHAiOjE2ODkzNTAzNjQuNjU0OTU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.xfoKWzkeeg0g484Z4mkb3Ywzm2_4Qvj9boVFt6PD35GlKk2za3pmQmf4oxve_4_KmlO6Dj-r-zAjDsF3Spq0X_7ro8Y-FBHQbGyGL0ts5ltGdHXZETyXP7wtc7T95IRGZ9R1mAdsfA5eg8sKWJXzjeWVKRN130a8Bh9uzTQe_BOyIFD04W72gsBV4c7QFOxWX403rGfHHlBbW9OBfFiE6io39BwIRbhkMWgtYtiCSW08HSpKi7rQKspbFaVCYC49dw-PittynIfeXHFNzkJSWcZSa6r-acuRnNscs2OT_iDiQi3BA3J5sMowO_yevC6Hpry4D0kOq0EIBj04gOju9Lvtk1zmwjtXd80ztNXsj0kE0xBHPf2w5nmic49ntdHhR8-oyN_NDMUTUwII2H24F1_FGlY7tQ72WKt4DN_pFCfUwcEJt8HCwVvmnf0y6VzDcVmPsG0f0qxk4c89Lqq_MA-NpneBFPcfdChFKvBVh0h2Uh516M-qFCgGRzB3cD6xRuocSNCcFqonxMtn5ZrY1bQRT7aN0xaa-b-Xl3yv2e6j5QRPb9fz0dv0-yPQ_g8dOLWM0W-q4FNZHcHYh4Gzp9eddrCjyW2XQrgs-HoiIQezgg1BcVumpLgu8AB5dYTLSRw7ago2-rb-aHDPkoSX7RHJgYsWFveR2L-PmgbKa8s'
  apiURL:string = environment.API_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptionsBearerToken = {
    headers: new HttpHeaders({

       'Accept': 'application/json,text/plain, */*',
       'Authorization':'Bearer '+(localStorage.getItem('token'))

    })
  };



    constructor(private http:HttpClient) {}



    callApi(data: any, apiEndPoint: string) {
      const requestPayload = data
      const consolecolor = 'font-size:12px; font-weight: bold;padding:3px 2px;color:';
      console.log('%c' + apiEndPoint + ':', consolecolor + 'green');
      console.dir(apiEndPoint + ':' + JSON.stringify(requestPayload, null, 2));
      return this.http.post(this.apiURL+apiEndPoint, requestPayload, this.httpOptions);
    }

    callApiWithBearer(data: any, apiEndPoint: string,home=false) {
      if(home){
       this.httpOptionsBearerToken = {
          headers: new HttpHeaders({

             'Accept': 'application/json,text/plain, */*',
             'Authorization':'Bearer '+this.authKey

          })
        };
      }
      const requestPayload = data
      const consolecolor = 'font-size:12px; font-weight: bold;padding:3px 2px;color:';
      console.log('%c' + apiEndPoint + ':', consolecolor + 'green');
      console.dir(apiEndPoint + ':' + JSON.stringify(requestPayload, null, 2));
      return this.http.post(this.apiURL+apiEndPoint, requestPayload, this.httpOptionsBearerToken);
    }




    getAllDestinations(): Observable<Destination[]> {
        return this.http.get<Destination[]>(
            `${this.apiURL}/destinations`
        );
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${this.apiURL}/categories`
        );
    }

    getAllCategoriesWeb(): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${this.apiURL}/categories_web`
        );
    }

    getCategoryById(id): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${this.apiURL}/categories/${id}`
        );
    }

    getCategoriesByType(id): Observable<Category[]> {
        return this.http.get<Category[]>(
            `${this.apiURL}/categories_type/${id}`
        );
    }

    getAllBanners(): Observable<Banner[]> {
        return this.http.get<Banner[]>(
            `${this.apiURL}/banners`
        );
    }

    getAllOffers(): Observable<Offer[]> {
        return this.http.get<Offer[]>(
            `${this.apiURL}/offers`
        );
    }

    getAllTestimonials(): Observable<Testimonial[]> {
        return this.http.get<Testimonial[]>(
            `${this.apiURL}/testimonial`
        );
    }

    getAllPackages(): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/packages`
        );
    }

    getSeo(): Observable<Seo[]> {
        return this.http.get<Seo[]>(
            `${this.apiURL}/seos`
        );
    }

    getSeoBySlug(slug): Observable<Seo[]> {
        return this.http.get<Seo[]>(
            `${this.apiURL}/seo_by_slug/${slug}`
        );
    }

    getPackagesByCategory(id): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/category_packages/${id}`
        );
    }

    getPackagesByCategoryFD(id): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/category_packages_fd/${id}`
        );
    }

    getPackagesByDestination(slug): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/destination_packages/${slug}`
        );
    }

    getPackage(id): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/packages/${id}`
        );
    }
    getPackageBySlug(id): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/packagebyslug/${id}`
        );
    }
    getPackageByKey(id): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/packagebykey/${id}`
        );
    }

    getOfferByNumber(id): Observable<Offer[]> {
        return this.http.get<Offer[]>(
            `${this.apiURL}/offerByNumber/${id}`
        );
    }

    getItinerary(id): Observable<Itinerary[]> {
        return this.http.get<Itinerary[]>(
            `${this.apiURL}/package_itineraries/${id}`
        );
    }

    getSearchResults(dest, type, day, price): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/packages/${dest}/${type}/${day}/${price}`
        );
    }

    submitEnquiry(enquiryData){
        return this.http.post<any>(
            `${this.apiURL}/enquiry`,
            enquiryData
        );
    }

    submitFeedback(feedbackData){
        return this.http.post<any>(
            `${this.apiURL}/feedback`,
            feedbackData
        );
    }

    getExecutionCities(category): Observable<Package[]> {
        return this.http.get<Package[]>(
            `${this.apiURL}/execution_cities/${category}`
        );
    }

    getAllPopups(): Observable<Popup[]> {
        return this.http.get<Popup[]>(
            `${this.apiURL}/popups`
        );
    }
}
