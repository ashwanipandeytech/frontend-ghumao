import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageenquiryComponent } from './packageenquiry/packageenquiry.component';
import { PackagesliderComponent } from './packageslider/packageslider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import {HttpClientModule} from '@angular/common/http'; // add this line
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { EnquirymodalComponent } from './enquirymodal/enquirymodal.component';
import { UtilityService } from './utility.service';
import { PackagegroupComponent } from './packagegroup/packagegroup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    PackageenquiryComponent,
    PackagesliderComponent,
    TestimonialComponent,
    EnquirymodalComponent,
    PackagegroupComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    PackageenquiryComponent,
    PackagesliderComponent,
    PackagegroupComponent,
    TestimonialComponent,
    EnquirymodalComponent,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule,
    CommonModule,
    BsDatepickerModule
  ],
    providers: [
    DataService,
    UtilityService,
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class SharedModule { }
