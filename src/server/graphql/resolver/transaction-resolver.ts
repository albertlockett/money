
import DaoFactory from '../../../data/dao-factory';
import Transaction from '../../../model/transaction';;

export const Query = {

  async transactions(root, args, context) {
    let dao = DaoFactory.getDao(Transaction);
    return await dao.findAll();
  }

}
