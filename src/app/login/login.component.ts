import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';

const emptyUser = { result: { password: '', email: '' } };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: object;
  public form: FormGroup;
  returnUrl: string;
  loginError: string;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user = emptyUser.result;

    // remove user from local storage to log user out
    localStorage.removeItem('_token');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(user: any) {

    this.loginError = null;
    this.http.post(environment.baseUrl + 'user/login', { email: user.email, password: user.password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response.json().data && response.json().data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('_token', response.json().data.token);
          localStorage.setItem('therapist_in', response.json().data._id);
          localStorage.setItem('therapist_loggedin_image',response.json().data.image);
        }
      })
      .subscribe(
        data => {

          console.log('--->', data)

          return this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
          this.loginError = 'Authentication failed';
        }
      );
  }
}
