import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//TODO: import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';
import { ListAmigurumisComponent } from './list-amigurumis/list-amigurumis.component';
import { NewAmigurumiComponent } from './new-amigurumi/new-amigurumi.component';
import { ViewAmigurumiComponent } from './view-amigurumi/view-amigurumi.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    //InfiniteScrollModule
  ],
  declarations: [
    ListAmigurumisComponent, 
    NewAmigurumiComponent, 
    ViewAmigurumiComponent
  ]
})
export class AmigurumisModule { }