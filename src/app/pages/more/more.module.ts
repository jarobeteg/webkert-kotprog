import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';


@NgModule({
  declarations: [
    MoreComponent
  ],
  imports: [
    CommonModule,
    MoreRoutingModule
  ]
})
export class MoreModule { }
