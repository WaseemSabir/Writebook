import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from './home/home.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DocumentComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzListModule,
    NzModalModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    DocumentComponent,
    HomeComponent
  ]
})
export class PagesModule { }
