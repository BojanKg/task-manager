import { ToDoService } from './../services/to-do.service';
import { ToDo } from './../to-do.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [MessageService],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class ToDoComponent implements OnInit {

  @ViewChild('dt', {static: true}) dt!: ElementRef;
  toDoes: ToDo[];
  selectedToDo: ToDo;
  error: string | null;
  private errorSub: Subscription;
  edit = true;
  editB: ToDo;
  index: number = 0;
  add = true;
  acceptToDo: ToDo;

  clonedBooks: { [s: string]: ToDo; } = {};

  publisher: SelectItem[];

  constructor(private toDoService: ToDoService, private messageService: MessageService) {}
  
  ngOnInit() {
    this.errorSub = this.toDoService.getToDoes()
      .subscribe({
        next: (posts) => {
          this.toDoes = posts;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });

      this.publisher = [{label: 'Low', value: 'Low'},{label: 'Medium', value: 'Medium'},{label: 'High', value: 'High'}];
  }
  
  onDestroy() {
    this.errorSub.unsubscribe();
  }

  deleteToDo(toDo: number) {
    this.errorSub = this.toDoService.deleteToDo(toDo).subscribe(() => {
      this.toDoService.getToDoes()
      .subscribe({
        next: (posts) => {
          this.toDoes = posts;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });
    });
    this.toDoes.splice(toDo, 1);
    console.log(this.toDoes);
  }

  editToDo(item: ToDo, index: number) {
    this.editB = item;
    this.edit = !this.edit;
    this.index = index;
  }

  addOpen() {
    this.add = !this.add;
  }

  onRowEditInit(toDo: ToDo) {
    console.log(toDo.id!, toDo)
    console.log(this.clonedBooks)
    this.clonedBooks[toDo.id!] = {...toDo};
  }

  onRowEditSave(toDo: ToDo, index: number) {
      if (toDo.id! > 0) {
          delete this.clonedBooks[toDo.id!];
          this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
      }
      else {
          this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
      }
      console.log('Edit Name: ', toDo, index);
      this.toDoService.addToDo(toDo, index);
  }

  onRowEditCancel(toDo: ToDo, index: number) {
      this.toDoes[index] = this.clonedBooks[toDo.id!];
      delete this.clonedBooks[toDo.id!];
  }

}
