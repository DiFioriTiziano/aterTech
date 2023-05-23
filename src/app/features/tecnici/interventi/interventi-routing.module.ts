import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterventiListContainerComponent } from './interventi-list/interventi-list-container.component';
import { InterventiValidaListContainerComponent } from './interventi-valida-list/interventi-valida-list-container.component';
import { AuthGuard } from '../../../shared/service/auth/auth.guard';
import { InterventiProgrammaContainerComponent } from './interventi-programma/interventi-programma-container.component';
import { InterventiConvalidaContainerComponent } from './interventi-convalida/interventi-convalida-container.component';


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
        canActivate: [AuthGuard],
        data: {
          title: 'lista'
        }
      },
      {
        path: 'convalida',
        component: InterventiConvalidaContainerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Convalida'
        }
      },
      {
        path: 'validazioni',
        component: InterventiValidaListContainerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'validazioni'
        }
      },
      {
        path: 'programmazione',
        component: InterventiProgrammaContainerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Programmazione'
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
