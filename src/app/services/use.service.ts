import { Injectable } from '@angular/core';

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut } from "firebase/auth";

import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';

import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


@Injectable({ providedIn: 'root' })
export class UserService {

  loginUrl = '/login';
  userDetails = new Subject<any>();
  collection = 'Contractors';
  constructor(private router: Router, private db: AngularFirestore) {

  }


  getAllUsers() {
    return new Promise<any>((resolve) => {
      this.db.collection(this.collection).valueChanges({ idField: 'id' }).subscribe((users: any) => resolve(users));
    });

  }


  addUser(user: any) {
    return this.db.collection(this.collection).doc().set(user);
  }

  updateUser(user: any): Promise<void> {

    return this.db.doc(`${this.collection}/${user.id}`).update(user);
  }

  deleteUser(_id: any) {
    return this.db.doc(`${this.collection}/${_id}`).delete();
  }




}
