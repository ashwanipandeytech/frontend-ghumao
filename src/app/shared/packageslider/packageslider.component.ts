import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-packageslider',
  templateUrl: './packageslider.component.html',
  styleUrls: ['./packageslider.component.scss']
})
export class PackagesliderComponent implements OnInit {
  @Input()
  configType: any;

  @Input()
  packageType: string;

    slideConfig={
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1500,
      speed: 1500,
      slidesToShow: 3,
      slidesToScroll: 1,
      pauseOnHover: true,
      pauseOnFocus: false,
      respondTo: 'slider',
      fade: false,
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

  slideConfigPackage = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 2500,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: false,
    respondTo: 'slider',
    fade: false,
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
  sliderconfig: any;
  packageData: any;
  imageSliderImageSrc: string;
  constructor(public utilityservice:UtilityService,private apiService:ApiService) {
   // ////console.info(this.fromPage)
  }


  ngOnInit(): void {
    if(this.configType=='full'){
      this.sliderconfig=this.slideConfig
    }else{
      this.sliderconfig=this.slideConfigPackage
    }

let requestPayload;
////console.info('Popular',this.packageType)

if(this.packageType=='Popular'){
  requestPayload={
    Type:[
      {
        id:"0",
        label:'Popular'
      }
    ]
  }
  ////console.info('Popular')

}
else if(this.packageType=='Honeymoon'){
////console.info('here')
requestPayload={
  Type:[
    {
      id:"4",
      label:'Honeymoon Special'
    }
  ]
}
}

this.apiService.callApiWithBearer(requestPayload, 'package',true).subscribe((response:any) => {

  //   this.packageData=response.data;
     //let resSTR = JSON.parse(response.data);
     this.packageData=response.data;
    //  this.packageData.Programs=JSON.parse(response.data.Programs)
    //  this.packageData.Inclusions=JSON.parse(response.data.Inclusions)
    //  this.packageData.Exclusions=JSON.parse(response.data.Exclusions)
    //  this.packageData.Terms=JSON.parse(response.data.Terms)
    // this.packageData.Type=JSON.parse(response.data.Type)

    // this.packageData.Cancellation=JSON.parse(response.data.Cancellation)


      this.packageData.map((item,index)=>{




        if(this.packageType=='Popular'){

          if(index==0){
            item.reviewCount=30;
            item.stars=true;
            ////console.info(item.reviewCount)
          }
          else if(index==1){
            item.reviewCount=25;
          }
          else if(index==2){
            item.reviewCount=40;
            item.stars=true;
          }
          else if(index==3){
            item.reviewCount=35;
            item.stars=true;
          }
          else if(index==4){
            item.reviewCount=24;
            item.stars=true;
          }
          else if(index==5){
            item.reviewCount=16;
          }
          else  if(index==6){
            item.reviewCount=41;
          }
          else{
            item.reviewCount=37;
            item.stars=true;
          }

        }
        if(this.packageType=='Honeymoon'){

          if(index==0){
            item.reviewCount=36;
            item.stars=true;
          }
         else if(index==1){
            item.reviewCount=26;
          }
         else if(index==2){
            item.reviewCount=40;
            item.stars=true;
          }
         else if(index==3){
            item.reviewCount=25;

          }
          else if(index==4){
            item.reviewCount=30;
            item.stars=true;
          }
          else if(index==5){
            item.reviewCount=46;
            item.stars=true;
          }
          else if(index==6){
            item.reviewCount=24;
          }
          else{
            item.reviewCount=35;
            item.stars=true;
          }


      }

      })




     this.packageData.IsActive = (this.packageData.IsActive == 'Yes') ? true : false;

     this.packageData.map((item:any)=>{
      item.src= environment.PACKAGE_FOLDER+item.SliderImage;
     // ////console.info(item.src)
     })

     // this.imgs = response['Images'];


       // this.strtDate = new Date(response.StartDate);
       // this.editPackageForm.patchValue(response);
   });

  }

  slickInit(e: any) {
    //console.info('slick initialized');
  }

  breakpoint(e: any) {
    //console.info('breakpoint');
  }
}
