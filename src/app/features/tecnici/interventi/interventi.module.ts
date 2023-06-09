import {CUSTOM_ELEMENTS_SCHEMA,   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { interventiAnnullo_ModalComponent } from './modals/interventi-annullo/interventi-annullo_modal.component';
import { InterventiCreateModalContainerComponent } from './modals/interventi-create/interventi-create-modal-container.component';
import { InterventiCreateModalComponent } from './modals/interventi-create/interventi-create-modal.component';

import { InterventiUpdateComponent } from './modals/interventi-update/interventi-update.component';
import { InterventiUpdateContainerComponent } from './modals/interventi-update/interventi-update-container.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    InterventiListContainerComponent,
    interventiAnnullo_ModalComponent,
    InterventiCreateModalContainerComponent,
    InterventiCreateModalComponent,
    InterventiUpdateComponent,
    InterventiUpdateContainerComponent,
    DataTablesComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterventiRoutingModule,
    UiKitModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    BsModalService,
    PaginationConfig
  ],
})
export class InterventiModule { }
