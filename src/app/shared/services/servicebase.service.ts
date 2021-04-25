import { HttpHeaders } from '@angular/common/http';
export class ServiceBase<T> {
  public header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
}
