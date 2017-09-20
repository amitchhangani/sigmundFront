import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  p: any;
  closeResult: string;
  patient= [];
  pat_id;
  patient_error;
  patient_transcription ;
  user_patient;
  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9',
  });
  options = new RequestOptions({ headers: this.headers });
  tokenn = 'Bearer' + ' ' + localStorage.getItem('_token');
  constructor(private http: Http, private router: Router) {
  }
  ngOnInit() {
    if (localStorage.getItem('patient_id')) {
      this.pat_id = localStorage.getItem('patient_id');
    }else {
      this.patient_error = 'You have not selected any patient. Please select patient';
    }
    this.onini();
  }

  onini() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.getService(environment.baseUrl + 'patient/fetch_all', this.options)
    .then(result => {
      this.patient = result.data;
    })
    .catch(error => console.log(error));
    this.getService(environment.baseUrl + 'patient/patient_all_patient', this.options)
    .then(result => {
      this.user_patient = result.data;
    })
    .catch(error => console.log(error));
  }

  // show(id: any ) {
  //   this.getService(environment.baseUrl + 'patient/patient_all_transcription' + '/' + id , this.options)
  //   .then(result => {
  //     this.patient_transcription = result.data;
  //   })
  //   .catch(error => this.patient_transcription = '');
  // }

  show(id: any) {
    localStorage.setItem('pId_4_trans', id);
    localStorage.setItem('from_user', 'false');
    // this.router.navigate(['patient_transcription']); //for all transcription
    this.router.navigate(['/user_patient']);
  }

  call(patient: any) {
    localStorage.setItem('patient_id', patient._id);
    localStorage.setItem('patient_name_for_chat', patient.name);
    localStorage.setItem('patient_email_for_chat', patient.email);
    this.router.navigate(['/call-anylsis']);
  }
  // delete(id: any) {
  //   this.headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'Accept': 'q=0.8;application/json;q=0.9',
  //     'Authorization': 'Bearer ' + localStorage.getItem('_token')
  //   });
  //   this.options = new RequestOptions({ headers: this.headers });
  //   this.deleteService(environment.baseUrl + 'patient/delete' + '/' + id, this.options)
  //   .then(result => {
  //     this.onini();
  //   })
  //   .catch(error => console.log(error));
  // }

  // edit(id: any) {
  //   localStorage.setItem('patient_id_for_updation', id);
  //   this.router.navigate(['/patient_update']);
  // }

  // select(id: any) {
  //   // to get id of selected patient
  //   localStorage.setItem('patient_id', id);
  //   this.pat_id = localStorage.getItem('patient_id');
  // }

  getService(url: string, payload): Promise<any> {
    return this.http
      .get(url, payload)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // deleteService(url: string, payload): Promise<any> {
  //   return this.http
  //     .delete(url, payload)
  //     .toPromise()
  //     .then(this.extractData)
  //     .catch(this.handleError);
  // }

  postService(url: string, payload: any): Promise<any> {
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

}
