import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-patient-transcription',
  template: `
<div class="main-content">
    <div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card card-nav-tabs">
                <div class="card-header" data-background-color="purple">
                    <div class="nav-tabs-navigation">
                        <div class="nav-tabs-wrapper">
                            <span class="nav-tabs-title"><h4>Transcript</h4></span>
                            <ul class="nav nav-tabs" data-tabs="tabs">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-content" style="height:400px; overflow:auto">
                    <div class="tab-content">
                        <div class="tab-pane active" id="profile">
                            <table class="table">
                                <tbody>
                                    <tr *ngFor="let p_t of patient_transcription" >
                                        <td>{{p_t.transcript.transcript}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class PatientTranscriptionComponent implements OnInit {
  pid_for_trans;
  patient_transcription ;
  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9',
  });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {
    this.pid_for_trans = localStorage.getItem('pId_4_trans');
    this.getService(environment.baseUrl + 'patient/patient_all_transcription' + '/' + this.pid_for_trans , this.options)
    .then(result => {
      this.patient_transcription = result.data;
    })
    .catch(error => this.patient_transcription = '');
  }

  ngOnInit() {
  }

  getService(url: string, payload): Promise<any> {
    return this.http
      .get(url, payload)
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
