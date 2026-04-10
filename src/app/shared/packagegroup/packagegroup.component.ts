import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packagegroup',
  templateUrl: './packagegroup.component.html',
  styleUrls: ['./packagegroup.component.scss']
})
export class PackagegroupComponent implements OnInit {
  @Input()
  configType: string;

  @Input()
  packageType: string;

    slideConfig={
      dots: false,
      infinite: true,
      autoplay: false,
      arrows: true,
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
  PackageGroup: any=[];
  constructor(public utilityservice:UtilityService,private apiService:ApiService) {
   // //console.info(this.fromPage)
  }


  ngOnInit(): void {


    this.apiService.callApiWithBearer('', 'packagegroup').subscribe((response:any) => {
      if (response.success) {
        if(response.data!=''){
          response.data.map(item=>{
            this.PackageGroup.push({
              moduleCode: item.title,
              ImageType: item.subtitle,
              moduleId: item.Slug,
              id: item.id,
              module:'Packagegroup',
              Image:environment.PACKAGE_GROUP_FOLDER+item.Image
            })
          })

        }else{
         // this.addMore()
        }
       //console.info(response)
      }
      else {

      }


    });

  }

  slickInit(e: any) {
    //console.info('slick initialized');
  }

  breakpoint(e: any) {
    //console.info('breakpoint');
  }

}
