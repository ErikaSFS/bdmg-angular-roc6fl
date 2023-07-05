import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { End } from '../model/end.model';

@Injectable()
export class AppService {
  private url: string = 'https://viacep.com.br/ws/30160907/json';

  constructor(private http: HttpClient) {}

  getEnd(): Observable<End> {
    return this.http.get<End>(this.url).pipe(
      (res) => res,
      (error) => error
    );
  }
}
