import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/contacts/models/contact.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/contacts/services/contacts.service';
import { IMessage } from 'src/app/setups/models/message.model';
import { MessagesService } from 'src/app/setups/services/messages.service';
import { ICrime } from 'src/app/setups/models/crime.model';
import { CrimesService } from 'src/app/setups/services/crimes.service';
import { SmsService } from '../../services/sms.service';
import { ICampaign } from '../../models/campaign.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  isAddingCampaign = false;

  smsForm: FormGroup;

  recipeintTypeValue = 'all';
  messageTypeValue = 'repeat';

  listOfContacts: IContact[] = [];
  contactRecipients: IContact[] = [];
  listOfSelectedValue: IContact[] = [];
  listOfContactOptions: IContact[] = [];
  finalContactList: IContact[] = [];

  // message array for selection
  messages: IMessage[] = [];

  // selected message
  selectedMessage: IMessage = {
    code: '',
    message: ''
  };

  // repeat message details
  repeatMessageDetails = '';

  //  crime array for selection
  crimes: ICrime[] = [];

  // selected crime
  selectedCrime: ICrime = {
    code: '',
    type: '',
    description: ''
  };

  composedMessage = '';
  finalMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private messageService: MessagesService,
    private crimeService: CrimesService,
    private campaignService: SmsService,
    private message: NzMessageService
  ) {
    this.smsForm = this.formBuilder.group({
      sms: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // get stored contacts from DB
    this.contactService.getContacts().subscribe(data => {
      this.listOfContacts = data.map(contact => {
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

    // get stored messages from DB
    this.crimeService.getCrimes().subscribe(data => {
      this.crimes = data.map(crime => {
        return {
          id: crime.payload.doc.id,
          ...(crime.payload.doc.data() as ICrime)
        } as ICrime;
      });
    });
  }

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  // changes repeat message based on what is selected
  changeRepeatMessage() {
    this.repeatMessageDetails = this.selectedMessage.message;
  }

  // changes list of contact recipients based on selected type of recipient
  changeContactRecipients() {
    if (this.recipeintTypeValue == 'all') {
      this.contactRecipients = [];
      this.contactRecipients = this.listOfContactOptions;
    }
  }

  // adds selected contacts to array
  addSelectedContacts() {
    console.log('selected contacts:');
    console.log(this.listOfSelectedValue);
    const children: IContact[] = [];
    for (let i = 10; i < 36; i++) {
      children.push({
        firstName: i.toString(36) + i,
        lastName: i.toString(36) + i,
        email: i.toString(36) + i,
        phone: i.toString(36) + i,
        province: i.toString(36) + i
      });
    }
    this.listOfContactOptions = children;
  }

  sendSMS() {
    this.isAddingCampaign = true;

    console.log('Send SMS button clicked!');
    console.log('type of crime: ' + this.selectedCrime.type);

    if (this.recipeintTypeValue == 'select') {
      console.log('selected contacts:');
      console.log(this.listOfSelectedValue);
      this.finalContactList = this.listOfSelectedValue;
    } else {
      console.log('contacts:');
      console.log(this.listOfContacts);
      this.finalContactList = this.listOfContacts;
    }

    if (this.messageTypeValue == 'repeat') {
      console.log('Message:');
      console.log(this.repeatMessageDetails);
      this.finalMessage = this.repeatMessageDetails;
    } else {
      console.log('Message:');
      console.log(this.composedMessage);
      this.finalMessage = this.composedMessage;
    }

    // store campaign in DB
    let campaign: ICampaign = {
      crimeType: this.selectedCrime.type,
      contacts: this.finalContactList,
      message: this.finalMessage
    };

    this.addCampaign(campaign);
  }

  addCampaign(campaign: ICampaign) {
    this.campaignService.createCampaign(campaign).then(
      res => {
        this.message.success('Campaign added successfully');
        this.isAddingCampaign = false;
      },
      err => {
        this.message.error('failed to add campaign');
        this.isAddingCampaign = false;
      }
    );
  }
}
