import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  p: any;
  closeResult: string;
  user= [];
  pat_id;
  patient_error;
  hideDelete = [];
  therapist_in: any;
  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9',
  });
  options = new RequestOptions({ headers: this.headers });
  tokenn = 'Bearer' + ' ' + localStorage.getItem('_token');
  constructor(private http: Http, private router: Router) {
  }
  ngOnInit() {
    this.therapist_in = localStorage.getItem('therapist_in');
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
    this.getService(environment.baseUrl + 'user/fetchAll', this.options)
    .then(result => {
      this.user = result.data;
      this.user.map(i => {
        console.log(i._id)
        if (this.therapist_in === i._id) {
          this.hideDelete.push(false);
        }else {
          this.hideDelete.push(true);
        }
      }
      );
    })
    .catch(error => console.log(error));
  }

  delete(id: any) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.deleteService(environment.baseUrl + 'user/delete' + '/' + id, this.options)
    .then(result => {
      this.onini();
    })
    .catch(error => console.log(error));
  }

  showRec(user_id: any) {
    localStorage.setItem('from_user', 'true');
    localStorage.setItem('userid_for_patientlist', user_id);
    this.router.navigate(['/user_patient']);
  }
  edit(id: any) {
    localStorage.setItem('user_id_for_updation', id);
    this.router.navigate(['/therapist_update']);
  }

  getService(url: string, payload): Promise<any> {
    return this.http
      .get(url, payload)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteService(url: string, payload): Promise<any> {
    return this.http
      .delete(url, payload)
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
