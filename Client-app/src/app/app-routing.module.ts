import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentViewComponent } from './document-view/document-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DocumentViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
