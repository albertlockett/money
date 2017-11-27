import { TypeResolver } from './type-resolver';
import DaoFactory from '../../../data/dao-factory';
import { User } from '../../../model/user';
import { hash } from '../../../util/password-util';

export const mutation = {

  async createUser(root, args, context) {

    let { username, password, confirmPassword } = args;

    // validate arguments
    if(!username) { throw new Error('username is required'); }
    if(!password) { throw new Error('password is required'); }
    if(!confirmPassword) { throw new Error('confirmPassword is required'); }

    const okLength = password.length >= 6;
    const okNumber = password.match(/[0-9]/);
    const okLetter = password.match(/[a-zA-Z]/);
    if(!okLength || !okNumber || !okLetter) {
      throw new Error('invalid password');
    }

    // check if a user with this username already exists
    const userDao = DaoFactory.getDao(User);
    const result = await userDao.find({ username });
    if(result) {
      throw new Error(`user with username '${username}' already exists`);
    }

    // save new user
    const hashedPassword = await hash(password);
    await userDao.create({ username, hashedPassword });
    return { username };
  }

};

export const userResolver: TypeResolver = {
  propertyResolvers: {},
  query: {},
  mutation
};
