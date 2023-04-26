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
            name: 'Lista',
            url: '/interventi/lista',
            icon: 'fa fa-tasks'
          },
          {
            name: 'Validazioni',
            url: '/interventi/validazioni',
            icon: 'fa fa-address-card-o',
            attributes: { disabled: false },
          },

        ]
      },

    ]
  },
  {
    name: 'Segnalazioni',
    url: '/interventi',
    icon: 'fa fa-gears',
    attributes: { disabled: true },
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
