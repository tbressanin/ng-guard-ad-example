import { ServiceBase } from './servicebase.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StatementService extends ServiceBase<StatementService> {
  public counto = 0;
  constructor(public httpClient: HttpClient) {
    super();
  }

  getStatement(event?: string, document?: string): Promise<any> {
    const url = 'https://ifest-api-sincronizacao.azurewebsites.net/api/Extrato/32/40814899803';
    const urlnew = `${'https://ifest-api-sincronizacao.azurewebsites.net/api/' + event + document}`;
    return new Promise<any>((resolve, reject) => {
      return this.httpClient.get<any>(url, { headers: this.header }).subscribe(res => {
        this.counto = 123;
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
