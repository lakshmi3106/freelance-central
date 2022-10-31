import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { SessionStorage } from 'ngx-store';
// import { UserModel } from '../../model';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';
// import User = firebase.User;
// import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({ providedIn: 'root' })
export class AuthService {

  loginUrl = '/login';
  userDetails = new Subject<any>();
  auth;
  constructor(private router: Router, private db: AngularFirestore) {
    this.auth = getAuth();
   
  }


  signWithEmail(email: string, password: string): Promise<any> {

    this.auth.languageCode = 'it';
    return signInWithEmailAndPassword(this.auth, email, password);



  }

  signUp(email: string, password: string): Promise<any> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }
  getUserStatus() {

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userDetails.next(user);
        this.router.navigateByUrl('dashboard')

        // localStorage.setItem('user',JSON.stringify(user));
        // // User is signed in, see docs for a list of available properties
        // // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
      } else {
        this.router.navigateByUrl('login')
      };
    })
  
}
  googleLogin() {

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(this.auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result?.user;

        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('dashboard').catch(err => {
          console.log(err);
        });

        // ...
      }).catch((error: any) => {
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

  logOut(): void {

    signOut(getAuth()).then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('login')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });


  }





}
