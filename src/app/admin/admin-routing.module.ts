import { ViewFeedbackComponent } from './components/pages/manage-feedback/view-feedback/view-feedback.component';
import { ViewEnquiryComponent } from './components/pages/manage-enquiry/view-enquiry/view-enquiry.component';
import { AddEnquiryComponent } from './components/pages/manage-enquiry/add-enquiry/add-enquiry.component';
import { EditItineraryComponent } from './components/pages/manage-itinerary/edit-itinerary/edit-itinerary.component';
import { AddItineraryComponent } from './components/pages/manage-itinerary/add-itinerary/add-itinerary.component';
import { SelectPackageComponent } from './components/pages/manage-itinerary/select-package.component';
import { ManageItineraryComponent } from './components/pages/manage-itinerary/manage-itinerary.component';
import { ManageFeedbackComponent } from './components/pages/manage-feedback/manage-feedback.component';
import { ManageTestimonialComponent } from './components/pages/manage-testimonial/manage-testimonial.component';
import { AddTestimonialComponent } from './components/pages/manage-testimonial/add-testimonial/add-testimonial.component';
import { AddDestinationComponent } from './components/pages/manage-destinations/add-destination/add-destination.component';
import { ManageCategoriesComponent } from './components/pages/manage-categories/manage-categories.component';
import { EditPackageComponent } from './components/pages/manage-packages/edit-package/edit-package.component';
import { AddPackageComponent } from './components/pages/manage-packages/add-package/add-package.component';
import { AuthGuard } from '../guard/auth.guard';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { ManagePackagesComponent } from './components/pages/manage-packages/manage-packages.component';
import { ManageDestinationsComponent } from './components/pages/manage-destinations/manage-destinations.component';
import { ManageUserComponent } from './components/pages/manage-user/manage-user.component';
import { ManageEnquiryComponent } from './components/pages/manage-enquiry/manage-enquiry.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './components/pages/manage-categories/add-categories/add-categories.component';
import { EditBannersComponent } from './components/pages/manage-banners/edit-banners/edit-banners.component';
import { EditCategoriesComponent } from './components/pages/manage-categories/edit-categories/edit-categories.component';
import { ManageBannersComponent } from './components/pages/manage-banners/manage-banners.component';
import { AddBannersComponent } from './components/pages/manage-banners/add-banners/add-banners.component';
import { EditDestinationComponent } from './components/pages/manage-destinations/edit-destination/edit-destination.component';
import { ManagePopupsComponent } from './components/pages/manage-popups/manage-popups.component';
import { EditPopupsComponent } from './components/pages/manage-popups/edit-popups/edit-popups.component';
import { AddUserComponent } from './components/pages/manage-user/add-user/add-user.component';
import { EditUserComponent } from './components/pages/manage-user/edit-user/edit-user.component';
import { ManageSeosComponent } from './components/pages/manage-seos/manage-seos.component';
import { AddSeosComponent } from './components/pages/manage-seos/add-seos/add-seos.component';
import { EditSeosComponent } from './components/pages/manage-seos/edit-seos/edit-seos.component';
import { ManageOffersComponent } from './components/pages/manage-offers/manage-offers.component';
import { AddOffersComponent } from './components/pages/manage-offers/add-offers/add-offers.component';
import { EditTestimonialComponent } from './components/pages/manage-testimonial/edit-testimonial/edit-testimonial.component';
import { ManagePackagetypesComponent } from './components/pages/manage-packagetypes/manage-packagetypes.component';
import { ManageAddpackagetypeComponent } from './components/pages/manage-packagetypes/manage-addpackagetype/manage-addpackagetype.component';
import { ManageEditpackagetypeComponent } from './components/pages/manage-packagetypes/manage-editpackagetype/manage-editpackagetype.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/enquiry',
    component: ManageEnquiryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/enquiry/view/:enquiryID',
    component: ViewEnquiryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/enquiry/add',
    component: AddEnquiryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/feedback',
    component: ManageFeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/feedback/view/:_id',
    component: ViewFeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/testimonial',
    component: ManageTestimonialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/testimonial/add',
    component: AddTestimonialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/testimonial/edit/:_id',
    component: EditTestimonialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories',
    component: ManageCategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/add',
    component: AddCategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/categories/edit/:categoryId',
    component: EditCategoriesComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'admin/package-groups',
    component: ManageAddpackagetypeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/package-groups/add',
    component: ManageAddpackagetypeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/package-groups/edit/:id',
    component: ManageEditpackagetypeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/offers',
    component: ManageOffersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/offers/add',
    component: AddOffersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/banners',
    component: ManageBannersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/banners/add',
    component: AddBannersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/banners/edit/:_id',
    component: EditBannersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/popups',
    component: ManagePopupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/popups/edit/:_id',
    component: EditPopupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/destinations',
    component: ManageDestinationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/destinations/add',
    component: AddDestinationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/destinations/edit/:destinationSlug',
    component: EditDestinationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/packages',
    component: ManagePackagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/packages/add',
    component: AddPackageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/packages/add/:_id',
    component: AddPackageComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/packages/edit/:_id',
    component: EditPackageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/itinerary',
    component: SelectPackageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/itinerary/:packageID/manage',
    component: ManageItineraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/itinerary/:packageID/add',
    component: AddItineraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/itinerary/:packageID/edit',
    component: EditItineraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/itinerary/edit/:_id',
    component: EditItineraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    component: ManageUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users/add',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users/edit/:_id',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/seos',
    component: ManageSeosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/seos/add',
    component: AddSeosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/seos/edit/:_id',
    component: EditSeosComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
