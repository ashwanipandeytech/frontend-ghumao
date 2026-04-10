import { Feedback } from './../../models/feedback.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { States } from 'src/app/models/states.model';
import { Enquiry } from 'src/app/models/enquiry.model';
import { Popup } from 'src/app/models/popup.model';
import { Category } from 'src/app/models/category.model';
import { Package } from 'src/app/models/package.model';
import { Itinerary } from 'src/app/models/itinerary.model';
import { Seo } from 'src/app/models/seo.model';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
   apiURL:string = "https://omshubhyatra.in/api";
   //apiURL:string = "http://localhost:3000/api";

    constructor(private http:HttpClient) {}

    uploadImage(image, token) {
        return this.http.post<any>(
            `${this.apiURL}/upload_image`,
            image,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                ),
                reportProgress: true,
                observe: 'events'
            }
        );
    }

    getUsers(token): Observable<User[]> {
        return this.http.get<User[]>(
            `${this.apiURL}/users`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getUserById(token, _id): Observable<User> {
        return this.http.get<User>(
            `${this.apiURL}/users/${_id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addUser(singleUser, token) {
        return this.http.post<any>(
            `${this.apiURL}/users`,
            singleUser,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editUser(singleUser, token, _id) {
        return this.http.patch<any>(
            `${this.apiURL}/users/${_id}`,
            singleUser,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    changeUserPWD(token, OldPWD, PWD, _id): Observable<any> {
        return this.http.get<any>(
            `${this.apiURL}/change_password/${OldPWD}/${PWD}/${_id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteUser(token, _id) {
        return this.http.delete(
            `${this.apiURL}/users/${_id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addPackage(singlePackage, token) {
        return this.http.post<any>(
            `${this.apiURL}/packages`,
            singlePackage,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editPackage(singlePackage, token, packageId) {
        return this.http.patch<any>(
            `${this.apiURL}/packages/${packageId}`,
            singlePackage,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getPackageById(token, id): Observable<Package> {
        return this.http.get<Package>(
            `${this.apiURL}/packages/${id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    GgetPackageByPackageId(token, id): Observable<Package> {
        return this.http.get<Package>(
            `${this.apiURL}/package_by_packageid/${id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getCategoryById(token, id): Observable<Category> {
        return this.http.get<Category>(
            `${this.apiURL}/categories/${id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getBannerById(token, id): Observable<Category> {
        return this.http.get<Category>(
            `${this.apiURL}/banners/${id}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getOfferById(token, id): Observable<Category> {
        return this.http.get<Category>(
            `${this.apiURL}/Offers/${id}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getPopupById(token, id): Observable<Popup> {
        return this.http.get<Popup>(
            `${this.apiURL}/popups/${id}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getSeoById(token, id): Observable<Seo> {
        return this.http.get<Seo>(
            `${this.apiURL}/seos/${id}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addCategory(singleCategory, token) {
        return this.http.post<any>(
            `${this.apiURL}/categories`,
            singleCategory,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editCategory(singleCategory, token, categoryId) {
        return this.http.patch<any>(
            `${this.apiURL}/categories/${categoryId}`,
            singleCategory,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    addBanner(singleBanner, token) {
        return this.http.post<any>(
            `${this.apiURL}/banners`,
            singleBanner,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addOffer(singleOffer, token) {
        return this.http.post<any>(
            `${this.apiURL}/offers`,
            singleOffer,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addSeo(singleSeo, token) {
        return this.http.post<any>(
            `${this.apiURL}/seos`,
            singleSeo,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editBanner(singleBanner, token, bannerId) {
        return this.http.patch<any>(
            `${this.apiURL}/banners/${bannerId}`,
            singleBanner,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteBanner(bannerId, token) {
        return this.http.delete(
            `${this.apiURL}/banners/${bannerId}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    deleteOffer(offerId, token) {
        return this.http.delete(
            `${this.apiURL}/offers/${offerId}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addTestimonial(singleTestimonial, token) {
        return this.http.post<any>(
            `${this.apiURL}/testimonial`,
            singleTestimonial,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editTestimonial(singleTestimonial, token, TestimonialId) {
        return this.http.patch<any>(
            `${this.apiURL}/testimonial/${TestimonialId}`,
            singleTestimonial,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteTestimonial(testimonialId, token) {
        return this.http.delete(
            `${this.apiURL}/testimonial/${testimonialId}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editPopup(singlePopup, token, popupId) {
        return this.http.patch<any>(
            `${this.apiURL}/popups/${popupId}`,
            singlePopup,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deletePopups(popupId, token) {
        return this.http.delete(
            `${this.apiURL}/popups/${popupId}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    deactivatePopup(popupId, token) {
        //console.log(token);
        return this.http.patch(
            `${this.apiURL}/deactivatepopup/${popupId}`,{'IsActive':false},
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    activatePopup(popupId, token) {
        return this.http.patch<any>(
            `${this.apiURL}/activatepopup/${popupId}`,{'IsActive':true},
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    editSeo(singleSeo, token, categoryId) {
        return this.http.patch<any>(
            `${this.apiURL}/seos_edit/${categoryId}`,
            singleSeo,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteCategory(categoryId, token) {
        return this.http.delete(
            `${this.apiURL}/categories/${categoryId}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deactivateCategory(categoryId, token) {
        //console.log(token);
        return this.http.patch(
            `${this.apiURL}/deactivatecategories/${categoryId}`,{'IsActive':false},
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    activateCategory(categoryId, token) {
        return this.http.patch<any>(
            `${this.apiURL}/activatecategories/${categoryId}`,{'IsActive':true},
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deletePackage(packageId, token) {
        return this.http.delete(
            `${this.apiURL}/packages/${packageId}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addDestination(singleDestination, token) {
        return this.http.post<any>(
            `${this.apiURL}/Destinations`,
            singleDestination,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getAllStates(): Observable<States[]> {
        return this.http.get<States[]>(
            `${this.apiURL}/states`
        );
    }

    getItineraryById(token, _id): Observable<Itinerary> {
        return this.http.get<Itinerary>(
            `${this.apiURL}/itineraries/${_id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addItinerary(singleItinerary, token) {
        return this.http.post<any>(
            `${this.apiURL}/itineraries`,
            singleItinerary,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    editItinerary(singleItinerary, token, _id) {
        return this.http.patch<any>(
            `${this.apiURL}/itineraries/${_id}`,
            singleItinerary,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteItinerary(itineraryId, token) {
        return this.http.delete(
            `${this.apiURL}/itineraries/${itineraryId}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getAllEnquiry(token, userID, roleID): Observable<Enquiry[]> {
        return this.http.get<Enquiry[]>(
            `${this.apiURL}/enquiry_by_user/${roleID}/${userID}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getEnquiry(token, enquiryID): Observable<Enquiry[]> {
        return this.http.get<Enquiry[]>(
            `${this.apiURL}/enquiry/${enquiryID}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    addQuery(singleQuery, token) {
        return this.http.post<any>(
            `${this.apiURL}/enquiry`,
            singleQuery,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    assignEnquiry(token, enquiryID, enquiry){
        return this.http.patch<any>(
            `${this.apiURL}/enquiry/${enquiryID}`,
            enquiry,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    multiAssignEnquiry(token, enquiryID, enquiry){
        return this.http.patch<any>(
            `${this.apiURL}/assign_enquiry/${enquiry}/${enquiryID}`,
            enquiry,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    multiDeleteEnquiry(token, enquiry){
        return this.http.delete<any>(
            `${this.apiURL}/delete_enquiry/${enquiry}`,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    markEnquiry(token, enquiryID, enquiry){
        return this.http.patch<any>(
            `${this.apiURL}/mark_enquiry/${enquiryID}`,
            enquiry,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    followupEnquiry(token, enquiryID, enquiry){
        return this.http.patch<any>(
            `${this.apiURL}/followup_enquiry/${enquiryID}`,
            enquiry,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }


    aditionalNotes(token,enquiryID, notes){
        return this.http.patch<any>(
            `${this.apiURL}/aditional_notes/${enquiryID}`,
            notes,
            {
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteEnquiry(token, enquiryID) {
        return this.http.delete(
            `${this.apiURL}/enquiry/${enquiryID}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getAllFeedbacks(token): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(
            `${this.apiURL}/feedback`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    getFeedback(token, _id): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(
            `${this.apiURL}/feedback/${_id}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    deleteFeedback(feedbackID, token) {
        return this.http.delete(
            `${this.apiURL}/feedback/${feedbackID}`,
            { 
                headers: new HttpHeaders(
                    {
                        'token': token
                    }
                )
            }
        );
    }

    // getAllCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>(
    //         `${this.apiURL}/categories`
    //     );
    // }

    // getAllPackages(): Observable<Package[]> {
    //     return this.http.get<Package[]>(
    //         `${this.apiURL}/packages`
    //     );
    // }

    // getPackagesByCategory(id): Observable<Package[]> {
    //     return this.http.get<Package[]>(
    //         `${this.apiURL}/category_packages/${id}`
    //     );
    // }

    // getPackagesByDestination(slug): Observable<Package[]> {
    //     return this.http.get<Package[]>(
    //         `${this.apiURL}/destination_packages/${slug}`
    //     );
    // }

    // getItinerary(id): Observable<Itinerary[]> {
    //     return this.http.get<Itinerary[]>(
    //         `${this.apiURL}/package_itineraries/${id}`
    //     );
    // }

    // getSearchResults(destination, category, startDate, endDate): Observable<Package[]> {
    //     return this.http.get<Package[]>(
    //         `${this.apiURL}/packages/${destination}/${category}/${startDate}/${endDate}`
    //     );
    // }
}