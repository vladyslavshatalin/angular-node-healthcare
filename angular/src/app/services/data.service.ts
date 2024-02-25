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
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  }

  getUserDetails(): Observable<any> {

    // should return user details retrieved from api service
    return this.api.getUserDetails(localStorage.getItem('uid')).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('get user details failed:', error);
        return error;
      })
    );
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.updateDetails(userDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('update userdetails failed:', error);
        return error;
      })
    );
  }

  registerPatient(patientDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('resigster patient failed:', error);
        return error;
      })
    );
  }

  getAllPatientsList(): Observable<any> {

    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('get all patient list failed:', error);
        return error;
      })
    );
  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('particular patient details failed:', error);
        return error;
      })
    );
  }

  diseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.diseasesList().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('disease list failed:', error);
        return error;
      })
    );
  }

  scheduleAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.scheduleAppointment(appointmentDetails).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('schedule appointment failed:', error);
        return error;
      })
    );
  }

  getSinglePatientAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getSinglePatientAppointments(patientId).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('single patient appointments failed:', error);
        return error;
      })
    );
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('appointment deletion failed:', error);
        return error;
      })
    );
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments().pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('requested appointments failed:', error);
        return error;
      })
    );
  }


}

