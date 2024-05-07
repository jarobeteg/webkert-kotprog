import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Aircraft } from '../models/Aircraft';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  collectionName = 'aircrafts';

  constructor(private afs: AngularFirestore) { }

  create(aircraft: Aircraft) {
    return this.afs.collection<Aircraft>(this.collectionName).doc(aircraft.aircraftId).set(aircraft);
  }

  getAll() {
    return this.afs.collection<Aircraft>(this.collectionName).valueChanges();
  }
}
