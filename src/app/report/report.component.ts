import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {  
  
  headers: Headers;
  options: RequestOptions;
  tags :any = [];
  data: Array<CloudData>;  

  constructor( private http: Http) { 
      this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    });
    this.options = new RequestOptions({ headers: this.headers });
  }
  
  ngOnInit() {
    this.getService(environment.baseUrl + 'recommendations/getPatientRecommendations').then(result => {
          
          for(let key in result.tags){
              this.tags.push({text:key,weight:result.tags[key]});
          }
          this.data=this.tags;
        }).catch(error => console.log(error));
  }

  cloudoptions: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
    width : 500,
    height : 400,
    overflow: false,
  }
 
  

  getService(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
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
