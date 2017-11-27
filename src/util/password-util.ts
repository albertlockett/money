import * as bcrypt from 'bcrypt';

const saltRounds = 10;


export const compare: (
  password: string, hashedPassword: string
) => Promise<boolean> = (password, hashedPassword) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err: Error, result: boolean) => {
      if(err) { reject(err); }
      resolve(result);
    });
  });
  
};

export const hash: (password: string) => Promise<String> = (password) => {

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) {
        reject(err);
      }

      // tslint:disable-next-line:no-shadowed-variable
      bcrypt.hash(password, salt, function(err, hashedPassword) {
        if(err) {
          reject(err);
        }
        resolve(hashedPassword);
      });
    });
  });

};



