import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private firestore: AngularFirestore) {}

  // gets messages from DB
  getMessages() {
    return this.firestore.collection('messages').snapshotChanges();
  }

  //  adds message to DB
  createMessage(message: IMessage) {
    return this.firestore.collection('messages').add(message);
  }

  // updates message in DB
  updateMessage(message: IMessage) {
    delete message.id;
    this.firestore.doc('messages/' + message.id).update(message);
  }

  //  deletes message from DB
  deleteMessage(messageId: string) {
    this.firestore.doc('messages/' + messageId).delete();
  }
}
