import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UtilityService } from '../shared/utility.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  popularpackages: any;
  newuseremail:any
  constructor(private apiService:ApiService,public utilityservice:UtilityService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.popularpackages=[]
    let requestPayload={
      Type:[
        {
          id:"0",
          label:'Popular'
        }
      ]
    }
    this.apiService.callApiWithBearer(requestPayload, 'package').subscribe((response:any) => {

     if(response.success &&response.data!=''){
      this.popularpackages=response.data;

      const res = [];
     let  chunkSize=2;
      for (let i = 0; i <  this.popularpackages.length; i += chunkSize) {
          const chunk =  this.popularpackages.slice(i, i + chunkSize);
          res.push(chunk);
      }
      this.popularpackages=res
      //console.info(this.popularpackages)


     }else{
       this.popularpackages=[]
     }



         // this.imgs = response['Images'];


           // this.strtDate = new Date(response.StartDate);
           // this.editPackageForm.patchValue(response);
       });
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
