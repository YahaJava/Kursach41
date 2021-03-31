import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllProjects() {
    return this.http.get(this.URL + '/getAllProjects');
  }

  getProject(id) {
    return this.http.get(this.URL + '/getProject?id=' + id);
  }

  changeProjectStatus(id) {
    return this.http.get(this.URL + '/changeProjectStatus?id=' + id);
  }
}
