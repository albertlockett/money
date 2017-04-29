import { before } from 'mocha';
import { MongoClient } from 'mongodb';

async function setupDatabase() {
  let db = await MongoClient.connect('mongodb://localhost:27017/sticker');
  await db.collection('Users').remove({});
}
setupDatabase();

before(async function() {
  await setupDatabase();
});
