import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Handler } from './handler';
import { catchError, tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  private supabaseUrl = `${environment.supabaseUrl}/rest/v1`;
  private supabaseKey = environment.supabaseKey;

  handlers$ = this.http.get<Handler[]>(`${this.supabaseUrl}/handlers`, { headers: { apikey: this.supabaseKey } })
    .pipe(
      tap(data => console.log('Handlers: ', JSON.stringify(data))),
      catchError(this.errorService.handleHttpError)
    );

  constructor(private http: HttpClient, private errorService: ErrorService) { }

}
