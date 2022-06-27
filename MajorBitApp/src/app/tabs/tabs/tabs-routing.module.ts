import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () =>
          import('../../search/search.module').then((m) => m.SearchPageModule),
      }
    ]
  }
];

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [
//       {
//         path: 'tab1',
//         loadChildren: () =>
//           import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
//       },
//       {
//         path: 'tab2',
//         loadChildren: () =>
//           import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
//       },
//       {
//         path: 'tab3',
//         loadChildren: () =>
//           import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
//       },
//       {
//         path: '',
//         redirectTo: '/app/tabs/single-page',
//         pathMatch: 'full',
//       },
//       // {
//       //   path: 'home',
//       //   loadChildren: () =>
//       //     import('../pages/home/home.module').then((m) => m.HomePageModule),
//       // },
//       {
//         path: 'change-password',
//         loadChildren: () =>
//           import('../pages/change-password/change-password.module').then(
//             (m) => m.ChangePasswordPageModule
//           ),
//       },
//       {
//         path: 'account',
//         loadChildren: () =>
//           import('../pages/account/account.module').then(
//             (m) => m.AccountPageModule
//           ),
//       },
//       {
//         path: 'news',
//         loadChildren: () =>
//           import('../pages/news/news.module').then((m) => m.NewsPageModule),
//       },
//       {
//         path: 'details/:id',
//         loadChildren: () =>
//           import('../pages/details/details.module').then(
//             (m) => m.DetailsPageModule
//           ),
//       },
//       {
//         path: 'details',
//         loadChildren: () =>
//           import('../pages/details/details.module').then(
//             (m) => m.DetailsPageModule
//           ),
//       },
//       {
//         path:'single-page',
//         loadChildren: () =>
//           import('../pages/single-page/single-page.module').then((m)=>m.SinglePagePageModule),},
//       {
//         path: 'details/:tipologia/:categoria/:sottocategoria/:azienda',
//         loadChildren: () =>
//           import('../pages/details/details.module').then(
//             (m) => m.DetailsPageModule
//           ),
//       },
//       {
//         path: 'chisiamo',
//         loadChildren: () =>
//           import('../pages/chisiamo/chisiamo.module').then(
//             (m) => m.ChisiamoPageModule
//           ),
//       },
//       {
//         path: 'contatti',
//         loadChildren: () =>
//           import('../pages/contatti/contatti.module').then(
//             (m) => m.ContattiPageModule
//           ),
//       },
//       {
//         path: 'comunicati',
//         loadChildren: () =>
//           import('../pages/comunicati/comunicati.module').then(
//             (m) => m.ComunicatiPageModule
//           ),
//       },
//       {
//         path: 'details-comunicati/:id',
//         loadChildren: () =>
//           import('../pages/details-comunicati/details-comunicati.module').then(
//             (m) => m.DetailsComunicatiPageModule
//           ),
//       },
//       {
//         path: 'single-page/:tipologia/:categoria/:sottocategoria/:azienda',
//         loadChildren: () =>
//           import('../pages/single-page/single-page.module').then(
//             (m) => m.SinglePagePageModule
//           ),
//       },
//       {
//         path: 'single-page/:tipologia',
//         loadChildren: () =>
//           import('../pages/single-page/single-page.module').then(
//             (m) => m.SinglePagePageModule
//           ),
//       },
//       {
//         path: 'login',
//         loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
//       },
 //   ],
 // },
 // {
 //   path: '',
//    redirectTo: '/app/tabs/single-page',
//    pathMatch: 'full',
//  },
//];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
