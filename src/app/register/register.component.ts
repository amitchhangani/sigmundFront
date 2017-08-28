import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

const emptyUser = {result: {name: '', Email: '', password: ''}};

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  user: any;
  public form: FormGroup;
  msg2: string;

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
    this.user = emptyUser.result;
  }

  onSubmit(user: any) {

    this.http.post(environment.baseUrl + 'user/register', {name: user.name, email: user.email, password: user.password})
      .map((response: Response) => {
          response.json();
      })
      .subscribe(
        (data) => {
          this.msg2 = 'Registration Success';
        },
        () => {

        }
      );
  }
}
