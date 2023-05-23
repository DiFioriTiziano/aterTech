
import { INavData } from '@coreui/angular';




let livello  = JSON.parse(localStorage.getItem('authLevelDwh')); // faccio il parse perche nello storage salva solo stringa ma i volori sono diversi alla fonte.
let livello1 = true
let livello2 = true
let livello3 = true

switch(livello) {
  case 1:
    livello1 = false;
    break;
  case 2:
    livello2 = false;
    break;
  case 3:
    livello3 = false;
    break;
  default:
     livello1 = true
     livello2 = true
     livello3 = true
}



export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },

  {
    name: 'Manutenzioni-Servizi',
    url: '/interventi',
    icon: 'fa fa-gears',
    attributes: { class: 'text-warning'},
    children: [
      {
        name: 'Interventi',
        url: '/interventi',
        icon: 'fa fa-gear',
        children: [
          {
            name: 'programmazione',
            url: '/interventi/programmazione',
            icon: 'fa fa-calendar-plus-o',
            attributes: { disabled: (livello1 && livello2)},
          },
          {
            name: 'Convalidazione',
            url: '/interventi/convalida',
            icon: 'fa fa-check-circle-o',
            attributes: { disabled: livello1 },
          },
          {
            name: 'Validazioni',
            url: '/interventi/validazioni',
            icon: 'fa fa-check-circle-o',
            attributes: { disabled: livello1 },
          },
          {
            name: 'Lista',
            url: '/interventi/lista',
            icon: 'fa fa-tasks',
            attributes: { disabled: false },
          }
        ]
      },

    ]
  },
  {
    name: 'Segnalazioni',
    url: '/interventi',
    icon: 'fa fa-bullhorn',
    attributes: { disabled: true }
  },
  {
    name: 'Scarica guida',
    url: 'https://www.aterroma.it/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },

];
