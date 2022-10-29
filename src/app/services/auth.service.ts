import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword,signInWithPopup,signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut } from "firebase/auth";
// import { SessionStorage } from 'ngx-store';
// import { UserModel } from '../../model';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';
// import User = firebase.User;
// import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { Subject } from 'rxjs';




@Injectable({ providedIn: 'root' })
export class AuthService {
  // @SessionStorage() user: UserModel | undefined;
  // @SessionStorage() isAuthenticated = false;
  // @SessionStorage() device = 'Web Admin';
  loginUrl = '/login';
  userDetails = new Subject<any>()
  constructor(private router:Router) {

  }

  // public updateUser(user: User, userName?: string): Promise<void> {
  //   return this.afs.doc(`users/${user.uid}`).set({
  //     uid: user.uid,
  //     displayName: userName || user.displayName,
  //     email: user.email,
  //     photoURL: user.photoURL,
  //     registerDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     lastDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     balance: 0
  //   })
  //     ;
  // }

  signWithEmail(email: string, password: string): Promise<any> {
    const auth = getAuth();
    auth.languageCode = 'it';
    return signInWithEmailAndPassword(auth, email, password);
    
    //return createUserWithEmailAndPassword(this.auth, email, password)
  
  }

  // signUp(email: string, password: string, userName: string): Promise<UserCredential> {
  //   return this.afAuth.createUserWithEmailAndPassword(email, password);
  // }

  // signOut(): Promise<void> {
  //   return this.afAuth.signOut();
  // }

googleLogin(){

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.setCustomParameters({
    'login_hint': 'lakshmi3106@gmail.com'
  });
  signInWithPopup(getAuth(), provider)
  .then((result:any) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result?.user;

    localStorage.setItem('user',JSON.stringify(user));
    this.router.navigateByUrl('dashboard').catch(err => {
      console.log(err);
    });

    // ...
  }).catch((error:any) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(error)
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

logOut(){

  signOut(getAuth()).then(() => {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login')
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
  
  
}




}
