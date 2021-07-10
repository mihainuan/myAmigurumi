import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmigurumisModule } from './amigurumis/amigurumis.module';
import { ListAmigurumisComponent } from './amigurumis/list-amigurumis/list-amigurumis.component';
import { NewAmigurumiComponent } from './amigurumis/new-amigurumi/new-amigurumi.component';
import { ViewAmigurumiComponent } from './amigurumis/view-amigurumi/view-amigurumi.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'amigurumis',
    pathMatch: 'full'
  },
  {
    path: 'amigurumis',
    children: [
      {
        path: '',
        component: ListAmigurumisComponent
      },
      {
        path: 'new',
        children: [
          {
            path: '',
            component: NewAmigurumiComponent
          },
          {
            path: ':id',
            component: NewAmigurumiComponent
          }
        ]
      },
      {
        path: ':id',
        component: ViewAmigurumiComponent,
        pathMatch: 'full'
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'amigurumis' 
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AmigurumisModule  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
