import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BookingService } from '../../shared/services/booking.service';
import { Booking } from '../../shared/models/Booking';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit{
  bookingOptions: Booking[] = [];
  loggedInUser?: firebase.default.User | null;
  loadingComplete: boolean = false;

  constructor(private auth: AuthService,
    private bookingService: BookingService,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.auth.isUserLoggedIn().subscribe(user => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        
        if (user) {
          this.bookingService.getAllForUser(user.uid).subscribe(options => {
            this.bookingOptions = options;
            this.loadingComplete = true;
          });
        } else {
          this.loadingComplete = true;
        }
      }, error => {
        localStorage.setItem('user', JSON.stringify('null'));
        this.loadingComplete = true;
      });
    }

    deleteBooking(booking: Booking) {
      this.bookingService.delete(booking.bookingId).then(_ => {
        window.location.reload();
      }).catch(error => {
        console.error(error);
      });
    }

    changeBooking(booking: Booking) {
      booking.isFirstClassSeat = !booking.isFirstClassSeat;
      this.bookingService.update(booking).then(_ => {
        
      }).catch(error => {
        console.error(error);
      });
    }
}
