import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {  RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    MatButtonModule,
    NzButtonModule,
    NzPopoverModule,
    NzIconModule,
    NzDropDownModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class HeaderModule { }
