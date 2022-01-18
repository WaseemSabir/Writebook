import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteAppComponent } from './document/write-app/write-app.component';
import { DocumentComponent } from './pages/document/document.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '',pathMatch:'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'documents', component: DocumentComponent},
  { path: 'document/:id', component: WriteAppComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
