import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  private readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.currentUser;
  }

  checkCredentials(credentials) {
    const observable = this.http.post(this.URL + '/checkUser', credentials);
    observable.subscribe(response => {
      if (response) {
        this.currentUser = response;
      }
    });
    return observable;
  }

}
