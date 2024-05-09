import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  collectionName = 'flights';

  constructor(private afs: AngularFirestore) { }

  create(flight: Flight) {
    return this.afs.collection<Flight>(this.collectionName).doc(flight.flightId).set(flight);
  }

  getAll() {
    return this.afs.collection<Flight>(this.collectionName, ref => ref.orderBy('departureCity')).valueChanges();
  }

  generateId(): string {
    return this.afs.createId();
  }
}
