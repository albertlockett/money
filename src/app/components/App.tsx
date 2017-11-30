import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { Header } from './common/header';
import { HomePage } from './HomePage';

export class App  extends React.Component<{}, {}> {
  public render() {
    return (
      <Container>
        <Header />
        <HomePage />
      </Container>
    );
  }
}
