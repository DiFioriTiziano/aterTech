import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterventiRoutingModule } from './interventi-routing.module';
import { UiKitModule } from '../../../shared/ui-kit/ui-kit.module';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
//import { TokenApiInterceptor } from '../../../shared/token-api.interceptor';


@NgModule({
  declarations: [InterventiListContainerComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    InterventiRoutingModule,
    UiKitModule
  ],
  providers: [

  ],
})
export class InterventiModule { }
