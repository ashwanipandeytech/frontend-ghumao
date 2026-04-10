import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from '../utility.service';

import{ApiService} from 'src/app/services/api.service'
import * as moment from 'moment';

@Component({
  selector: 'app-enquirymodal',
  templateUrl: './enquirymodal.component.html',
  styleUrls: ['./enquirymodal.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EnquirymodalComponent implements OnInit {

  inquiryform: any = {};
  inquiryData: { fullName: string; phone: string; email: string; destination: string; noOfTravellers: string; travellingMonth: string; };
  minDate:any;
  constructor(public utilitiservice:UtilityService,private apiservice:ApiService,public toastr:ToastrService) { }

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
    console.info(moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'))
    console.info(this.inquiryData);//return false;
    this.apiservice.callApiWithBearer(requestPayload, 'enquiery/add').subscribe((res: any) => {

      this.toastr.success('Thank you! We have received your Enquiry.');

    })





  }


}
