import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: ' ri-apps-line',
    link: '',
  },
  {
    id: 2,
    label: 'Data Master',
    icon: 'ri-user-3-line',
    link: '/master',
    role: 1,
    id_line: 1
  },
  {
    id: 3,
    label: 'Supplies',
    icon: 'ri-home-gear-line',
    link: '/listpage',
  },
  {
    id: 6,
    label: 'Standart Operating Procedure',
    icon: 'ri-file-list-3-line',
    subItems: [
      {
        id: 7,
        label: 'Dashboard',
        parentId: 6,
        link: '/sop',
        role: 4,
        id_line: 3
      },
    ]
  },
  {
    id: 8,
    label: 'Maintenance Part',
    icon: 'ri-settings-4-line',
    subItems :[
      {
        id: 10,
        label: 'AL4',
        link: '/maintenance',
        
      },
      {
        id: 9,
        label: 'CAN',
        link: '/maintenance-can',
      }, 
      {
        id: 9,
        label: 'PET',
        link: '/maintenance-pet',
      },  

      {
        id: 11,
        label: 'GBL',
        link: '/maintenance-gbl',
      }, 
      {
        id: 11,
        label: 'OC3',
        link: '/maintenance-oc3',
      },
      {
        id: 11,
        label: 'ENMIX-SACHET',
        link: '/maintenance-enmix',
      },
    ]
  }
];
