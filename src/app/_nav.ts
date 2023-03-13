import { INavData } from '@coreui/angular';

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
    icon: 'fa fa-calendar-check-o',
    children: [
      {
        name: 'Interventi',
        url: '/interventi/lista',
        icon: 'fa fa-tasks'
      },
      {
        name: '----',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      }

    ]
  },
  {
    name: 'Scarica guida',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },

];
