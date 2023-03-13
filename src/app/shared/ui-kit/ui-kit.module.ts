import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
   DataTablesComponent,
   FilterAllPipe
  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports: [DataTablesComponent, FilterAllPipe ]
})
export class UiKitModule { }
