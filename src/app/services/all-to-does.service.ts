import { ToDo } from './../to-do.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllToDoesService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllToDoes() {
    return this.http.get<{ [key: string]: ToDo }>(
      `https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/.json`,
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        responseType: 'json',
      }
    )
    .pipe(
      map((responseData) => {
        const postsArray: ToDo[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({
              ...responseData[key],
            });
          }
        }
        return postsArray;
      }),
      catchError((errorRes) => {
        return throwError(() => Error(errorRes));
      })
    );
  }
}
