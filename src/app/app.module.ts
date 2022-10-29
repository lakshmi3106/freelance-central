import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule} from './material.module'
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { initializeApp } from 'firebase/app';
import {DashboardComponent } from './dashboard/dashboard.component'


@NgModule({
  declarations: [AppComponent,LoginComponent,DashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    AppRoutingModule
  ],
  
  providers:[AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  app = initializeApp(environment.firebaseConfig);
 }
