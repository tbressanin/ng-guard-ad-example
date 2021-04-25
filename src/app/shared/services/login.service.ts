import { LoginResponse } from './../../models/login/response.model';
import { ServiceBase } from './servicebase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/models/login/request.model';

@Injectable()
export class LoginService extends ServiceBase<LoginService> {
  constructor(private router: Router, private httpClient: HttpClient) {
    super();
  }

  public setRotaDefault() {
    this.router.navigateByUrl('/home');
  }

  public redirectMain() {
    this.router.navigateByUrl('/login');
  }

  login(login: LoginRequest): Promise<LoginResponse> {
    this.header = this.header.set('Authorization', 'Bearer ' + login.authorization).set('cpf', !!login.cpf ? login.cpf : '');
    const url = 'http://iterabarhml.azurewebsites.net/api/auth';

    return new Promise<LoginResponse>((resolve, reject) => {
      return this.httpClient.post<LoginResponse>(url, null, { headers: this.header }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  loginFest(login: any): Promise<LoginResponse> {
    this.header = this.header.set('Authorization', 'Bearer ' + login.token).set('cpf', !!login.cpf ? login.cpf : '');
    const url = 'http://iterabarhml.azurewebsites.net/api/auth';

    return new Promise<LoginResponse>((resolve, reject) => {
      return this.httpClient.post<LoginResponse>(url, null, { headers: this.header }).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getState() {
    return true;
  }

  externalLogin(): string {
    const tenantId = '1bbc4e5a-70dc-4256-aab4-56460339075d';
    const clientId = '61006694-fce9-4f9e-8398-f2f8742e8b99&';
    const redirectUri = 'http://localhost:4280';
    // tslint:disable-next-line:max-line-length
    return `${'https://login.microsoftonline.com/' + tenantId + '/oauth2/authorize?client_id=' + clientId + 'redirect_uri=' + redirectUri + '&response_type=code+id_token&scope=openid&nonce=iterative'}`;
  }

  // set(user: User) {
  //   AutenticationService.user = user;
  //   window.localStorage.setItem(this.key, JSON.stringify(AutenticationService.user));
  //   if (AutenticationService.user !== null) { this.setRotaDefault(); }
  // }

  // clear() {
  //   window.localStorage.removeItem(this.key);
  //   window.localStorage.removeItem('adid');
  //   AutenticationService.user = undefined;
  // }

  // get(): User {
  //   AutenticationService.user = JSON.parse(window.localStorage.getItem(this.key));
  //   return AutenticationService.user;
  // }

}
