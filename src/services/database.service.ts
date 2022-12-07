
import { Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { MayHaveKey } from 'src/app/interfaces/mayHaveKey';
import { environment } from 'src/environments/environment';
import { IDatabaseService } from './interfaces/iDatabase.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DatabaseService<T extends MayHaveKey> implements IDatabaseService<T> {

  abstract dbPath: string;
  devTables = '';

  constructor(protected db: AngularFireDatabase ) {
    if (!environment.production){
        this.devTables = "DEVELOPMENT/";
    }
  }

  public GetAll(): AngularFireList<T> {
    return this.db.list(`${this.devTables + this.dbPath}`);
  }
  public GetByKey(key: string): AngularFireObject<T> {
    return this.db.object(`${this.devTables}${this.dbPath}/${key}`);
  }

  public Insert (object: T) : void {
    this.db.list(this.devTables + this.dbPath).push(object);
  }

  public Delete(object: T) {
    if (object.key == null)
      return;

    this.db.list(this.devTables + this.dbPath).remove(object.key);
  }

  public Update(object: T) : void {
    if (object.key == null)
      return;
    this.db.list(this.devTables + this.dbPath).update(object.key, object);
  }
}

