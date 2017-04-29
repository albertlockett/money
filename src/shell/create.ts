/**
 * Collect information about how many dollars was the transaction
 */

import { argv } from 'yargs';
import * as moment from 'moment';
import { close, open, prompt, stringifyEnum } from './util';
import { create } from '../data/transaction-dao';
import Transaction from '../model/transaction';
import TransactionType from '../model/transaction-type';
import TransactionSubtype from '../model/transaction-subtype';

async function collectAmount(): Promise<number> {
  let amountStr
  if(argv.a || argv.amount) {
    // collect amount from argument
    amountStr = argv.a || argv.amount;
  } else {
    // prompt user for amount
    amountStr = await prompt('How much was the amount? ');
  }

  // TODO validate input
  return Number(amountStr);
}


/**
 * Collect information from the user about the date the transaction took place
 */
async function collectDate(): Promise<Date> {
  let format = `YYYY-MM-DD`;

  // check if the date was today
  if(argv.t || argv.today) {
    return new Date();
  }

  // check if the date was yesterday
  if(argv.y || argv.yesterday) {
    return moment().subtract(1, 'days').toDate();
  }

  // check if the date was provided as an offset
  if(argv.d || argv.day) {
    const offset = Number(argv.d || argv.day);// TODO validate input
    return moment().add(offset, 'days').toDate();
  }

  // check if the date was provided as literal
  if(argv.D || argv.date) {
    const dateStr = argv.D || argv.date; // TODO validate input
    return moment(dateStr, format).toDate();
  }

  // prompt user to enter the date
  let dateStr = await prompt(`When did you spend it (${format})? `);
  return moment(dateStr, format).toDate();
}


async function collectType(): Promise<TransactionType> {
  let text = `What type of transaction was it?` + '\n' +
              stringifyEnum(TransactionType)    + '\n';
  let typeStr = await prompt(text);
  return TransactionType[TransactionType[Number(typeStr)]];
}


async function collectSubtype():Promise<TransactionSubtype> {
  let text = `What type of subtype transaction was it?` + '\n' +
              '-1 - NONE\n' +
              stringifyEnum(TransactionSubtype)    + '\n';
  let subtypeStr = await prompt(text);
  return TransactionSubtype[TransactionSubtype[Number(subtypeStr)]];
}


async function createTransaction() {

  open(); // open prompt for reading data

  // collect transaction information
  const amount: number = await collectAmount();
  const date: Date = await collectDate();
  const type: TransactionType = await collectType();
  const subtype: TransactionSubtype = await collectSubtype();

  close(); // close prompt

  // save the transaction
  const transaction = new Transaction(amount, type, subtype, date);
  await create(transaction);
}

export default createTransaction;
