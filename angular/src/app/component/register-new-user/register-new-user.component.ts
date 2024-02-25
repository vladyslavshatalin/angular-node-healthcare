import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import * as alertify from 'alertify.js';
import { Users } from '../../models/users';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

  regNewUser = new Users;
  signupForm: FormGroup;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private route: Router, private dataService: DataService) {
  }

  ngOnInit() {

    // add necessary validators

    this.signupForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%@#*?&£€])[A-Za-z\d!$%@#*?&£€]*$/)
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      location: new FormControl('', [
        Validators.required])
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return;
    }
    this.signUp()
  }

  signUp() {

    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
    // reset the form
    const newReqBody = {
      email: this.signupForm.value.email,
      location: this.signupForm.value.location,
      mobile: this.signupForm.value.email,
      pwd: this.signupForm.value.password,
      uname: this.signupForm.value.userName
    }
    this.dataService.regNewUser(newReqBody).subscribe(
      (response) => {
        // Successful login
        if (!response) {
          return;
        }
        this.route.navigate(['/login']);
      },
      (error) => {
        // Handle login error (display error message, etc.)
        this.signupForm.reset();
      }
    );

  }

  goBack() {

    // should navigate to login page
    this.route.navigate(['/login']);
  }

}
