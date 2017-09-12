import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-patient',
  templateUrl: './user-patient.component.html',
  styleUrls: ['./user-patient.component.css']
})
export class UserPatientComponent implements OnInit {

  p: any;
  closeResult: string;
  patient= [];
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
    this.user_patient = localStorage.getItem('userid_for_patientlist');
    this.onini();
  }

  onini() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.getService(environment.baseUrl + 'patient/user_patient' + '/' + this.user_patient, this.options)
    .then(result => {
      this.patient = result.data;
    })
    .catch(error => this.patient_error = 'Patient Recording are not available');
  }

  show(id: any ) {
    this.getService(environment.baseUrl + 'patient/patient_transcription' + '/' + id , this.options)
    .then(result => {
      this.patient_transcription = result.data;
    })
    .catch(error => this.patient_transcription = '');
  }

  call(patient: any) {
    localStorage.setItem('patient_id', patient._id);
    localStorage.setItem('patient_name_for_chat', patient.name);
    localStorage.setItem('patient_email_for_chat', patient.email);
    this.router.navigate(['/call-anylsis']);
  }


  getService(url: string, payload): Promise<any> {
    return this.http
      .get(url, payload)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


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

