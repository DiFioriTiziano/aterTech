
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [ TestComponent ]
})
export class SharedModule { }
