import Model from './model';

export class User extends Model {
  public username: string;
  public hashedPassword: string;
}

export default User;
