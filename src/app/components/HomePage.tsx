import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { ReportSection } from './Reports/ReportSection';

export class HomePage extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <ReportSection />
      </div>

    );
  }
}