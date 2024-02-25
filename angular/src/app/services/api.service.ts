import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

@Injectable()
export class ApiService {

  API_URL: String;


  constructor(private http: HttpClient) {
    this.API_URL = 'api';

  }

  public checkLogin(uname: string, pwd: string): Observable<any> {
    // should return response from server

    // handle error 
    const body = {
      uname: uname,
      pwd: pwd
    }; // Create request body


    // Make an HTTP POST request to your login endpoint
    return this.http.post(`${this.API_URL}/login`, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(() => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          error: {
            message: 'Invalid username or password'
          },
          status: 401,
          statusText: 'Invalid username or password'
        });
      })
    );

  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error 
    return this.http.post(`${this.API_URL}/register`, regNewUser).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        // Unauthorized (invalid credentials)
        return Observable.throw({
          status: error.status,
          statusText: 'Invalid username or password',
          error: {
            message: 'Invalid username or password'
          }
        });
      })
    );

  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error 

    return;
  }

  public updateDetails(userDetails: any): Observable<any> {
    // should return response from server

    // handle error 

    return;
  }

  public registerPatient(patientDetails: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error 

    return;
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error 

    return;
  }

  public getParticularPatient(patientId): Observable<any> {

    // should return particular patient details from server

    // handle error 

    return;
  }

  public diseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 

    return;
  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 

    return;
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 

    return;
  }

  public getSinglePatientAppointments(patientId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error 

    return;
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error

    return;
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
