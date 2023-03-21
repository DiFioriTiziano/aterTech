import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
   DataTablesComponent,
   FilterAllPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    PaginationModule.forRoot()
  ],
  providers: [
    PaginationConfig
  ],
  exports: [DataTablesComponent, FilterAllPipe]
})
export class UiKitModule { }
