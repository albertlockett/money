import * as React from 'react';
import { Router, Route } from 'react-router';
import { Header as SemanticHeader, Grid } from 'semantic-ui-react';

export class Header extends React.Component<{}, {}> {

  public render() {
    return (
      <div className="app-header">
        <Grid verticalAlign="middle">
          <Grid.Column width={2}>
            <SemanticHeader className="app-title">Money App</SemanticHeader>
          </Grid.Column>
          <Grid.Column floated="right" className="logout-link">
            <a href="/logout">Logout</a>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}
