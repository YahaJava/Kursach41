import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllPersons() {
    return this.http.get(this.URL + '/getAllPersons');
  }

  getPersonsNames() {
    return this.http.get(this.URL + '/getPersonsNames');
  }

  getPerson(id) {
    return this.http.get(this.URL + '/getPerson?id=' + id);
  }

  updateProjectTeam(body) {
    return this.http.post(this.URL + '/updateProject', body);
  }
}
