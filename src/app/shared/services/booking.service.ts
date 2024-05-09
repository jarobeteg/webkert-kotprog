import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  collectionName = 'bookings';

  constructor(private afs: AngularFirestore) { }

  create(booking: Booking) {
    return this.afs.collection<Booking>(this.collectionName).doc(booking.bookingId).set(booking);
  }

  getAllForUser(uid: string) {
    return this.afs.collection<Booking>(this.collectionName, ref => ref.where('userId', '==', uid)).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Booking>(this.collectionName).doc(id).delete();
  }

  generateId(): string {
    return this.afs.createId();
  }
}
