import React from 'react';
import styled from 'styled-components';
import JSONPretty from 'react-json-pretty';

const View = ({ formName, formValues, fields, handleInput, handleSubmit, credentials }) => (
  <Wrapper onSubmit={handleSubmit}>
    <h2>Create {formName}</h2>
    {
      fields.map(({ name, type }) =>
        <Input
          type={type}
          key={name}
          onChange={handleInput(name)}
          placeholder={name}
          value={formValues[name]}
        />
      )
    }
    { credentials ? (
      <CredView>
        <JSONPretty data={credentials}></JSONPretty>
      </CredView>
    ) : null}
    <button>Create cred</button>
  </Wrapper>
);

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 800px;
  max-width: 100%;
  padding: 20px;
  margin: 20px;
  
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.16);

  h2 {
    margin: 0;
    font-size: 22px;
  }
  button {
    background: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }
`;
const Input = styled.input`
  display: block;
  width: calc(100% - 20px);
  padding: 5px 10px 5px 0;
  margin: 10px auto;
  border: none;
  border-bottom: 1px solid #ccc;

  font-size: 18px;
  

  &:focus {
    outline: none;
  }
`;
const CredView = styled.div``

export default View;
