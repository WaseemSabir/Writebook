import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteAppComponent } from './write-app/write-app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree'; 
import { MatIconModule } from '@angular/material/icon';
import { NodeComponent } from './node/node.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DocumentViewComponent } from './document-view/document-view.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
    WriteAppComponent,
    NodeComponent,
    DocumentViewComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzTreeModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    NzDropDownModule,
    RichTextEditorModule,
    NzFormModule,
    NzPopconfirmModule
  ],
  exports: [
    WriteAppComponent
  ]
})
export class DocumentModule { }
