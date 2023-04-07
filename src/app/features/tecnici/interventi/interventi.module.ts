import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { BsModalService } from 'ngx-bootstrap/modal';
import { interventiAnnullo_ModalComponent } from './modals/interventi-annullo/interventi-annullo_modal.component';
import { InterventiCreateModalContainerComponent } from './modals/interventi-create/interventi-create-modal-container.component';
import { InterventiCreateModalComponent } from './modals/interventi-create/interventi-create-modal.component';




@NgModule({
  declarations: [
    InterventiListContainerComponent,
    interventiAnnullo_ModalComponent,
    InterventiCreateModalContainerComponent,
    InterventiCreateModalComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    InterventiRoutingModule,
    UiKitModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    BsModalService,
    PaginationConfig,

  ],
})
export class InterventiModule { }
