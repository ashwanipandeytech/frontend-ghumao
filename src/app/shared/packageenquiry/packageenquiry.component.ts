import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import{ApiService} from 'src/app/services/api.service'
import * as moment from 'moment';
@Component({
  selector: 'app-packageenquiry',
  templateUrl: './packageenquiry.component.html',
  styleUrls: ['./packageenquiry.component.scss']
})
export class PackageenquiryComponent implements OnInit {
  inquiryform:any;
  inquiryData:any;
  minDate:any;

  constructor(private apiservice:ApiService,public toastr: ToastrService) { }

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


//   submitinquiryform(Rform:any){
//     this.inquiryform = Rform.form;
//     if (this.inquiryform.invalid) {
//        return;
//     }

//     this.dataservice.callApi(this.inquiryData, 'sendemail.php').subscribe((res: any) => {
// console.info(res,'enquiry')
//       this.toastr.success('Thank!,We have received your Inquiry.');
//     })



//   }



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
      "Departure":this.inquiryData.travellingMonth///moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'),

    }
    console.info(moment(this.inquiryData.travellingMonth).format('DD-MM-YYYY'))
console.info(this.inquiryData);//return false;
    this.apiservice.callApiWithBearer(requestPayload, 'enquiery/add').subscribe((res: any) => {

      this.toastr.success('Thank you! We have received your Enquiry.');

    })





  }




}
