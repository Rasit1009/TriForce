import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Kunden-Dashboard',
    icon: 'fa fa-home',
    link: '/pages/dashboard1',
    //home: true,
  },
  
  {
    title: 'Konsumentendaten verwalten',
    icon: 'fa fa-user-o',
    link: '/pages/datacomplete_consumer',
   // home: true,
  },
  {
    title: 'LoloCODE Generieren',
    icon: 'fa fa-qrcode',
    link: '/pages/qrgenerate',
   // home: true,
  },
  {
    title: 'Händler in deiner Nähe',
    icon: 'fa fa-map-marker',
    link: '/pages/sellermap',
  },
  {
    title: 'Meine Händler',
    icon: 'fa fa-shopping-bag ',
    link: '/pages/seller-overview',
  },

];

export const MENU_ITEMS_SELLER : NbMenuItem[] = [
  {
    title: 'Händler-Dashboard',
    icon: 'fa fa-home',
    link: '/pages/dashboard2',
    //home: true,
  },
{
  title: 'Händlerdaten verwalten',
  icon: 'fa fa-user-o',
  link: '/pages/datacomplete_seller',
 // home: true,
},
{
  title: 'LoloCODE Scannen',
  icon: 'fa fa-qrcode',
  link: '/pages/qrscan',
 // home: true,
},
];

export const MENU_ITEMS_FIRST : NbMenuItem[] =[
  {
    title: 'Bitte Wählen Sie',
    icon: 'fa fa-question-circle-o',
    link: '/pages/sc-choice',
    //home: true,
  }
];



  /**
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  }, */

