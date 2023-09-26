import { ToDoService } from './../services/to-do.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, LogService } from './log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logForm: FormGroup;
  isLoginMode = true;
  formLogin = true;
  loginLog = false;
  isLoading = false;
  error: string = null!;
  mail: string[] = [];
  selectedMail: string;

  userName: string;

  private errorSub: Subscription;

  constructor(private logService: LogService, private router: Router, private toDoService: ToDoService) {}

  ngOnInit(){
    let oneUser: any[] = [];
    this.errorSub = this.toDoService.getAlltoDoes().subscribe({
      next: (posts) => {
        oneUser = posts;
        for (let i = 0; i < posts.length; i++) {
          this.mail.push(oneUser[i].null[0].user+'@gmail.com');
        }
      },
      error: (error) => {
        console.log('ERROR =', error);
        this.error = error.message;
      },
    });
    
    this.logForm = new FormGroup({
      logData: new FormGroup({
        mail: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(null, [
          Validators.required
        ])
      })
    });
  }

  onSubmit() {
    if(!this.logForm.valid) {
      return;
    }
    const email = this.logForm.get('logData.mail')?.value;
    const password = this.logForm.get('logData.password')?.value;

    this.userName = email.substring(0, email.indexOf("@"));
    this.toDoService.user = this.userName;

    this.logService.setUser(this.userName);

    let adminObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      adminObs = this.logService.signup(email, password);
    } 
    else {
      adminObs = this.logService.getLog(email, password);
    }

    adminObs!.subscribe({
      next: resData => {
        console.log(resData);
        this.loginLog = true;
        this.isLoading = false;
        this.logService.setLoginLog(this.loginLog);
        if (this.isLoginMode) {
          this.router.navigate(['/log']);
        } 
        else {
          this.router.navigate(['']);
        }
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loginLog = false;
      }
    });
    this.logForm.reset();
  }

  log() {
    this.isLoginMode = !this.isLoginMode;
  }


  logOut() {
    this.logService.logout();
    this.loginLog = false;
    this.formLogin = true;
    this.isLoginMode = true;
    this.isLoading = false;
    location.reload();
  }

  onDestroy() {
    this.errorSub.unsubscribe();
  }
}
