import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IMessage } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  isAddMessageModalVisible = false;
  isAddingMessage = false;

  //  messages array to display
  messages: IMessage[] = [];

  addMessageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessagesService,
    private message: NzMessageService
  ) {
    this.addMessageForm = this.formBuilder.group({
      code: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(message => {
        return {
          id: message.payload.doc.id,
          ...(message.payload.doc.data() as IMessage)
        } as IMessage;
      });
    });
  }

  //  form input submission
  onSubmit() {
    this.isAddingMessage = true;
    let message: IMessage = this.addMessageForm.value;

    this.addMessage(message);
    this.addMessageForm.reset;
  }

  // adds message to DB
  addMessage(message: IMessage) {
    this.messageService.createMessage(message).then(
      res => {
        this.message.success('Message added successfully');
        this.isAddingMessage = false;
        this.isAddMessageModalVisible = false;
      },
      err => {
        this.message.error('Failed to add Message');
        this.isAddingMessage = false;
        this.isAddMessageModalVisible = false;
      }
    );
  }

  // open add new message modal
  showAddNewMessageModal(): void {
    this.isAddMessageModalVisible = true;
  }

  // close add new contact modal
  closeAddNewMessageModal(): void {
    this.isAddMessageModalVisible = false;
  }
}
