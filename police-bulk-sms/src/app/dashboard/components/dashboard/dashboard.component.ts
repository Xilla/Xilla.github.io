import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/contacts/models/contact.model';
import { ICrime } from 'src/app/setups/models/crime.model';
import { IMessage } from 'src/app/setups/models/message.model';
import { ContactsService } from 'src/app/contacts/services/contacts.service';
import { MessagesService } from 'src/app/setups/services/messages.service';
import { CrimesService } from 'src/app/setups/services/crimes.service';
import { ICampaign } from 'src/app/sms/models/campaign.model';
import { SmsService } from 'src/app/sms/services/sms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // arrays
  contacts: IContact[] = [];
  crimes: ICrime[] = [];
  messages: IMessage[] = [];
  campaigns: ICampaign[] = [];

  constructor(
    private contactService: ContactsService,
    private messageService: MessagesService,
    private crimeService: CrimesService,
    private campaignService: SmsService
  ) {}

  ngOnInit(): void {
    // get stored contacts from DB
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data.map(contact => {
        return {
          id: contact.payload.doc.id,
          ...(contact.payload.doc.data() as IContact)
        } as IContact;
      });
    });

    // get stored messages from DB
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(message => {
        return {
          id: message.payload.doc.id,
          ...(message.payload.doc.data() as IMessage)
        } as IMessage;
      });
    });

    // get stored crimes from DB
    this.crimeService.getCrimes().subscribe(data => {
      this.crimes = data.map(crime => {
        return {
          id: crime.payload.doc.id,
          ...(crime.payload.doc.data() as ICrime)
        } as ICrime;
      });
    });

    // get stored campaigns from DB
    this.campaignService.getCampaigns().subscribe(data => {
      this.campaigns = data.map(campaign => {
        return {
          id: campaign.payload.doc.id,
          ...(campaign.payload.doc.data() as ICampaign)
        } as ICampaign;
      });
    });
  }
}
