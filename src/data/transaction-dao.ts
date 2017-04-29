import { MongoClient } from 'mongodb';
import { DB_CXN_STRING } from '../config/config';
import Transaction from '../model/transaction';

/*
interface UserFindParams  {
  _id?: number,
  username?: string
};

export async function find(id: number) : Promise<Transaction>;
export async function find(username: string): Promise<Transaction>;
export async function find(param: any) : Promise<Transaction> {
  let db = await MongoClient.connect('mongodb://localhost:27017/sticker');
  let params: UserFindParams = { };
  if(typeof param === 'number') params._id = param;
  if (typeof param === 'string') params.username =  param;
  return await db.collection('Users').findOne(params);
}
*/

export async function create(transaction: Transaction): Promise<void> {
  let db = await MongoClient.connect(DB_CXN_STRING);
  await db.collection('Transactions').insert(transaction);
  db.close();
};
