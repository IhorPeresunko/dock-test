import React, { Component } from 'react';
import verifiablePresentationService from '../../services/VerifiablePresentationService';
import View from './View';

class VerifiablePresentationForm extends Component {
  constructor(props) {
    super(props);

    this.fields = [
      {
        name: 'id',
        type: 'text',
        default_value: 'uuid:0x9b561796d3450eb2673fed26dd9c07192390177ad93e0835bc7a5fbb705d52bc'
      },
      {
        name: 'type',
        type: 'text',
        default_value: 'VerifiablePresentation'
      },
      {
        name: 'context',
        type: 'text',
        default_value: 'https://www.w3.org/2018/credentials/examples/v1'
      },
      {
        name: 'holder',
        type: 'text',
        default_value: 'https://example.com/credentials/1234567890'
      },
      {
        name: 'credential',
        type: 'text',
        default_value: this.props.vc.id,
      }
    ];

    this.state = {
      data: {},
      credentials: null,
    }

    for (const field of this.fields) {
      this.state.data[field.name] = field.default_value;
    }
  }

  // TODO: better to use a library for managing forms state.
  // But for the sake of simplicity I will create just this func
  handleInput = (field) => (data) => {
    const { value } = data.target;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [field]: value,
      }
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;

    // TODO: fields validation

    const vpData = {
      id: data.id,
      type: [data.type],
      context: data.context,
      holder: data.holder,
      credentials: this.props.vc,
    }

    const credentials = verifiablePresentationService.create(vpData);
    this.setState({ credentials })
  }

  render() {
    return (
      <View
        formName="Presentation"
        credentials={this.state.credentials}
        formValues={this.state.data}
        fields={this.fields}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
      />
    )
  }
};

export default VerifiablePresentationForm;
