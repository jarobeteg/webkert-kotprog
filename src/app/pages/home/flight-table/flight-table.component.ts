import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from '../../../shared/models/Flight';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss']
})
export class FlightTableComponent implements OnInit {
  @Input() flights: Flight[] = [];
  @Output() flightBooked: EventEmitter<Flight> = new EventEmitter<Flight>();
  dataSource: MatTableDataSource<Flight> = new MatTableDataSource();
  displayedColumns: string[] = ['departureCity', 'destinationCity', 'airline', 'date', 'departureTime', 
  'arrivalTime', 'flightDuration', 'vacantFirstClassSeats', 'vacantSecondClassSeats', 'price', 'bookFlight'];

  constructor() { }

  ngOnInit(): void { 
    this.dataSource = new MatTableDataSource(this.flights);
  }

  bookFlight(flight: Flight) {
    this.flightBooked.emit(flight);
  }

}
