import { ToDoService } from './../services/to-do.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ToDo } from '../to-do.model';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-all-to-does',
  templateUrl: './all-to-does.component.html',
  styleUrls: ['./all-to-does.component.css']
})
export class AllToDoesComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  allToDoes: ToDo[] = [];
  selectedAllToDoes: ToDo;
  private errorSub: Subscription;
  error: string | null;
  buttonBack = true;

  constructor(private toDoService: ToDoService, private pageService: PageService) {}
  
  ngOnInit() {
    this.errorSub = this.toDoService.error.subscribe((errorMessage) => {
      this.error = errorMessage ? errorMessage : null;
    });
    let oneToDo: any[] = [];
    let singleToDo: ToDo[] = [];
    this.errorSub = this.toDoService.getAlltoDoes()
      .subscribe({
        next: (posts) => {
          oneToDo = posts;
          for (let i = 0; i < posts.length; i++) {
            singleToDo.push(...oneToDo[i].null);
          }
          this.allToDoes = singleToDo;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  sendPage(page: ToDo) {
    this.pageService.setPage(page);
    this.pageService.setButtonBack(this.buttonBack);
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
}