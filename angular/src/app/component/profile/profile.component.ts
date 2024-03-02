import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userDetails;
  updateMyDetails: any = {};
  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';
  constructor(private dataService: DataService) {

  }

  ngOnInit() {


    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({ value: '', disabled: true }),
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

    // get profile details and display it
    this.getProfileDetails()

  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response;
        this.editProfileForm.setValue({
          userName: response.userName,
          mobile: response.mobile,
          email: response.email,
          location: response.location
        })
      },
      (error) => {
      }
    );

  }

  changeMyProfile() {
    if (this.editProfileForm.invalid) {
      return;
    }

    // if successfully changed the profile it should display new details hiding the form
    const updatePayload = {
      mobile: this.editProfileForm.get('mobile').value,
      email: this.editProfileForm.get('email').value,
      location: this.editProfileForm.get('location').value,
      uid: localStorage.getItem('uid')
    }

    this.dataService.updateProfile(updatePayload).subscribe(
      (response) => {
        if(!response){
          return;
        }
        this.userDetails = response;
        this.getProfileDetails();
        this.discardEdit();
      },
      (error) => {
      }
    );

  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;

  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;
    this.editProfileForm.setValue({
      userName: this.userDetails.userName,
      mobile: this.userDetails.mobile,
      email: this.userDetails.email,
      location: this.userDetails.location
    })

  }

}
