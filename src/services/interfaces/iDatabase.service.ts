import { AngularFireList } from '@angular/fire/compat/database';
import { MayHaveKey } from 'src/app/interfaces/mayHaveKey';


export interface IDatabaseService<T extends MayHaveKey> {

  dbPath: string;
  GetAll() : AngularFireList<T>;
  Insert(object: T): void;
  Update(object: T) : void;
  Delete(object: T) : void;

}

