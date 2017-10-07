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
  showFromUser: boolean;
  p: any;
  closeResult: string;
  patient= [];
  patient_error;
  therapist_name;
  patient_name;
  patient_transcription ;
  selectedValue;
  selectedValue2;
  patient_for_dropdown;
  therapist_for_dropdown;
  user_patient; // get all transcription of user/therapist
  patient_user; // get all transcription of patient
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
    this.patient_user = localStorage.getItem('pId_4_trans');
    this.onini();
  }

  onini() {
    const from_user = localStorage.getItem('from_user');
    this.selectedValue = localStorage.getItem('pname_4_user_patient');
    this.selectedValue2 = localStorage.getItem('uname_4_user_patient');
    console.log('from_user', from_user);
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    if (from_user === 'true') {
      this.showFromUser = true;
      this.therapist_name = localStorage.getItem('uname_4_user_patient');
      this.getService(environment.baseUrl + 'patient/user_patient' + '/' + this.user_patient, this.options)
      .then(result => {
        this.patient = result.data;
      })
      .catch(error => this.patient_error = 'Patient Recording are not available');

      this.getService(environment.baseUrl + 'patient/patient_all_patient', this.options)
      .then(result => {
        this.therapist_for_dropdown = result.data;
      })
      .catch(error => console.log(error));

    } else {
      this.patient_name = localStorage.getItem('pname_4_user_patient');
       this.showFromUser = false;
      this.getService(environment.baseUrl + 'patient/patient_user' + '/' + this.patient_user, this.options)
      .then(result => {
        this.patient = result.data;
      })
      .catch(error => this.patient_error = 'Patient Recording are not available');
      this.options = new RequestOptions({ headers: this.headers });
      this.getService(environment.baseUrl + 'patient/fetch_all', this.options)
      .then(result => {
        this.patient_for_dropdown = result.data;
      });
    }
  }

  showOption(id) {
    this.patient_name = id.name;
    localStorage.setItem('pname_4_user_patient', this.patient_name);
    localStorage.setItem('pId_4_trans', id._id);
    this.user_patient = localStorage.getItem('userid_for_patientlist');
       this.showFromUser = false;
      this.getService(environment.baseUrl + 'patient/patient_user' + '/' + id._id, this.options)
      .then(result => {
        this.patient_error = '';
        this.patient = result.data;
      })
      .catch(error => {
        this.patient_error = 'Patient Recording are not available';
        this.patient = null;
      } );
  }
  showOption2(id) {
    this.therapist_name = id.name;
    localStorage.setItem('uname_4_user_patient', this.therapist_name);
    localStorage.setItem('userid_for_patientlist', id._id);
    this.patient_user = localStorage.getItem('pId_4_trans');
    this.showFromUser = true;
    this.getService(environment.baseUrl + 'patient/user_patient' + '/' + id._id, this.options)
    .then(result => {
      this.patient_error = '';
      this.patient = result.data;
    })
    .catch(error => {
      this.patient_error = 'Patient Recording are not available';
      this.patient = null;
    });

  }
  show(id: any ) {
    // transcription id
    localStorage.setItem('patient_id_transcription', id);
    this.router.navigate(['/patient_id_transcription']);
    // this.getService(environment.baseUrl + 'patient/patient_transcription' + '/' + id._id , this.options)
    // .then(result => {
    //   this.patient_transcription = result.data;
    // })
    // .catch(error => this.patient_transcription = '');
  }

  call(patient: any) {
    localStorage.setItem('patient_id', patient.patient_id);
    localStorage.setItem('patient_name_for_chat', patient.patient_name);
    localStorage.setItem('patient_email_for_chat', patient.patient_email);
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

