import { IContact } from 'src/app/contacts/models/contact.model';

export interface ICampaign {
  id?: string;
  code?: string;
  crimeType: string;
  contacts: IContact[];
  message: string;
}
