import { ToDoService } from './../services/to-do.service';
import { UsersService } from './../services/users.service';
import { LogService } from './../log/log.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginLog: boolean = false;
  subscription: Subscription;
  user: string;
  userDropdown: string[] = [];
  error: string | null;

  constructor( private logService: LogService, private router: Router, private toDoService: ToDoService, private usersService: UsersService) {}
  
  ngOnInit() {
    this.logService.getLoginLog().subscribe(data => {
      this.loginLog = data;
    })

    this.logService.getUser().subscribe(data => {
      this.user = data;
    });

    let oneUser: any[] = [];
    this.toDoService.getAlltoDoes().subscribe({
        next: (posts) => {
          oneUser = posts;
          for (let i = 0; i < posts.length; i++) {
            this.userDropdown.push(oneUser[i].null[0].user);
          }
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      })
  }

  hasRouter(route: string) {
    return this.router.url === route;
  }

  clickUser(user: string) {
    this.usersService.setPage(user);
  }
}
