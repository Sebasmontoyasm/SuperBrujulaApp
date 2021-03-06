import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import firebase from "firebase/app";

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$:Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }
  async loginGoogle(): Promise<User> {
    try{
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }catch(error){
      console.log('Error-->',error);
    }
  }
  
  async loginMicrosoft(): Promise<User> {
    try{
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com')); // Dude
      this.updateUserData(user);
      return user;
    }catch(error){
      console.log('Error-->',error);
    }
  }

  async logout(): Promise<void> {
    try{
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error-->',error);
    }
  } 

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    console.log("Problem here",user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data,{merge: true});
  }

  
    

}

