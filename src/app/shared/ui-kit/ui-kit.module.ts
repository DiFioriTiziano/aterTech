import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesComponent } from '../../features/tecnici/interventi/components/data-tables/data-tables.component';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { interventiNote_ModalComponent } from '../../features/tecnici/interventi/modals/interventi-note/interventi-note_modal.component';
import { InterventiUpdateContainerComponent } from '../../features/tecnici/interventi/modals/interventi-update/interventi-update-container.component';
import { InterventiUpdateComponent } from '../../features/tecnici/interventi/modals/interventi-update/interventi-update.component';



@NgModule({
  declarations: [
   DataTablesComponent,
   FilterAllPipe,
   interventiNote_ModalComponent,
   InterventiUpdateComponent,
   InterventiUpdateContainerComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    PaginationConfig
  ],
  exports: [
    DataTablesComponent,
    FilterAllPipe,
    interventiNote_ModalComponent,
    InterventiUpdateComponent,
    InterventiUpdateContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalModule

  ]
})
export class UiKitModule { }
