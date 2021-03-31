import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  private readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  addEstimation(estimation){
    return this.http.post(this.URL + '/addEstimation', estimation);
  }
}
