import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-apps-line',
    link: '',
    id_line: 1 // Tambahkan id_line untuk menu ini
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
    id_line: 1
  },
  {
    id: 6,
    label: 'Standart Operating Procedure',
    icon: 'ri-file-list-3-line',
    id_line: 1,
    subItems: [
      {
        id: 7,
        label: 'Dashboard',
        parentId: 6,
        link: '/sop',
        role: 4,
        id_line: 1
      },
    ]
  },
  {
    id: 8,
    label: 'Maintenance Part',
    icon: 'ri-settings-4-line',
    id_line: -1,
    subItems: [
      {
        id: 10,
        label: 'AL4',
        link: '/maintenance/1',
        id_line: 1 // Tambahkan id_line untuk sub-menu ini
      },
      {
        id: 9,
        label: 'CAN',
        link: '/maintenance/2',
        id_line: 2
      },
      {
        id: 12, // Ubah id untuk memastikan unik
        label: 'PET',
        link: '/maintenance/3',
        id_line: 3
      },
      {
        id: 11,
        label: 'GBL',
        link: '/maintenance/4',
        id_line: 4
      },
    ]
  }
];
      // {
      //   id: 11,
      //   label: 'OC3',
      //   link: '/maintenance-oc3',
      // },
      // {
      //   id: 11,
      //   label: 'ENMIX-SACHET',
      //   link: '/maintenance-enmix',
      // }
  

