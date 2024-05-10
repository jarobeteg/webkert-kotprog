import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from '../../shared/pipes/pipe.module';


@NgModule({
  declarations: [
    BookingsComponent,
    BookingTableComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    PipeModule
  ]
})
export class BookingsModule { }
