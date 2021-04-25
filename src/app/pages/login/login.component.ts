import { LoginResponse } from './../../models/login/response.model';
import { AdResponse } from './../../models/external-login/adresponse.model';
import { LoginRequest } from './../../models/login/request.model';
import { LoginService } from './../../shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = true;
  title = 'iterativeappfestpay';
  form: FormGroup;
  loginRequest: LoginRequest;
  cpfForm = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      cpf: new FormControl(null, [Validators.minLength(11), Validators.required])
    });
  }

  ngOnInit() {
    if (!!window.location.href.split('token=')[1]) {
      this.loginRequest = {
        authorization: window.location.href.split('token=')[1].split('&')[0]
      };
      this.loading = true;
      this.loginService.login(this.loginRequest).then((res: LoginResponse) => {
        if (res.cpfRequerid) {
          this.cpfForm = true;
        } else {
          this.loginService.loginFest(res).then((response: any) => {

          }).catch(err => {
            this.snackBar.open('Ocorreu um erro ao processar a solicitação, por favor tente mais tarde', null, { duration: 5000 });
          });
        }
        this.loading = false;
      });
    }


    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log('param', params);
    //   this.loginRequest = { authorization: params.id_token };
    // });

  }
resetarForm() {
  this.form.reset();

}

  submit(withCpf: boolean) {
    if (withCpf) {
      if (this.form.valid) {
        this.loading = true;
        this.loginRequest.cpf = this.form.value.cpf;
        this.loginService.login(this.loginRequest).then((res: LoginResponse) => {
          this.loading = true;
        }).catch(err => {
          this.snackBar.open('Cpf informado não foi encontrado', null, { duration: 5000 });
          this.form.reset();
        });
        this.loading = false;
      }
    } else {
      document.location.assign(this.loginService.externalLogin());
    }
  }
}
