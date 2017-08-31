import { Declaration } from '@angular/compiler/src/i18n/serializers/xml_helper';
import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { SocketService } from '../shared/socket/socket.service';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
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
  headers: Headers;
  options: RequestOptions;
  fileOptions: RequestOptions;
  fileHeaders: Headers;
  public uploader: FileUploader
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;
  message: any = [];
  tone: any = [];
  recommendations : any = [];
  danger : any = [];
  sentiment : any = [];
  cnt:Number=0;

  constructor(private socketService: SocketService, private http: Http) {
    this.socketService.eventCallback$.subscribe(value => {
        
      if (value[0].type === 'chat') {
        this.message.push(value[0].data);
        this.uploader.progress=0;
      } else if (value[0].type === 'tone') {
        this.tone = value[0].data;
      } else if (value[0].type === 'recommendations') {
        this.recommendations = value[0].data;
      } else if (value[0].type === 'danger') {
        this.danger = value[0].data;
      } else if (value[0].type === 'sentiment') {
        this.sentiment = {transform: 'rotate('+(180-(value[0].data.document.score*180)-90)+'deg)'};
      }
    });
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.fileHeaders = new Headers({
      'Content-Type': 'multipart/form-data'

    });
    this.fileOptions = new RequestOptions({ headers: this.fileHeaders });
    this.uploader = new FileUploader({ url: environment.baseUrl + 'transcriptions/upload' });
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

  public recordStatus = 'Start';
  public btnCondition = true;
  public highLighteditem: number;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  toggleBtnTxt() {
    this.btnCondition = !this.btnCondition;
    this.recordStatus = this.btnCondition ? 'Start' : 'Stop';
  }

  ngOnInit() {
    // $.getScript('../../../assets/js/material-dashboard.js');
  }

  accordionTitleClick(targetVal) {
    this.highLighteditem = targetVal;
  }

  onChange() {
    this.uploader.progress=0;
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
