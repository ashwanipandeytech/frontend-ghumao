import { ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../shared/utility.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PackageComponent implements OnInit {
  newinquiryform: any = {};
  newuseremail:any
  packages: any[];
  slug:any;
  data:any;
  imageSrc: string;
  imageInnerSrc: string;
  slideConfigPackage = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: false,
    respondTo: 'slider',
    adaptiveHeight: false,
    'responsive': [
      {
        'breakpoint': 767,
        'settings': {
          'slidesToShow': 1
        }
      }
    ]



  }

  sticky: boolean = false;
  selector: any = [];
  stopScrollDetection: boolean;
  initTopPosition: any;


  constructor(private changeDetectorRef: ChangeDetectorRef,private route: ActivatedRoute, private apiService: ApiService, private router: Router,public utilityservice:UtilityService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.info('test', this.slug)
    this.loadPackages();
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.location.reload();
      }
    });
  }

  loadPackages() {
    this.apiService.callApiWithBearer('', 'package').subscribe((response: any) => {
      if (response.success && response.data && response.data != '') {
        this.packages = response.data;
        let index = response.data.findIndex(item => item.PackageSlug == this.slug);
        if (index < 0) {
        console.info('package not found')

        } else {


          let token = localStorage.getItem('token');
        let requestPayload= {
          PackageId :this.packages[index].PackageId
}

        this.apiService.callApiWithBearer(requestPayload, 'package/details').subscribe((response:any) => {
          if(response.success){

            this.data=response.data;
            this.data.Programs=JSON.parse(response.data.Programs)
            this.data.Inclusions=JSON.parse(response.data.Inclusions)
            this.data.Exclusions=JSON.parse(response.data.Exclusions)
            this.data.Terms=JSON.parse(response.data.Terms)
            this.data.Type=JSON.parse(response.data.Type)
            this.data.Cancellation=JSON.parse(response.data.Cancellation)
            this.imageSrc = environment.PACKAGE_FOLDER+response.data.Image+"?v="+this.packages[index].PackageId;
            this.imageInnerSrc= environment.PACKAGE_FOLDER+response.data.InnerImage+"?v="+this.packages[index].PackageId;
           // console.info(this.data)
          if(response.data.PakageImages && response.data.PakageImages!=''){
            let PakageImages=JSON.parse(JSON.stringify(response.data.PakageImages))
            this.data.PakageImages=[]
               this.data.PakageImages=PakageImages.filter(item=>item.ImageType=='SliderImage')
               this.data.PakageImages.map(item=>{
                item.Image= environment.PACKAGE_FOLDER+item.Image+"?v="+this.packages[index].PackageId+'?index='+index;

              })

              }




          }else{
            this.data = [];
          }
          });

        }

      } else {

      }

    });
  }


  ngAfterViewInit() {

    // get an array of 'href' of each a tag
    this.initTopPosition = $('#myTab').offset().top;
    var navLink = $('.tab li a');
    ////console.info(navLink);
    var aArray = [];
    var selector;
    for (var i = 0; i < navLink.length; i++) {
      ////console.info(i);
      var aChild = navLink[i];
      var navArray = $(aChild).attr('tabid');
      ////console.info(navArray);
      aArray.push('#'+navArray);
      ////console.info(aArray);
      selector = aArray.join(" , ");
      ////console.info(selector);
    }
    //console.info(selector);
    this.selector = aArray;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(value: any) {
    const sections = document.querySelectorAll("section");
    if (this.stopScrollDetection) {
      return false;
    }
  //  console.info($(window).scrollTop(),this.initTopPosition)
    if ($(window).scrollTop() > this.initTopPosition) {
      $('#myTab').addClass('sticky')
    } else if($(window).scrollTop()<800) {
      $('#myTab').removeClass('sticky')
    }
    var scrollTop = $(window).scrollTop();

//  if(!this.stopScrollDetection){


    this.selector.map((item: any) => {
    //  console.info(item)

      var top = $(item).position().top;
      if (scrollTop - top > 270) {

        var id = item.split('#')[1];//$(item.split('#')[1]).attr('tabid');

        $('.tab li a').removeClass('active');
        $('a[tabid="'+id+'"]').addClass('active');
      //  this.changeDetectorRef.detectChanges()


      // let current =''
      // sections.forEach((section) => {
      //   const sectionTop = section.offsetTop;
      //   if (pageYOffset >= sectionTop - 60) {
      //     current = section.getAttribute("id"); }
      // });




      }
    })


 // }



  }

  setActive(id: any) {
    console.info(id)
    this.selector.map((item: any) => {
      var idinner = $(item).attr('id');
      // $('.tab li a').removeClass('active');
      // $('a[href="#' + idinner + '"]').removeClass('active');
     // $('a[href="#' + id + '"]').addClass('active');

      if (item != id) {
       // $('a[href="#' + idinner + '"]').removeClass('active');
      } else {

        this.stopScrollDetection = true;
        setTimeout(() => {
      //    $('a[href="#' + id + '"]').addClass('active');


          let tabId = item.split('#')[1]
          let el = document.getElementById(tabId);
          if (el != null) {

            var topOfElement = el.offsetTop + 300;
            window.scroll({
              top: topOfElement,
              behavior: "smooth"
            });
          //  this.handleScroll(id)

          }

          this.stopScrollDetection = false;
          this.changeDetectorRef.detectChanges()
        }, 500);



        // $(item).scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'start',
        //   inline: 'start',

        // });
      }

      setTimeout(() => {
        this.selector.map((item: any) => {
          if(item!=id){
          //  $(item+'-tab').removeClass('active');
          }else{
          //  $(id+'-tab').addClass('active');
          }

          // var innerId = $(item).attr('id');
          // if(innerId!=id){
          //   $('a[href="#' + id + '"]').removeClass('active');
          // }else{
          //   $('a[href="#' + id + '"]').addClass('active');
          // }
          $('#myTab').addClass('sticky')
        })
        this.changeDetectorRef.detectChanges()



      }, 200);


    })
  }

  slickInit(e: any) {
    //console.info('slick initialized');
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
