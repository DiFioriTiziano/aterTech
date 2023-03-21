import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { InterventiCreateModalComponent } from './modals/interventi-create/interventi-create-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InterventiListContainerComponent, InterventiCreateModalComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    InterventiRoutingModule,
    UiKitModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [

  ],
})
export class InterventiModule { }
