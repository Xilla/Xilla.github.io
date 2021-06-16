import { Component, OnInit } from '@angular/core';
import { IContact } from '../../models/contact.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  isAddContactModalVisible = false;
  isAddingContact = false;

  // contacts array to display in table
  contacts: IContact[] = [];

  addContactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactsService,
    private message: NzMessageService
  ) {
    this.addContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      province: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data.map(contact => {
        return {
          id: contact.payload.doc.id,
          ...(contact.payload.doc.data() as IContact)
        } as IContact;
      });
    });
  }

  // form input submission
  onSubmit() {
    this.isAddingContact = true;
    let contact: IContact = this.addContactForm.value;

    this.addContact(contact);
  }

  // adds contact to DB
  addContact(contact: IContact) {
    this.contactService.createContact(contact).then(
      res => {
        this.message.success('Contact added successfully!');
        this.isAddingContact = false;
        this.isAddContactModalVisible = false;
        this.addContactForm.reset;
      },
      err => {
        this.message.error('Failed to add contact');
        this.isAddingContact = false;
        this.isAddContactModalVisible = false;
        this.addContactForm.reset;
      }
    );
  }

  //open add new contact modal
  showAddNewContactModal(): void {
    this.isAddContactModalVisible = true;
  }

  //close add new contact modal
  closeAddNewContactModal(): void {
    this.isAddContactModalVisible = false;
  }

  // No time to make setups for provinces this will do for now
  provinces = [
    'Lusaka',
    'Eastern',
    'Southern',
    'Northern',
    'Western',
    'Luapula',
    'Muchinga',
    'North Western',
    'Central',
    'Copperbelt'
  ];
}
