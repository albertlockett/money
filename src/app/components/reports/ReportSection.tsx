import * as React from 'react';
import { TotalTransactions } from './TotalTransactions';

export class ReportSection extends React.Component {

  public render() {
    return (
     <div className="report-section">
       <TotalTransactions />
      </div> 
    );
  }

}
