import {NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import{ DashboardComponent} from './dashboard/dashboard.component';
import { RegisterComponent} from './register/register.component';


const routes: Routes = [{path: 'login', component: LoginComponent},
{ path:'dashboard', component:DashboardComponent},
{ path:'register', component: RegisterComponent},
{ path: '', redirectTo: 'login', pathMatch: 'full'}];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
