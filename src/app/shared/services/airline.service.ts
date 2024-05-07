import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Airline } from '../models/Airline';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  collectionName = 'airlines';

  constructor(private afs: AngularFirestore) { }

  create(airline: Airline) {
    return this.afs.collection<Airline>(this.collectionName).doc(airline.airlineId).set(airline);
  }

  getAll() {
    return this.afs.collection<Airline>(this.collectionName).valueChanges();
  }
}
