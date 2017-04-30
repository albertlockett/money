import { DB_CXN_STRING } from '../config/config';
import { MongoClient } from 'mongodb';
import Model from '../model/model';

export class DataAccessObject<T extends Model> {
  private COLLECTION_NAME: string;

  constructor(collectionName: string) {
    this.COLLECTION_NAME = collectionName;
  }

  public async findAll(filter?: object): Promise<T[]> {
    let db = await MongoClient.connect(DB_CXN_STRING);
    let results = await db.collection(this.COLLECTION_NAME).find().toArray();
    db.close();
    return results;
  }

  public async find(filter?: object): Promise<T> {
    let db = await MongoClient.connect(DB_CXN_STRING);
    let result = await db.collection(this.COLLECTION_NAME).findOne();
    db.close();
    return result;
  }

  public async create(model: T): Promise<void> {
    let db = await MongoClient.connect(DB_CXN_STRING);
    await db.collection(this.COLLECTION_NAME).insert(model);
    db.close();
  }
}

export default DataAccessObject;
