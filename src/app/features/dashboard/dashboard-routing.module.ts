import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { AuthGuard } from '../../shared/service/auth/auth.guard';


const routes: Routes = [
  {
    path: '',
/*     data: {
      title: 'Dashboard'
    }, */
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
         data: {
          title: 'Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
