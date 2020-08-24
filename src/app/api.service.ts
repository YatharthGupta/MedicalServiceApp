import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public API_BASE_ADDRESS = 'https://api.inquickerstaging.com/v3/winter.inquickerstaging.com';
  public SERVICES_URL = this.API_BASE_ADDRESS + "/services";
  public PROVIDERS_URL = this.API_BASE_ADDRESS + "/providers?include=locations&data.type='providers'";


  // public API_BASE_ADDRESS = 'http://localhost:3000';
  // public SERVICES_URL = this.API_BASE_ADDRESS + "/products";

  constructor(private httpClient: HttpClient) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  public getServices() {
    return this.httpClient.get(this.SERVICES_URL, { params: new HttpParams({ fromString: "_page=1&_limit=20" }), observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
    }));

  }

  public getProviders() {
    return this.httpClient.get(this.PROVIDERS_URL, { params: new HttpParams({ fromString: "_page=1&_limit=20" }), observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
    }));
  }


}
