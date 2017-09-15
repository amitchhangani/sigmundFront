import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

const emptyUser = {result: {name: '', Email: '', password: ''}};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-update',
  template: `
  <div class="login login-wrap">
  <div class="container">
    <div class="register-wrap">
      <div class="panel panel-login">
        <div class="panel-body">
          <div class="row">
            <div class="col-lg-12">
              <form *ngIf="user" [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
                <h1 class="login-heading"><img src="../assets/img/logo.png" alt="logo" width="250"></h1>
                <h2><span style="cursor:pointer;">UPDATE THERAPIST</span></h2>
                <div *ngIf=msg2 class="alert alert-danger alert-dismissable fade in">
                  <span> {{msg2}} </span>
                </div>

                <md-input-container class="full-width">
                  <input mdInput [(ngModel)]="user.name " placeholder="Name" formControlName="name">
                  <md-error>This field is required</md-error>
                </md-input-container>


                <md-input-container class="full-width">
                  <input mdInput [(ngModel)]="user.email " formControlName="email" placeholder="Email">
                  <md-error>This field is required</md-error>
                  <!--<md-error *ngIf="email.hasError('required')">Correct Email </md-error>-->
                </md-input-container>


                <md-input-container class="full-width">
                  <input mdInput [(ngModel)]="user.password " formControlName="password" placeholder="Password" type="password">
                  <md-error>This field is required</md-error>
                </md-input-container>

                <div class="clearfix form-group text-right">
                  <button class="btn btn-danger btn-login">UPDATE</button>
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
export class UserUpdateComponent implements OnInit {
  user: any;
  public form: FormGroup;
  msg2: string;
  user_id: any;
  returnUrl: string;
  loginError: string;
  constructor(private builder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private http: Http) {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id_for_updation');
    this.loginError = null;
    this.http.get(environment.baseUrl + 'user' + '/' + this.user_id)
      .map((response: Response) => {
        return response = response.json();
      })
      .subscribe(
        data => {
          this.user = data.data;
        },
        error => {
          console.log(error);
          this.loginError = 'Authentication failed';
        }
      );
  }

  onSubmit(user: any) {
    this.http.post(environment.baseUrl + 'user/update/' + this.user_id, {name: user.name, email: user.email, password: user.password})
      .map((response: Response) => {
          response.json();
      })
      .subscribe(
        (data) => {
          this.router.navigate(['user']);
        },
        () => {
        }
      );
  }
}
