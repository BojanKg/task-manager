import { PageService } from './../services/page.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDo } from '../to-do.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  toDoes: ToDo[];
  selectedtoDo: ToDo;
  error: string | null;
  private errorSub: Subscription;
  edit = true;
  editB: ToDo;
  index: number = 0;
  add = true;
  acceptToDo: ToDo;
  buttonBack = false;
  search: string;

  constructor(private usersService: UsersService, private pageService: PageService) {}
  
  ngOnInit() {
    this.errorSub = this.usersService.getUsers()
      .subscribe({
        next: (posts) => {
          this.toDoes = posts;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });
  }

  onDestroy() {
    this.errorSub.unsubscribe();
  }

  sendPage(page: ToDo) {
    this.pageService.setPage(page);
    this.pageService.setButtonBack(this.buttonBack);
  }
  
  filter(search: string) {
    // this.toDoes.search(toDo => toDo.taskName  === search);
    this.toDoes.find(toDo => toDo.taskName  === search);
  }

}