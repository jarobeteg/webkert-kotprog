import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FlightService } from '../../shared/services/flight.service';
import { Router } from '@angular/router';
import { Flight } from '../../shared/models/Flight';
import { Booking } from '../../shared/models/Booking';
import { MatDialog } from '@angular/material/dialog';
import { FlightDialogComponent } from './flight-dialog/flight-dialog.component';
import { BookingService } from '../../shared/services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  flightOptions: Flight[] = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private auth: AuthService, 
    private flightService: FlightService,
    private bookingService: BookingService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.flightService.getAll().subscribe(options => {
      this.flightOptions = options;
    });

    this.auth.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  onFlightBooked(flight: Flight) {
    if (this.loggedInUser) {
      const dialog = this.dialog.open(FlightDialogComponent, {
        data: {
          title: 'Select your seat type to book!'
        }
      });

      dialog.componentInstance.dialogRef = dialog;

      dialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.addBooking(flight, true);
        } else if (result === false) {
          this.addBooking(flight, false);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  addBooking(flight: Flight, isFirstClassSeat: boolean) {
    const uid = this.loggedInUser?.uid;
    const booking: Booking = {
      bookingId: this.bookingService.generateId(),
      flight: {
        arrivalTime: flight.arrivalTime,
        date: flight.date,
        departureCity: flight.departureCity,
        departureTime: flight.departureTime,
        destinationCity: flight.destinationCity,
        price: flight.price
      },
      isFirstClassSeat: isFirstClassSeat,
      userId: uid as string
    }

    this.bookingService.create(booking).then(_ => {

    }).catch(error => {
      console.error(error);
    });
  }
}
