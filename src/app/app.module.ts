import { ToDoService } from './services/to-do.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AddComponent } from './add/add.component';
import { LogComponent } from './log/log.component';
import { PageComponent } from './page/page.component';
import { LogSpinComponent } from './log/log-spin/log-spin.component';
import { FirstLetterUppercasePipe } from './first-letter-uppercase.pipe';
import { UsersComponent } from './users/users.component';
import { ToDoComponent } from './to-do/to-do.component';
import { AllToDoesComponent } from './all-to-does/all-to-does.component';
import { GetToDoPiesPipe } from './get-to-do-pies.pipe';
import { FooterComponent } from './footer/footer.component';

import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {GalleriaModule} from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { UsersSearchPipe } from './users/users-search.pipe';

const appRoutes: Routes = [
  { path: '', component: AllToDoesComponent },
  { path: 'log', component: LogComponent },
  { path: ':name', component: ToDoComponent },
  { path: 'page/:user/:id/:nameTask', component: PageComponent },
  { path: 'user/:name', component: UsersComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddComponent,
    LogComponent,
    PageComponent,
    LogSpinComponent,
    FirstLetterUppercasePipe,
    UsersComponent,
    ToDoComponent,
    AllToDoesComponent,
    GetToDoPiesPipe,
    FooterComponent,
    UsersSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AccordionModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    GalleriaModule,
    CommonModule,
    CardModule,
    CheckboxModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
