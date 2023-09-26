import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDo } from '../to-do.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private page = new BehaviorSubject<ToDo>({});
  private buttonBack = new BehaviorSubject<boolean>(false);

  constructor() { }

  setPage(page: ToDo) {
    this.page.next(page);
  }

  getData() {
    return this.page.asObservable();
  }

  setButtonBack(buttonBack: boolean) {
    this.buttonBack.next(buttonBack);
  }

  getButtonBack() {
    return this.buttonBack.asObservable();
  }
}
