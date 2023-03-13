import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ContainerLoginComponent } from './container-login.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Auth'
    },
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'login'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
