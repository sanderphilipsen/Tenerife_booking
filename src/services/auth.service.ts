import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Roles } from 'src/app/enums/roles';
import { map } from 'rxjs';
import { AuthenticatedUser } from 'src/app/models/authenticatedUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dbPath = '/Users/';
  users: AuthenticatedUser[] = [];
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    protected db: AngularFireDatabase
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });;

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get getRole() : Roles {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user)
      return Roles.NoAcces
    if (user.isAnonymous)
      return Roles.CalendarViewer
    if (!user.isAnonymous)
      return Roles.Admin
    return Roles.NoAcces
  }

  getUserRole(uid : string) : Roles {
    if (!uid )
      return Roles.NoAcces;

    if (this.users.length == 0 )
      return Roles.NoAcces;

    var role = this.users.filter(x => x.Uid == uid)[0].Role;

    if (!role)
      return Roles.NoAcces;

    return role;
  }
  getUsers() : AngularFireList<AuthenticatedUser>{
  return this.db.list(`${this.dbPath}`)
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    var role = this.getRole;
    console.log(role);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: role == Roles.Admin ? false : true
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
