import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICrime } from '../models/crime.model';

@Injectable({
  providedIn: 'root'
})
export class CrimesService {
  constructor(private firestore: AngularFirestore) {}

  // gets crimes from DB
  getCrimes() {
    return this.firestore.collection('crimes').snapshotChanges();
  }

  //  adds crime to DB
  createCrime(crime: ICrime) {
    return this.firestore.collection('crimes').add(crime);
  }

  // updates crime in DB
  updateCrime(crime: ICrime) {
    delete crime.id;
    this.firestore.doc('crimes/' + crime.id).update(crime);
  }

  //  deletes crime from DB
  deleteCrime(crimeId: string) {
    this.firestore.doc('crimes/' + crimeId).delete();
  }
}
