import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Statistic } from 'semantic-ui-react';


export class TotalTransactions extends React.Component {

  public render() {
    return (
      <Statistic className="total-transactions-report">
        <Statistic.Value>0</Statistic.Value>
        <Statistic.Label>
          <label>Transactions This Month</label>
          <Link to="/transactions/create">
            <Icon name="plus" />
          </Link>
          </Statistic.Label>
      </Statistic> 
    );
  }

}
