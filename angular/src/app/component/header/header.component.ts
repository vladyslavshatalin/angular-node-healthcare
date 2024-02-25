import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails: any = {};

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    // call getProfileDetails method to get user details
    this.getProfileDetails()

  }

  getProfileDetails() {

    // call getUserDetails method of dataService and assign response to userDetails property
    this.dataService.getUserDetails().subscribe(
      (response) => {
        // Successful login
        this.userDetails = response;
      },
      (error) => {
        // Handle login error (display error message, etc.)
      }
    );

  }

  logout() {

    // call doLogOut method
    this.dataService.doLogOut()

  }
}
