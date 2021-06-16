import { Injectable } from '@angular/core';
import { IContact } from '../models/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private firestore: AngularFirestore) {}

  // gets contacts from DB
  getContacts() {
    return this.firestore.collection('contacts').snapshotChanges();
  }

  //  adds contact to DB
  createContact(contact: IContact) {
    return this.firestore.collection('contacts').add(contact);
  }

  // updates contact in DB
  updateContact(contact: IContact) {
    delete contact.id;
    this.firestore.doc('contacts/' + contact.id).update(contact);
  }

  //  deletes contact from DB
  deleteContact(contactId: string) {
    this.firestore.doc('contacts/' + contactId).delete();
  }
}
