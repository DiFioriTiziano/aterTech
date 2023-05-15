import {CUSTOM_ELEMENTS_SCHEMA,   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { InterventiCreateModalContainerComponent } from './modals/interventi-create/interventi-create-modal-container.component';
import { InterventiCreateModalComponent } from './modals/interventi-create/interventi-create-modal.component';

import { InterventiUpdateComponent } from './modals/interventi-update/interventi-update.component';
import { InterventiUpdateContainerComponent } from './modals/interventi-update/interventi-update-container.component';
import { InterventiListComponent } from './interventi-list/interventi-list.component';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NotificationsRoutingModule } from '../../../views/notifications/notifications-routing.module';
import { InterventiFileComponent } from './modals/interventi-file/interventi-file.component';
import { InterventiFileContainerComponent } from './modals/interventi-file/interventi-file-container.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { InterventiValidaListComponent } from './interventi-valida-list/interventi-valida-list.component';
import { InterventiValidaListContainerComponent } from './interventi-valida-list/interventi-valida-list-container.component';




@NgModule({
  declarations: [
    InterventiListContainerComponent,
    InterventiCreateModalContainerComponent,
    InterventiCreateModalComponent,
    InterventiUpdateComponent,
    InterventiUpdateContainerComponent,
    InterventiListComponent,
    InterventiFileComponent,
    InterventiFileContainerComponent,
    InterventiValidaListComponent,
    InterventiValidaListContainerComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterventiRoutingModule,
    UiKitModule,
    TimepickerModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    NotificationsRoutingModule
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
