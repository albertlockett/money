import * as _ from 'lodash';
import { DB_CXN_STRING } from '../config/config';
import { MongoClient } from 'mongodb';
import Model from '../model/model';

export class DataAccessObject<T extends Model> {
  private _COLLECTION_NAME: string;

  constructor(collectionName: string) {
    this._COLLECTION_NAME = collectionName;
  }

  public async findAll(filter?: object): Promise<T[]> {
    const db = await MongoClient.connect(DB_CXN_STRING);
    let results = await db.collection(this._COLLECTION_NAME).find().toArray();
    db.close();
    return results;
  }

  public async find(filter?: object): Promise<T> {
    const db = await MongoClient.connect(DB_CXN_STRING);
    let result = await db.collection(this._COLLECTION_NAME).findOne(filter);
    db.close();
    return result;
  }

  public async create(model: T): Promise<void> {
    const db = await MongoClient.connect(DB_CXN_STRING);
    await db.collection(this._COLLECTION_NAME).insert(model);
    db.close();
  }

  public async update(model: T): Promise<void> {
    let query = { _id: model._id };
    let values = _.omit(model, '_id');
    const db = await MongoClient.connect(DB_CXN_STRING);
    await db.collection(this._COLLECTION_NAME).update(query, values);
    db.close();
  }
}

export default DataAccessObject;
