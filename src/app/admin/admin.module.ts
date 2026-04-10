import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAppComponent } from './admin.component';

import { SwiperModule } from 'swiper/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';

import { AdminService } from './services/admin.service';

import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ManageUserComponent } from './components/pages/manage-user/manage-user.component';
import { ManageEnquiryComponent } from './components/pages/manage-enquiry/manage-enquiry.component';
import { ChartComponent } from './components/layout/chart/chart.component';
import { ManageDestinationsComponent } from './components/pages/manage-destinations/manage-destinations.component';
import { ManagePackagesComponent } from './components/pages/manage-packages/manage-packages.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { ManageSeosComponent } from './components/pages/manage-seos/manage-seos.component';
import { AddSeosComponent } from './components/pages/manage-seos/add-seos/add-seos.component';
import { EditSeosComponent } from './components/pages/manage-seos/edit-seos/edit-seos.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { PageTitleComponent } from './components/layout/page-title/page-title.component';
import { AddPackageFormComponent } from './components/layout/forms/add-package-form/add-package-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPackageComponent } from './components/pages/manage-packages/add-package/add-package.component';
import { EditPackageComponent } from './components/pages/manage-packages/edit-package/edit-package.component';
import { ManageCategoriesComponent } from './components/pages/manage-categories/manage-categories.component';
import { AddCategoriesComponent } from './components/pages/manage-categories/add-categories/add-categories.component';
import { EditCategoriesComponent } from './components/pages/manage-categories/edit-categories/edit-categories.component';
import { ManageOffersComponent } from './components/pages/manage-offers/manage-offers.component';
import { AddOffersComponent } from './components/pages/manage-offers/add-offers/add-offers.component';
import { ManageBannersComponent } from './components/pages/manage-banners/manage-banners.component';
import { AddBannersComponent } from './components/pages/manage-banners/add-banners/add-banners.component';
import { EditBannersComponent } from './components/pages/manage-banners/edit-banners/edit-banners.component';
import { ManagePopupsComponent } from './components/pages/manage-popups/manage-popups.component';
import { EditPopupsComponent } from './components/pages/manage-popups/edit-popups/edit-popups.component';
import { AddDestinationComponent } from './components/pages/manage-destinations/add-destination/add-destination.component';
import { EditDestinationComponent } from './components/pages/manage-destinations/edit-destination/edit-destination.component';
import { ManageFeedbackComponent } from './components/pages/manage-feedback/manage-feedback.component';
import { ManageTestimonialComponent } from './components/pages/manage-testimonial/manage-testimonial.component';
import { AddTestimonialComponent } from './components/pages/manage-testimonial/add-testimonial/add-testimonial.component';
import { ManageItineraryComponent } from './components/pages/manage-itinerary/manage-itinerary.component';
import { AddItineraryComponent } from './components/pages/manage-itinerary/add-itinerary/add-itinerary.component';
import { EditItineraryComponent } from './components/pages/manage-itinerary/edit-itinerary/edit-itinerary.component';
import { SelectPackageComponent } from './components/pages/manage-itinerary/select-package.component';
import { ViewEnquiryComponent } from './components/pages/manage-enquiry/view-enquiry/view-enquiry.component';
import { AddEnquiryComponent } from './components/pages/manage-enquiry/add-enquiry/add-enquiry.component';
import { ViewFeedbackComponent } from './components/pages/manage-feedback/view-feedback/view-feedback.component';
import { AddUserComponent } from './components/pages/manage-user/add-user/add-user.component';
import { EditUserComponent } from './components/pages/manage-user/edit-user/edit-user.component';
import { DatePipe } from '@angular/common';
import { EditTestimonialComponent } from './components/pages/manage-testimonial/edit-testimonial/edit-testimonial.component';
import { ManagePackagetypesComponent } from './components/pages/manage-packagetypes/manage-packagetypes.component';
import { ManageAddpackagetypeComponent } from './components/pages/manage-packagetypes/manage-addpackagetype/manage-addpackagetype.component';
import { ManageEditpackagetypeComponent } from './components/pages/manage-packagetypes/manage-editpackagetype/manage-editpackagetype.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations: [
        AdminAppComponent,
        DashboardComponent,
        SidenavComponent,
        FooterComponent,
        ManageUserComponent,
        ManageEnquiryComponent,
        ChartComponent,
        ManageDestinationsComponent,
        ManagePackagesComponent,
        ManageSeosComponent,
        AddSeosComponent,
        EditSeosComponent,
        SettingsComponent,
        LogoutComponent,
        PageTitleComponent,
        AddPackageFormComponent,
        AddPackageComponent,
        EditPackageComponent,
        ManageCategoriesComponent,
        AddCategoriesComponent,
        EditCategoriesComponent,
        ManageOffersComponent,
        AddOffersComponent,
        ManageBannersComponent,
        AddBannersComponent,
        EditBannersComponent,
        ManagePopupsComponent,
        EditPopupsComponent,
        AddDestinationComponent,
        EditDestinationComponent,
        ManageFeedbackComponent,
        ManageTestimonialComponent,
        AddTestimonialComponent,
        EditTestimonialComponent,
        ManageItineraryComponent,
        AddItineraryComponent,
        EditItineraryComponent,
        SelectPackageComponent,
        ViewEnquiryComponent,
        AddEnquiryComponent,
        ViewFeedbackComponent,
        AddUserComponent,
        EditUserComponent,
        ManagePackagetypesComponent,
        ManageAddpackagetypeComponent,
        ManageEditpackagetypeComponent
    ],
    imports: [
        BrowserModule,
        AdminRoutingModule,
        SwiperModule,
        HttpClientModule,
        DataTablesModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        FormsModule,
        MatTreeModule,
        MatCheckboxModule,
        MatIconModule
    ],
    providers: [
        AdminService,
        DatePipe
        ],
    bootstrap: [AdminAppComponent]
})
export class AdminModule { }
