import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';

@Injectable()
export class DataService {

  userId: string;

  constructor(private api: ApiService) {

  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'uid' from response as key name 'uid' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 

    return this.api.checkLogin(username, password).pipe(
      map((response: any) => {
        // Assuming your API response contains 'uid' and 'token'
        const uid = response.uid;
        const token = response.token;

        // Store 'uid' and 'token' in local storage
        localStorage.setItem('uid', uid);
        localStorage.setItem('token', token);

        // Return true if user authenticated
        return true;
      }),
      catchError((error) => {
        // Handle authentication error (e.g., invalid credentials)
        console.error('Authentication failed:', error);
        return of(false); // Return false if user not authenticated
      })
    );
  }

  getAuthStatus(): Observable<boolean> {

    // return true/false as a auth status
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    return of(isAuthenticated);
  }

  regNewUser(regNewUser): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 
    return this.api.regNewUser(regNewUser).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('signup failed:', error);
        return error;
      })
    );
  }

  doLogOut() {

    // You should remove the key 'uid', 'token' if exists

  }

  getUserDetails(): Observable<any> {

    // should return user details retrieved from api service

    return;
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  registerPatient(patientDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  getAllPatientsList(): Observable<any> {

    // should return all patients list retrieved from ApiService

    // handle error 

    return;
  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return;
  }

  diseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  scheduleAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  getSinglePatientAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return;
  }


}

