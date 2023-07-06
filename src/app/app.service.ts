import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { End } from './model/end.model';

@Injectable()
export class AppService {
  private readonly API = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}
  
  getEndInfo(valor: string =
  '30160907'): Observable<End> {
    return this.http.get<End>(
      `${this.API}` + valor + `/json/`
    );
  }
}
