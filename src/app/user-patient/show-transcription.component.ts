import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
// import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
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
                                      <figure *ngIf="!therapist_img" >P</figure>  
                                      <figure *ngIf="therapist_img"><img style="border-radius : 50%" src="{{image_server_url}}uploads/therapist/{{therapist_img}}"></figure>
                                        <span> Therapist </span></div>
                                      <div class="chat-timeline-content"> {{p_t.transcript.transcript}}</div>
                                    </div>
                                  <div class="chat-timeline chat-timeline-left" *ngIf="p_t.transcript.speaker > 0 ">
                                    <div class="chat-timeline-avtar">
                                    <figure *ngIf="!patient_img" >P</figure>
                                      <figure *ngIf="patient_img" ><img style="border-radius : 50%" src="{{image_server_url}}uploads/patient/{{patient_img}}"></figure>
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
          <div class="col-sm-5">
        <div class="card">
          <div class="card-content">
            <h4 class="calldanger-title">Call Danger of Self Harm</h4>
            <figure>
              <app-heat-map [rangeValue]="self_harm"></app-heat-map>
            </figure>
            <h4 class="recommend-title">Recommendations:</h4>
            <div *ngFor="let rec of recommendations; let k = index" class="recommendation-box " [ngClass]="{'openbox': rec.tags.length}">
              <div class="recommend-head" (click)="accordionTitleClick(k)" *ngIf="rec.tags.length">
                <div class="recommend-head-title"><span>{{rec.name}}</span></div>
                <div class="recommend-repeat"><span>{{rec.count}} Times</span></div>
                <div class="recommend-percent" *ngIf="rec.tags"><span>{{rec.percent}}%</span></div>
              </div>
              <div class="recommend-body" *ngIf="this.showSubItems[k]">
                <div *ngFor="let tags of rec.tags; let i=index" style="float:left">
                  <span *ngIf="i>0">, </span><label  (click)="cnt=tags.count"><strong>{{tags.tag}}</strong> </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" *ngIf="tone">
          <div class="card-content sentimenatalbox">
            <div class="row">
              <div class="col-sm-6">
                <h4>Call Sentiments</h4>
                <figure class="pie-chart">
                  <div class="pie-chart-top">
                      <img src="assets/img/pie-chart.png" alt="pie">
                      <img src="assets/img/pin.png" [ngStyle]="sentiment" class="pie-pin" alt="pin" />
                      <div class="pie-chart-info clearfix">
                          <div class="pie-positive pull-left">Positive</div>
                          <div class="pie-negative pull-right">Negative</div>
                      </div>
                  </div>
                  <div class="pie-chart-bottom">
                      <img src="assets/img/emotion.jpg" alt="" />
                  </div>
              </figure>
              </div>
              <div class="col-sm-6" *ngIf="tone.length">
                <h4>Emotional status</h4>
                <figure>                  
                  <div class="emotion-strip">
                    <app-emotion-graph [emotionValue]="tone[0].score | round" [emotionText]="tone[0].tone_name"
                                       [emotionColor]="'#a9baa7'"></app-emotion-graph>
                  </div>
                  <div class="emotion-strip">
                    <app-emotion-graph [emotionValue]="tone[1].score | round" [emotionText]="tone[1].tone_name"
                                       [emotionColor]="'#5ba7db'"></app-emotion-graph>
                  </div>
                  <div class="emotion-strip">
                    <app-emotion-graph [emotionValue]="tone[2].score | round" [emotionText]="tone[2].tone_name"
                                       [emotionColor]="'#b9a4cb'"></app-emotion-graph>
                  </div>
                  <div class="emotion-strip">
                    <app-emotion-graph [emotionValue]="tone[3].score | round" [emotionText]="tone[3].tone_name"
                                       [emotionColor]="'#f397a4'"></app-emotion-graph>
                  </div>
                  <div class="emotion-strip">
                    <app-emotion-graph [emotionValue]="tone[4].score | round" [emotionText]="tone[4].tone_name"
                                       [emotionColor]="'#ffd529'"></app-emotion-graph>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <md-tab-group>
          <md-tab>
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
                                  <td>{{a.size}}</td>
                              </tr>
                              
                          </tbody>
                      </table>
                  </div>
                  <div class="col-sm-7 tag_cloud">
                    <div AgWordCloud *ngIf="wordData" #word_cloud_chart=ag-word-cloud  [(wordData)]="wordData"></div>
                  </div>
              </div>
          </md-tab>
      </md-tab-group>
  </div>
</div>

  `,
  styles: []
})
export class ShowTranscriptionComponent implements OnInit {
  patient_transcription ;
  tags: any = [];
  tone: any= [];
  patient_img;
  therapist_img;
  self_harm;
  sentiment: any =[];
  image_server_url = environment.baseUrl;
  wordData: Array<AgWordCloudData>;
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
      let counter=0;
      let nlucounter=0;
      let nlu=0;
      this.patient_transcription = result.data;
      for(let i=0; i<this.patient_transcription.length; i++){
        if(this.patient_transcription[i].transcript.tone.length){
          if(this.tone.length){
            this.tone[0].score+=this.patient_transcription[i].transcript.tone[0].score;
            this.tone[1].score+=this.patient_transcription[i].transcript.tone[1].score;
            this.tone[2].score+=this.patient_transcription[i].transcript.tone[2].score;
            this.tone[3].score+=this.patient_transcription[i].transcript.tone[3].score;
            this.tone[4].score+=this.patient_transcription[i].transcript.tone[4].score;
          }else{
            this.tone=this.patient_transcription[i].transcript.tone;
          }
          counter++;
        }
        if(this.patient_transcription[i].transcript.nlu){          
          nlu+=this.patient_transcription[i].transcript.nlu.document.score;
          nlucounter++;
        }
      }
      if(this.tone.length){
        this.tone[0].score/=counter;
        this.tone[1].score/=counter;
        this.tone[2].score/=counter;
        this.tone[3].score/=counter;
        this.tone[4].score/=counter;
      }
      console.log("nlu",nlu);
      if(nlu){
        nlu/=nlucounter;
      }
      if(nlu<0){
        this.sentiment = {transform: 'rotate(' + (-(nlu * 90)) + 'deg)'};
      }else{
        this.sentiment = {transform: 'rotate(' + (90 - (nlu * 90) - 90) + 'deg)'};
      }
    })
    .catch(error => this.patient_transcription = '');
    
    // this is for specific tech cloud for one patient

    

      

    this.getService(environment.baseUrl + 'recommendations/getPatientRec/' + id, this.options).then(result => {
        for(let key in result.tags){
            this.tags.push({text:key,size:result.tags[key]});
        }
        this.wordData = this.tags;
      }).catch(error => console.log(error));

      this.getService(environment.baseUrl + 'transcriptions/getTranscript/' + id, this.options).then(result => {

        this.patient_img = result.data.patient_id.image;
        this.therapist_img = result.data.user_id.image;
       this.self_harm = result.data.self_harm;
      }).catch(error => console.log(error));
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
