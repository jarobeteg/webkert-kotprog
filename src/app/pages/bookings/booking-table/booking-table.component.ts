import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../../shared/models/Booking';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss']
})
export class BookingTableComponent {
  @Input() bookings: Booking[] = [];
  @Output() bookingDeleted: EventEmitter<Booking> = new EventEmitter<Booking>();
  dataSource: MatTableDataSource<Booking> = new MatTableDataSource();
  displayedColumns: string[] = ['departureCity', 'destinationCity', 'date', 'departureTime', 'arrivalTime',
    'price', 'isFirstClassSeat', 'deleteBooking'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.bookings);
  }

  deleteBooking(booking: Booking) {
    this.bookingDeleted.emit(booking);
  }
}
