
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "authorization";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is not a login or signup request
    if (!req.url.includes('/login') && !req.url.includes('/register')) {
      return next.handle(this.addAuthenticationToken(req));
    }

    // For login and signup requests, proceed without modifying headers
    return next.handle(req);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    // should add authorization token into headers except login and signup
    // Add your authentication token logic here (e.g., retrieve token from local storage)
    const token = 'your-auth-token'; // Replace with your actual token

    // Clone the request and add the token to the headers
    const modifiedReq = request.clone({
      setHeaders: {
        [this.AUTH_HEADER]: `Bearer ${token}` // Assuming Bearer token format
      }
    });

    return modifiedReq;

  }

}

