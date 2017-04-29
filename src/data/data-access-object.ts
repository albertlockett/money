import { DB_CXN_STRING } from '../config/config';
import { MongoClient } from 'mongodb';
import Model from '../model/model';

export class DataAccessObject<T extends Model> {
  COLLECTION_NAME: string

  constructor(collectionName: string) {
    this.COLLECTION_NAME = collectionName;
  }

  async findAll(filter?: object): Promise<T[]> {
    let db = await MongoClient.connect(DB_CXN_STRING);
    let transactions = await db.collection(this.COLLECTION_NAME)
      .find().toArray();
    db.close();
    return transactions;
  }

  async create(model: T): Promise<void> {
    let db = await MongoClient.connect(DB_CXN_STRING);
    await db.collection(this.COLLECTION_NAME).insert(model);
    db.close();
  };
};

export default DataAccessObject;
