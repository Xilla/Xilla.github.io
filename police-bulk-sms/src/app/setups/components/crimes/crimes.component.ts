import { Component, OnInit } from '@angular/core';
import { ICrime } from '../../models/crime.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrimesService } from '../../services/crimes.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-crimes',
  templateUrl: './crimes.component.html',
  styleUrls: ['./crimes.component.css']
})
export class CrimesComponent implements OnInit {
  isAddCrimeModalVisible = false;
  isAddingCrime = false;

  // crimes array to display in table
  crimes: ICrime[] = [];

  addCrimeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crimeService: CrimesService,
    private message: NzMessageService
  ) {
    this.addCrimeForm = this.formBuilder.group({
      code: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crimeService.getCrimes().subscribe(data => {
      this.crimes = data.map(crime => {
        return {
          id: crime.payload.doc.id,
          ...(crime.payload.doc.data() as ICrime)
        } as ICrime;
      });
    });
  }

  //  form input submission
  onSubmit() {
    this.isAddingCrime = true;
    let crime: ICrime = this.addCrimeForm.value;

    this.addCrime(crime);
    this.addCrimeForm.reset;
  }

  // adds crime to DB
  addCrime(crime: ICrime) {
    this.crimeService.createCrime(crime).then(
      res => {
        this.message.success('Crime added successfully');
        this.isAddingCrime = false;
        this.isAddCrimeModalVisible = false;
      },
      err => {
        this.message.error('Failed to add crime');
        this.isAddingCrime = false;
        this.isAddCrimeModalVisible = false;
      }
    );
  }

  // open add new crime modal
  showAddNewCrimeModal(): void {
    this.isAddCrimeModalVisible = true;
  }

  // close add new crime modal
  closeAddNewCrimeModal(): void {
    this.isAddCrimeModalVisible = false;
  }
}
