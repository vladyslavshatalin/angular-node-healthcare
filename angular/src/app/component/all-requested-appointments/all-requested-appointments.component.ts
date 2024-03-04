import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-all-requested-appointments',
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css'],
  providers: [DatePipe]
})
export class AllRequestedAppointmentsComponent implements OnInit {

	allAppointments;

  constructor(private dataService: DataService, private route: Router) { 
  }

  ngOnInit() {
    // call appointments method by default
    this.appointments();
  }

  appointments() {
    // get all requested appointments from service
    this.dataService.requestedAppointments().subscribe(
      (response) => {
        // Successful login
        this.allAppointments = response;
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );

    console.log(this.allAppointments)

  }

  view(patientId) {

    // should navigate to 'patientList' page with selected patientId
    this.route.navigate(['/patientList', patientId])

  }

  cancelAppointment(id) {

    // delete selected appointment uing service

    // After deleting the appointment, get all requested appointments
    this.dataService.deleteAppointment(id).subscribe(
      (response) => {
        // Successful login
        this.appointments()
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );

  }

}
