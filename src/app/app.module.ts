import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule} from './material.module'
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

import {DashboardComponent } from './dashboard/dashboard.component'
import { DialogContent}  from './dashboard/dialog/dialog.component';
import { UserService} from './services/use.service'
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [AppComponent,LoginComponent,DashboardComponent,DialogContent,RegisterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    // NgxIndexedDBModule.forRoot(dbConfig)
  ],
  
  providers:[AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
