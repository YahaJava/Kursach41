import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addTask(response) {
    return this.http.post(this.URL + '/addTask', response);
  }

  changeStatus(response) {
    return this.http.post(this.URL + '/changeStatus', response);
  }

  editTask(response) {
    return this.http.post(this.URL + '/editTask', response);
  }

  deleteTask(id) {
    return this.http.post(this.URL + '/deleteTask', id);
  }
}
