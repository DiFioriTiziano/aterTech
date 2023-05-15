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
    icon: 'fa fa-gears',
    children: [
      {
        name: 'Interventi',
        url: '/interventi',
        icon: 'fa fa-gear',
        children: [
          {
            name: 'programmazione',
            url: '/interventi/programmazione',
            icon: 'fa fa-calendar-plus-o'
          },
          {
            name: 'Validazioni',
            url: '/interventi/validazioni',
            icon: 'fa fa-check-circle-o',
            attributes: { disabled: false },
          },
          {
            name: 'Lista',
            url: '/interventi/lista',
            icon: 'fa fa-tasks'
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
