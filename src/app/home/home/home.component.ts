import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from 'src/app/shared/utility.service';

import{ApiService} from 'src/app/services/api.service'
import * as moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  inquiryform: any = {};
  newinquiryform: any = {};
  newuseremail:any
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    speed: 1200, fade: true,
    adaptiveHeight: false
  };
  slideConfigPackage={
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1500,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: false,
    respondTo: 'slider',
    adaptiveHeight: true,
    'responsive': [
      {
        'breakpoint': 767,
         'settings': {
          'slidesToShow': 1
                }
              }
            ]



  }
  slideConfigTestimonial = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 2000
  };
  bannerHeight:any;
  inquiryData:any;
  minDate:any;
  constructor(private apiService:ApiService ,public utilityservice:UtilityService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.inquiryData={
      fullName:'',
      phone:'',
      email:'',
      destination:'',
      noOfTravellers:'',
      travellingMonth:''


    }
    this.bannerHeight=820;
    if ($(window).width() < 576) {
      this.bannerHeight=680;
    }


  }
  slickInit(e: any) {
    //console.info('slick initialized');
  }

  breakpoint(e: any) {
    //console.info('breakpoint');
  }

  afterChange(e: any) {
   // //console.info('afterChange');
  }

  beforeChange(e: any) {
   // //console.info('beforeChange');
  }
  submitinquiryform(Rform:any){
    this.inquiryform = Rform.form;
    if (this.inquiryform.invalid) {
       return;
    }

    let requestPayload={
      "PersonName":this.inquiryData.fullName,
      "EmailId":this.inquiryData.email,
      "MobileNo":this.inquiryData.phone,
      "Destination":this.inquiryData.destination,
      "Noper":this.inquiryData.noOfTravellers,
      "Departure":moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'),

    }
    //console.info(moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'))
    //console.info(this.inquiryData);//return false;
    this.apiService.callApiWithBearer(requestPayload, 'enquiery/add').subscribe((res: any) => {

      this.toastr.success('Thank you! We have received your Enquiry.');

    })





  }

  submitinquiryforSignUp(Rform:any){
  if(this.newuseremail==undefined){
    this.toastr.error('Please enter email !');
    return;
  }
    if (Rform.form.invalid ) {
      this.toastr.error('Please enter valid email !');
      return;
   }

    let requestPayload={
      "PersonName":'NEW USERS SPECIAL 10% OFF ',
      "EmailId":this.newuseremail,
      "MobileNo":1111111111,
      "Destination":'NEW USERS SPECIAL 10% OFF ',
      "Noper":0,
      "Departure":moment().format('DD-MM-YYYY'),

    }
    //console.info(moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'))
   // console.info(requestPayload);return false;
    this.apiService.callApiWithBearer(requestPayload, 'enquiery/add').subscribe((res: any) => {

      this.toastr.success('Thank you! We have received your Enquiry.');

    })





  }

}
