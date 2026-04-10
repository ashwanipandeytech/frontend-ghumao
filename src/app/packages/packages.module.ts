import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackageComponent } from './package.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PackageComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    SharedModule
  ]
})
export class PackagesModule { }
