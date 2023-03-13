import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Test'
    },
    children: [
      {
        path: '',
        redirectTo: 'test'
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'Test'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
