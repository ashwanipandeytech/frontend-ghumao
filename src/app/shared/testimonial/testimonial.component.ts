import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  slideConfigTestimonial = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    speed: 2000
  };
  testimonials: any;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.testimonials=[]
    this.loadTestimonials();
}

loadTestimonials(){
    this.apiService.callApiWithBearer({},'testimonial',true).subscribe((response:any) => {
      if(response.success && response.data!=''){
        this.testimonials = response.data;
        this.testimonials.map((item:any)=>{
          item.ImageSrc=environment.TESTIMONIAL_FOLDER+item.Image
        })
      }else{
        this.testimonials =[];
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
