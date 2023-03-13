import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'interventi'
    },
    children: [
      {
        path: '',
        redirectTo: 'lista'
      },
      {
        path: 'lista',
        component: InterventiListContainerComponent,
        data: {
          title: 'lista'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventiRoutingModule { }
