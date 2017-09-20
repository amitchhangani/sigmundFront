import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { SocketService } from '../shared/socket/socket.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SettingsComponent implements OnInit {
  recommendations: any[] = [];
  danger: any [] = [];
  users: any [] = [];
  isAddEnable: boolean;
  isSaveEnable: boolean;
  isDangerSaveEnable: boolean;
  isDangerAddEnable: boolean;
  headers: Headers;
  options: RequestOptions;
  baseUrl: string;

  constructor(private http: Http, private socketService: SocketService, private router: Router) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  ngOnInit() {
    this.isAddEnable = true;
    this.isSaveEnable = false;
    this.isDangerAddEnable = true;
    this.isDangerSaveEnable = false;
    this.getService(environment.baseUrl + 'recommendations/1').then(result => {
      console.log(result);
      this.recommendations = result.data;
    }).catch(error => console.log(error));
    this.getService(environment.baseUrl + 'recommendations/2').then(result => {
      console.log(result);
      this.danger = result.data;
    }).catch(error => console.log(error));
    this.getService(environment.baseUrl + 'user/fetchAll').then(result => {
      this.users = result.data;
    }).catch(error => console.log(error));
  }

  getService(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  postService(url: string, payload: string): Promise<any> {
    return this.http
      .post(url, payload, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  showRec = (user_id: any) => {
    localStorage.setItem('from_user', 'true');
    localStorage.setItem('userid_for_patientlist', user_id);
    this.router.navigate(['/user_patient']);
  }

  saveRecommendations(template, index) {
    this.isAddEnable = true;
    this.isSaveEnable = false;
    this.postService(environment.baseUrl + 'recommendations/', template).then(result => result)
      .catch(error => console.log(error));

  }

  saveDanger(template, index) {
    this.isDangerAddEnable = true;
    this.isDangerSaveEnable = false;
    this.postService(environment.baseUrl + 'recommendations/', template).then(result => result)
      .catch(error => console.log(error));
  }

  addRecommendations() {
    this.isAddEnable = false;
    this.isSaveEnable = true;
    const data = {
      name: '',
      tags: [],
      factor: [],
      type: 1
    };
    this.recommendations.push(data);
  }

  addDanger() {
    this.isDangerAddEnable = false;
    this.isDangerSaveEnable = true;
    const data = {
      name: '',
      tags: [],
      factor: [],
      type: 2
    };
    this.danger.push(data);
  }
}
