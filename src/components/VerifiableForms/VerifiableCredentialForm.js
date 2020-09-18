import React, { Component } from 'react';
import verifiableCredentialService from '../../services/VerifiableCredentialService';
import View from './View';

class VerifiableCredentialForm extends Component {
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
        default_value: 'VerifiableCredential'
      },
      {
        name: 'contextEmailAddress',
        type: 'text',
        default_value: 'test@email.com'
      },
      {
        name: 'contextAlumniOf',
        type: 'text',
        default_value: 'Dock'
      },
      {
        name: 'subjectId',
        type: 'text',
        default_value: 'Test Subject'
      },
      {
        name: 'subjectEmailAddress',
        type: 'text',
        default_value: 'test@email.com'
      },
      {
        name: 'subjectAlumniOf',
        type: 'text',
        default_value: 'Dock'
      },
      {
        name: 'statusId',
        type: 'text',
        default_value: 'https://example.edu/status/24'
      },
      {
        name: 'statusType',
        type: 'text',
        default_value: 'CredentialStatusList2017'
      },
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

    const vcData = {
      id: data.id,
      type: [data.type],
      context: [
        {
          alumniOf: data.contextAlumniOf,
          emailAddress: data.contextEmailAddress,
        },
      ],
      subject: {
        id: data.subjectId,
        alumniOf: data.subjectAlumniOf,
        emailAddress: data.subjectEmailAddress,
      },
      status: {
        id: data.statusId,
        type: data.statusType,
      }
    }

    const credentials = verifiableCredentialService.create(vcData);
    this.setState({ credentials: credentials.toJSON() });

    this.props.setVC(credentials);
  }

  render() {
    return (
      <View
        formName="Credentials"
        credentials={this.state.credentials}
        formValues={this.state.data}
        fields={this.fields}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
      />
    )
  }
};

export default VerifiableCredentialForm;
