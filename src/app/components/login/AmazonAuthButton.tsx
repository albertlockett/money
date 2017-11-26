import * as React from 'react';


const UNPRESSED_URL = "http://g-ecx.images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png";
export class AmazonAuthButton extends React.Component<{}, {}> {

  render() {
    return (
      <a href="/auth/amazon">
        <img src={UNPRESSED_URL} height={32} width={156} />
      </a>
    );
  }

}