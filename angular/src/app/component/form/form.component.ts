import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;
  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor(fb: FormBuilder, private datePipe: DatePipe, private route: Router, private dataService: DataService) {

    // add necessary validators

    this.complexForm = fb.group({
      'firstName': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      'lastName': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      'gender': [null,
        Validators.required,
      ],
      'dob': [null, Validators.required],
      'mobile': ['', [
        Validators.required,
        Validators.pattern(/^(?!123456$)(?!1234567a9$)[0-9]{10,}$/),
        Validators.maxLength(10)
      ]],
      'email': ['', Validators.email],
      'description': ''
    })
  }

  submitForm(value: any) {

    // should reister new patient using service
    // fields that need to be added: userId, fname, lname, gender, dob, mobile, email, desc
    // if added successfully should redirect to 'patientList' page
    const payload ={
      userId: localStorage.getItem('uid'),
      fname: this.complexForm.controls['firstName'].value,
      lname: this.complexForm.controls['lastName'].value,
      gender: this.complexForm.controls['gender'].value,
      dob: this.complexForm.controls['dob'].value,
      mobile: this.complexForm.controls['mobile'].value,
      email: this.complexForm.controls['email'].value,
      desc: this.complexForm.controls['description'].value,
    }
    this.dataService.registerPatient(payload).subscribe(
			(response) => {
				// Successful login
				if (!response) {
					return;
				}
				this.route.navigate(['/patientList']);
			},
			(error) => {
				// Handle login error (display error message, etc.)
			}
		);

  }

}
