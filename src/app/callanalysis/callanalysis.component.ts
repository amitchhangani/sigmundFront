import { Declaration } from '@angular/compiler/src/i18n/serializers/xml_helper';
import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { SocketService } from '../shared/socket/socket.service';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import * as recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
//var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// @Pipe({ name: 'round' })
// export class RoundPipe implements PipeTransform {
//   transform(input: number) {
//     return Math.floor(input * 100);
//   }
// }



@Component({
  selector: 'app-user',
  moduleId: module.id,
  templateUrl: 'callanalysis.component.html',
  styleUrls: ['callanalysis.component.css']
})
export class CallanalysisComponent implements OnInit {
  output = '#output';
  headers: Headers;
  options: RequestOptions;
  fileOptions: RequestOptions;
  fileHeaders: Headers;
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;
  transcriptId_for_recording;
  message: any = [];
  tone: any = [];
  recommendations: any = [];
  danger: any = [];
  sentiment: any = [];
  cnt: Number= 0;
  stream: any;
  token: string;
  trs= '';
  showDivArr = [];
  showSubItems = [];
  itemsArray = [];
  patient;
  patient_name;
  patient_email;
  selectedValue;
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private socketService: SocketService, private http: Http, private router: Router) {
    this.socketService.eventCallback$.subscribe(value => {

      if (value[0].type === 'chat') {
        if ( Object.prototype.toString.call( value[0].data ) === '[object Array]' ) {
            if(value[0].patient==localStorage.getItem('patient_id')){
              this.message = [];
              this.message = value[0].data;
            }
        }else{
            if(value[0].patient==localStorage.getItem('patient_id')){
              this.message.push(value[0].data);
            }            
        }
        this.uploader.progress = 0;
      } else if (value[0].type === 'tone') {
        if(value[0].patient==localStorage.getItem('patient_id')){
          this.tone = value[0].data;
        }
      } else if (value[0].type === 'recommendations') {
        if(value[0].patient==localStorage.getItem('patient_id')){
          this.recommendations = value[0].data;
          this.showSubItems = value[0].data.map(i => false);
        }
      } else if (value[0].type === 'danger') {
        if(value[0].patient==localStorage.getItem('patient_id')){
          this.danger = value[0].data;
        }
      } else if (value[0].type === 'sentiment') {
        if(value[0].patient==localStorage.getItem('patient_id')){
          if (value[0].data.document.label == 'negative'){
            this.sentiment = {transform: 'rotate(' + (-(value[0].data.document.score * 90)) + 'deg)'};
          }else{
            this.sentiment = {transform: 'rotate(' + (90 - (value[0].data.document.score * 90) - 90) + 'deg)'};
          }
        }
      }
    });
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.fileHeaders = new Headers({
      'Content-Type': 'multipart/form-data'
    });
    const tokenn = 'Bearer' + ' ' + localStorage.getItem('_token');
    const patient_id = localStorage.getItem('patient_id');
    this.fileOptions = new RequestOptions({ headers: this.fileHeaders });
    this.uploader = new FileUploader(
      { url: environment.baseUrl + 'transcriptions/upload/' + localStorage.getItem('_token'),
      authToken : tokenn
    });
    this.uploader.options.additionalParameter = {
      patient_id: patient_id
    };
  }

  ngOnInit() {

    this.patient_name = localStorage.getItem('patient_name_for_chat');
    this.patient_email = localStorage.getItem('patient_email_for_chat');
    this.selectedValue = localStorage.getItem('patient_id');
    if (localStorage.getItem('patient_id')) {
       this.getService(environment.baseUrl + 'recommendations/getToken').then(result => {
          this.token = result.token;
        }).catch(error => console.log(error));
    }else {
      this.router.navigate(['/patient']);
    }

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.getService(environment.baseUrl + 'patient/fetch_all')
    .then(result => {
      this.patient = result.data;
    })
    .catch(error => console.log(error));

  }

  showOption(patient) {
    this.message=[];
    this.sentiment=[];
    this.tone=[];
    this.recommendations=[];
    this.showSubItems=[];
    this.danger=2;
    localStorage.setItem('patient_name_for_chat', patient.name);
    localStorage.setItem('patient_email_for_chat', patient.email);
    localStorage.setItem('patient_id', patient._id);
    this.patient_name = localStorage.getItem('patient_name_for_chat');
    this.patient_email = localStorage.getItem('patient_email_for_chat');
    this.selectedValue = patient._id;
  }

  public chatTimeLine: any[] = [
    {
      userChatClass: 'therapist',
      chatConent: 'Hello, how can I help you? '
    },
    {
      userChatClass: 'patient',
      chatConent: 'Hello, how can I help you? '
    }
  ];

  public btnCondition = true;
  public highLighteditem: number;
  lastCnt: Number= 0;
  trans: any= [];
  lastSp: Number= 0;
  lastIndex: Number= 0;
  abc: number =0;
  results: any=[];
  
  onEvent(name: string, event: any): void {
    let translation: any=[];    
    this.abc+=1;
    if(typeof (event.results)!= 'undefined'){
      this.results=event.results;
    }
    if (event.speaker_labels){
      //if (event.speaker_labels.length == this.results[0].alternatives[0].timestamps.length && event.speaker_labels.length != this.lastCnt){
        for(let k=0; k< this.results.length; k++){
          if(this.results[k].alternatives[0].timestamps){
            for (let i = 0; i < event.speaker_labels.length; i++){
              for(let j =0; j < this.results[k].alternatives[0].timestamps.length; j++){
                if(this.results[k].alternatives[0].timestamps[j][1]==event.speaker_labels[i].from){
                  //console.log(this.results[k].alternatives[0])
                  //console.log(this.results[k].alternatives[0].timestamps[j])
                  this.trans.push({'speaker':event.speaker_labels[i].speaker, 'transcript':this.results[k].alternatives[0].timestamps[j][0]});        
                }
              }          
            }
          }          
        }
        for(var i=0; i< this.trans.length; i++){
          if(translation.length==0 || this.lastSp!=this.trans[i].speaker){
            translation.push({"speaker":this.trans[i].speaker,"transcript":this.trans[i].transcript})
          }else{
            translation[translation.length-1].transcript+=" "+this.trans[i].transcript;
          }
          this.lastSp=this.trans[i].speaker;
        }
        //this.message = [];
        //this.message = translation;
        this.postService(environment.baseUrl + 'transcriptions/fetchLiveRecordingData/' + this.transcriptId_for_recording + '/' +localStorage.getItem('_token')+'/1', {speakers:translation}).then(result => {


            }).catch(error => console.log(error));
      //}
    }

    if (name == 'Results:'){
      if (event.results[event.results.length - 1].final){
        this.transcript = event.results[event.results.length - 1].alternatives[0].transcript;
      }
    }
    //console.log(result.speaker_labels);
    if (name == 'Speaker_Labels:'){
      if (event.speaker_labels[event.speaker_labels.length - 1]){
        let speaker = event.speaker_labels[event.speaker_labels.length - 1].speaker;
        if (this.transcript != this.oldTrans) {
          //this.message.push({speaker: speaker, transcript: this.transcript});
          //if (speaker != 0){
            this.trs += ' ' + this.transcript;
            this.postService(environment.baseUrl + 'transcriptions/fetchLiveRecordingData/' + this.transcriptId_for_recording + '/' +localStorage.getItem('_token')+'/1', {trs: this.trs, transcript: this.transcript,speaker: speaker}).then(result => {


            }).catch(error => console.log(error));
          //}
        }
        this.oldTrans = this.transcript;
        speaker = 0;
      }
    }

  }

  startMicRecording() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('_token')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.getService(environment.baseUrl + 'transcriptions/startLiveRec/' + localStorage.getItem('patient_id') + '/'
    + localStorage.getItem('_token'))
    .then(result => {
      this.transcriptId_for_recording =  result.data._id; // this transcription_id needed for live recording 
      this.lastCnt = 0;
      this.lastIndex = 0;
      this.lastSp = 0;
      this.trans = [];
      this.message = [];
      this.trs = '';
      this.stream = recognizeMicrophone({
        token: this.token,
        speaker_labels: true,
        objectMode: true,
        inactivityTimeout: -1
      });

      this.stream.on('error', function(err) {
          console.log(err);
      });

      this.stream.on('data', (data) => {
        if (data.results)
          this.onEvent('Results:', data);
        if (data.speaker_labels)
          this.onEvent('Speaker_Labels:', data);
      });

    }).catch(error => console.log(error));

  }

  stopRec() {
    this.stream.stop();
  }

  oldTrans = '';
  transcript = '';



  getService(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  toggleBtnTxt() {
    this.btnCondition = !this.btnCondition;
  }

  accordionTitleClick(targetVal) {
    //this.highLighteditem = targetVal;
    this.showSubItems[targetVal] = !this.showSubItems[targetVal];
  }

  onChange() {
    this.uploader.progress = 0;
    this.uploader.uploadAll();
    this.tone = [];
    this.message = [];

    // debugger;
    // console.log('onChange');
    // const files = event.srcElement.files;
    // console.log(files);
    // this.uploadService(environment.baseUrl + 'transcriptions/upload', { file: files[0] }).then(result => result)
    //   .catch(error => console.log(error));
    // this.service.makeFileRequest('http://localhost:8182/upload', [], files).subscribe(() => {
    //   console.log('sent');
    // });
  }

  postService(url: string, payload: any): Promise<any> {
    return this.http
      .post(url, payload, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  uploadService(url: string, payload: any): Promise<any> {
    return this.http
      .post(url, payload, this.fileOptions)
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
