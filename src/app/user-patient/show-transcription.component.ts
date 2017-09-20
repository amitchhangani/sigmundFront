import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
@Component({
  selector: 'app-show-transcription',
  template: `
  <div class="main-content">
  <div class="container-fluid" *ngIf="patient_transcription">
      <div class="row">
          <div class="col-lg-6 col-md-12">
              <div class="card card-nav-tabs">
                  <div class="card-header" data-background-color="purple">
                      <div class="nav-tabs-navigation">
                          <div class="nav-tabs-wrapper">
                              <span class="nav-tabs-title"><h4>Transcript</h4></span>
                              <ul class="nav nav-tabs" data-tabs="tabs">
                                  <li>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  <div class="card-content">
                      <div class="tab-content">
                          <div class="tab-pane active" id="profile">
                              <table class="table">
                                  <tbody>
                                      <tr *ngFor="let p_t of patient_transcription" >
                                      <div class="chat-timeline chat-timeline-right" *ngIf="p_t.transcript.speaker===0">
                                      <div class="chat-timeline-avtar">
                                        <figure>T</figure>
                                        <span> Therapist </span></div>
                                      <div class="chat-timeline-content"> {{p_t.transcript.transcript}}</div>
                                    </div>
                                  <div class="chat-timeline chat-timeline-left" *ngIf="p_t.transcript.speaker > 0 ">
                                    <div class="chat-timeline-avtar">
                                      <figure> P </figure>
                                      <span>Patient</span></div>
                                    <div class="chat-timeline-content">{{p_t.transcript.transcript}}</div>
                                  </div>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
         <!-- <md-tab-group>
          <md-tab label="Keywords">
              <div class="clearfix keyword-wrap">
                  <div class="col-sm-5">
                      <table class="table">
                          <thead class="text-primary">
                              <th>Intents</th>
                              <th># of appearances</th>
                          </thead>
                          <tbody>
                              <tr *ngFor="let a of tags">
                                  <td>{{a.text}}</td>
                                  <td>{{a.weight}}</td>
                              </tr>
                              
                          </tbody>
                      </table>
                  </div>
                  <div class="col-sm-7 tag_cloud"><angular-tag-cloud
[data]="data"
[width]="cloudoptions.width"
[height]="cloudoptions.height"
[overflow]="cloudoptions.overflow">
</angular-tag-cloud></div>
              </div>
          </md-tab>
          <md-tab label="Personality">
              <div class="clearfix mt-15 personality-wrap">
                  <div class="col-sm-2">
                      <img src="../assets/img/openness.png" class="img-responsive" alt="">
                  </div>
                  <div class="col-sm-2">
                      <img src="../assets/img/Conscientiousness.png" class="img-responsive" alt="">
                  </div>
                  <div class="col-sm-2">
                      <img src="../assets/img/Extraversion.png" class="img-responsive" alt="">
                  </div>
                  <div class="col-sm-2">
                      <img src="../assets/img/Agreeableness.png" class="img-responsive" alt="">
                  </div>
                  <div class="col-sm-2">
                      <img src="../assets/img/Emotional_Range.png" class="img-responsive" alt="">
                  </div>
                  <div class="col-sm-2">
                      <img src="../assets/img/Harmony.png" class="img-responsive" alt="">
                  </div>
              </div>
              <div class="clearfix">
                  <div class="col-sm-6">
                      <div class="panel panel-default">
                          <div class="panel-heading clearfix">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <h3 class="panel-title">Session 1</h3>
                                  </div>
                                  <div class="col-sm-6 text-right">
                                      <div class="calendar"><i class="zmdi zmdi-calendar-alt"></i> 27-7-2017</div>
                                      <div class="time"><i class="zmdi zmdi-time"></i> 09:22AM</div>
                                  </div>
                              </div>
                          </div>
                          <div class="panel-body">
                              <img src="../assets/img/personality_graph1.jpg" class="img-responsive">
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="panel panel-default">
                          <div class="panel-heading">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <h3 class="panel-title">Session 2</h3>
                                  </div>
                                  <div class="col-sm-6 text-right">
                                      <div class="calendar"><i class="zmdi zmdi-calendar-alt"></i> 27-7-2017</div>
                                      <div class="time"><i class="zmdi zmdi-time"></i> 09:22AM</div>
                                  </div>
                              </div>
                          </div>
                          <div class="panel-body">
                              <img src="../assets/img/personality_graph2.jpg" class="img-responsive">
                          </div>
                      </div>
                  </div>
                  <div class="col-sm-12 text-center"><button class="btn btn-danger"> View more sessions  <i class="zmdi zmdi-chevron-down"></i></button></div>
              </div>
          </md-tab>
      </md-tab-group> -->
      </div>
  </div>
</div>

  `,
  styles: []
})
export class ShowTranscriptionComponent implements OnInit {
  patient_transcription ;
  tags: any = [];
  data: Array<CloudData>;
  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9',
  });
  options = new RequestOptions({ headers: this.headers });
  tokenn = 'Bearer' + ' ' + localStorage.getItem('_token');
  constructor(private http: Http, private router: Router) {
  }

  ngOnInit() {
    const id = localStorage.getItem('patient_id_transcription');
    console.log('ididididi=>', id );
    this.getService(environment.baseUrl + 'patient/patient_transcription' + '/' + id , this.options)
    .then(result => {
      this.patient_transcription = result.data;
    })
    .catch(error => this.patient_transcription = '');
    
    // this is for specific tech cloud for one patient

    // this.getService(environment.baseUrl + 'recommendations/getPatientRec/' + id, this.options).then(result => {
    //     for(let key in result.tags){
    //         this.tags.push({text:key,weight:result.tags[key]});
    //     }
    //     this.data = this.tags;
    //     debugger;
    //   }).catch(error => console.log(error));

    //   cloudoptions: CloudOptions = {
    //     // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
    //     width : 500,
    //     height : 400,
    //     overflow: false,
    //   }
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
