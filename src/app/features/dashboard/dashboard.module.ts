import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container.component';
import { DashboardComponent } from './components/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    DashboardContainerComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
