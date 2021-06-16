import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICampaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private firestore: AngularFirestore) {}

  // gets campaigns from DB
  getCampaigns() {
    return this.firestore.collection('campaigns').snapshotChanges();
  }

  //  adds campaign to DB
  createCampaign(campaign: ICampaign) {
    return this.firestore.collection('campaigns').add(campaign);
  }

  // updates campaign in DB
  updateCampaign(campaign: ICampaign) {
    delete campaign.id;
    this.firestore.doc('campaigns/' + campaign.id).update(campaign);
  }

  //  deletes campaign from DB
  deleteCampaign(campaignId: string) {
    this.firestore.doc('campaigns/' + campaignId).delete();
  }
}
