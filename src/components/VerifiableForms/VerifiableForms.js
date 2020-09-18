import React, { Component } from 'react';
import VerifiableCredentialForm from './VerifiableCredentialForm';
import VerifiablePresentationForm from './VerifiablePresentationForm';

class VerifiableForms extends Component {
  state = {
    vc: null
  }

  setVC = (vc) => {
    this.setState({ vc });
  }

  render() {
    const { vc } = this.state

    return (
      <>
        <VerifiableCredentialForm setVC={this.setVC} />
        { vc ? <VerifiablePresentationForm vc={vc} /> : null }
      </>
    )
  }
}

export default VerifiableForms;
