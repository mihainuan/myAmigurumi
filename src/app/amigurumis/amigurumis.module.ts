import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// 3rd party dependencies
import { MaterialModule } from '../shared/material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// My dependencies
import { CamposModule } from '../shared/components/campos/campos.module';
import { ListAmigurumisComponent } from './list-amigurumis/list-amigurumis.component';
import { NewAmigurumiComponent } from './new-amigurumi/new-amigurumi.component';
import { ViewAmigurumiComponent } from './view-amigurumi/view-amigurumi.component';
 

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [
    ListAmigurumisComponent,
    NewAmigurumiComponent,
    ViewAmigurumiComponent
  ]
})
export class AmigurumisModule {}
