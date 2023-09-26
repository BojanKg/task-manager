import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { ToDo } from '../to-do.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  toDoes: ToDo[] = [];
  error = new Subject<string>();
  user: string = '';
  null = '';

  constructor(private http: HttpClient) { }

  getAlltoDoes() {
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

  getToDoes() {
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

  createUser(user: string) {
    const creatUser: any = {null: ''};
    this.http
      .put<[name: {}]>(
        `https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${user}/.json`,
        creatUser,
        {
          headers: new HttpHeaders({ 'body': "book" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  addToDo(content: ToDo, booksLenght: number) {
    this.http
      .put<[name: number]>(
        `https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${this.user}/null/${booksLenght}.json`,
        content,
        {
          headers: new HttpHeaders({ 'body': "books" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  deleteToDo(index: number) {
    return this.http
      .delete(`https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${this.user}/null/${index}.json`, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          console.log('Event?: ',event);
          if (event.type === HttpEventType.Sent) {
            console.log('Type?: ',event.type);
          }
          if (event.type === HttpEventType.Response) {
            console.log('Body?: ',event.body);
          }
          this.deleteNull();
        })
      );
  }

  deleteNull() {
    this.http.get(`https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${this.user}/null.json`)
      .subscribe(toDoes => {
        const toDoesArray = toDoes as ToDo[];
        const filteredToDoes = toDoesArray.filter((toDoes: ToDo) => toDoes !== null);
        this.http.put(`https://zavrsni-f58ba-default-rtdb.europe-west1.firebasedatabase.app/${this.user}/null.json`, filteredToDoes).subscribe();
    });
  }
}
