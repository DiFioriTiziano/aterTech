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
        name: 'Segnalazioni',
        url: '/interventi/lista',
        icon: 'fa fa-address-card-o',
        attributes: { disabled: true },
      },

    ]
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
