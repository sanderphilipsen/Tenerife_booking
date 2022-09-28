
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  dbPath = '/Users/';

  constructor(protected db: AngularFireDatabase ) {
  }

  public GetAll(): AngularFireList<User> {
    return this.db.list(`${this.dbPath}`);
  }
}
