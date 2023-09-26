import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Subject, throwError } from 'rxjs';
import { ToDo } from '../to-do.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private pageUser = new BehaviorSubject<string>('');
  toDoes: ToDo[] = [];
  error = new Subject<string>();
  user: string = '';
  null = '';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<{ [key: string]: ToDo }>(
      `https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${this.user}/null.json`,
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

  setPage(user: string) {
    this.pageUser.next(user);
    this.user = user;
  }

  getPage() {
    return this.pageUser.asObservable();
  }
}
