import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';


@NgModule({
  declarations: [InterventiListContainerComponent],
  imports: [
    CommonModule,
    InterventiRoutingModule,
    UiKitModule
  ]
})
export class InterventiModule { }
