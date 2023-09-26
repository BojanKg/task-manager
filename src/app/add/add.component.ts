import { ToDoService } from './../services/to-do.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToDo } from '../to-do.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addToDoForm: FormGroup;
  submitted = false;
  text: string;
  day: string;
  showAddToDo: boolean;
  subscription!: Subscription;
  error: string | null;
  addToDo: ToDo[] = [];
  numberToDoes: number;
  private errorSub: Subscription;
  id: number[] = [];

  //Priority
  priority = ['Low', 'Medium', 'High'];

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.addToDoForm = new FormGroup({
      toDoData: new FormGroup({
        taskName: new FormControl(null, [
          Validators.required
        ]),
        // status: new FormControl(null, [
        //   Validators.required
        // ]),
        priority: new FormControl(null, [
          Validators.required
        ]),
        toDoDate: new FormControl(null, [
          Validators.required
        ])
      })
    });

    let user: any[] = [];
    
    this.errorSub = this.toDoService.getAlltoDoes()
      .subscribe({
        next: (posts) => {
          user = posts;
          for (let i = 0; i < posts.length; i++) {
            for (let x = 0; x < user[i].null.length; x++) {
              this.id.push(user[i].null[x].id);
            }
          }
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });
  }

  onSubmit() {
    const toDo: ToDo = {
      user: this.toDoService.user,
      taskName: this.addToDoForm.get('toDoData.taskName')?.value,
      addDate: this.getDate(),
      status: false,
      priority: this.addToDoForm.get('toDoData.priority')?.value,
      toDoDate: this.addToDoForm.get('toDoData.toDoDate')?.value,
      id: this.getID(this.id),
    }
    let arrayLenght: number | undefined = 0; 
    this.toDoService.getToDoes()
    .subscribe({
      next: (posts) => {
        this.addToDo = posts;
        arrayLenght =  this.addToDo.length;
        this.toDoService.addToDo(toDo, arrayLenght);
      },
      error: (error) => {
        console.log('ERROR =', error);
        this.error = error.message;
      },
    });
    this.id.push(toDo.id!);
    console.log('ID',this.id);
    this.addToDoForm.reset();
  }

  getID(id: number[]): number {
    id.sort((a, b) => a - b);
    let get = 1;
    for (let i = 0; i < id.length; i++) {
      if (id[i] <= get) {
        get = id[i] + 1;
      } else {
        break;
      }
    }
    return get;
  }

  getDate() {
    const now: Date = new Date();
    const day: number = now.getDate();
    const month: number = now.getMonth() + 1;
    const year: number = now.getFullYear();
    const formattedDate: string = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    return formattedDate;
  }

  getToDoDate() {
    const date = this.addToDoForm.get('toDoData.toDoDate')?.value;
    const dateGet: Date = new Date(date);

    const day: number = date.getUTCDate();
    const month: number = date.getUTCMonth() + 1;
    const year: number = date.getUTCFullYear();

    const formattedDate: string = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    return formattedDate;
  }
}