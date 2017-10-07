import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-patient-add',
  template: `
      <div class="login login-wrap">
      <div class="container">
        <div class="register-wrap">
          <div class="panel panel-login">
            <div class="panel-body">
              <div class="row">
                <div class="col-lg-12">
                  <form  [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
                    <h1 class="login-heading"><img src="../assets/img/logo.png" alt="logo" width="250"></h1>
                    <h2><span style=" cursor:pointer; ">Update Patient</span></h2>

                    <md-input-container class="full-width">
                      <input mdInput [(ngModel)]="patient.name" formControlName="name" required placeholder="Name" [name]="true" />
                      <md-error>This field is required</md-error>
                    </md-input-container>
                    <br>
                    <md-input-container class="full-width">
              <input mdInput [(ngModel)]="patient.email" required formControlName="email" placeholder="Email" type="text" [email]="true"/>
                      <md-error>This field is required</md-error>
                    </md-input-container>
                    <label>Image*<span></span></label>
                    <img *ngIf="patient_profile_picture" src='{{image_server_url}}uploads/patient/{{patient_profile_picture}}' style="width:50px;height:50px" >
                    <div class="btn btn-success load-file"><i class="icon material-icons">file_upload</i> 
                        <span *ngIf="patient_profile_picture">Change Image</span>
                        <span *ngIf="!patient_profile_picture">Load Image</span>
                      <input type="file" ng2FileSelect [uploader]="uploader"
                      accept="image/*" (change)="onChange()"/>
                    </div>
                    <div class="row">
                      <div class="col-sm-8 form-group text-right">
                        <button class="btn btn-danger btn-login" type='submit'>Update</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `,
})
export class PatientUpdateComponent implements OnInit {
  patient = { result: { name: '', email: '', image : '' } };
  patient_id: any;
  public form: FormGroup;
  returnUrl: string;
  loginError: string;
  fileOptions: RequestOptions;
  fileHeaders: Headers;
  patient_profile_picture;
  public uploader: FileUploader;
  image_server_url = environment.baseUrl;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {
    this.form = this.builder.group({
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.fileHeaders = new Headers({
      'Content-Type': 'multipart/form-data'
    });
    this.fileOptions = new RequestOptions({ headers: this.fileHeaders });
    this.uploader = new FileUploader({
      url: environment.baseUrl + 'patient/upload'
    });
   }

  ngOnInit() {
    this.patient_id = localStorage.getItem('patient_id_for_updation');
    this.loginError = null;
    this.http.get(environment.baseUrl + 'patient/get' + '/' + this.patient_id)
      .map((response: Response) => {
        return response = response.json();
      })
      .subscribe(
        data => {
          this.patient = data.data;
          this.patient_profile_picture = this.patient;
          this.patient_profile_picture = this.patient_profile_picture.image;
        },
        error => {
          console.log(error);
          this.loginError = 'Authentication failed';
        }
      );
  }

  onChange() {
    this.uploader.progress = 0;
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.patient_profile_picture = JSON.parse(response).file_name;
  };
  }


  onSubmit(patient: any ) {
    this.loginError = null;
    this.http.put(environment.baseUrl + 'patient/update' + '/' + this.patient_id , { email: patient.email,
      name: patient.name, image : this.patient_profile_picture } )
      .map((response: Response) => {
        return response = response.json();
      })
      .subscribe(
        data => {
          return this.router.navigate(['/patient']);
        },
        error => {
          console.log(error);
          this.loginError = 'Authentication failed';
        }
      );
      }
}
