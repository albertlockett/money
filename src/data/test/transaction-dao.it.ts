import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { MongoClient } from 'mongodb';
import { DB_CXN_STRING } from '../../config/config';
import Transaction from '../../model/transaction';
import TransactionTypes from '../../model/transaction-type';
import TransactionSubtypes from '../../model/transaction-subtype';
import { create } from '../transaction-dao';

describe('(DAO) TransactionDao', function() {

  describe('create', function() {

    beforeEach(async function() {
      let db = await MongoClient.connect(DB_CXN_STRING);
      await db.collection('Transactions').remove();
    });


    afterEach(async function() {
      let db = await MongoClient.connect(DB_CXN_STRING);
      await db.collection('Transactions').remove();
    });


    it('can create a transaction', async function() {
      let transaction = new Transaction(19.99, TransactionTypes.FOOD,
          TransactionSubtypes.RESTAURANT);
      await create(transaction);
      let db = await MongoClient.connect(DB_CXN_STRING);
      let transactions = await db.collection('Transactions').find().toArray();
      expect(transactions).to.have.length(1);
    });

  });


});
