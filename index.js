import React, { Component, Fragment } from 'react';
import ReactDom, { render } from 'react-dom';
import { StackOverflowClass, StackOverflowSFC } from './StackOverflow';
import './style.css';
import { Button, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

const trace = (x) => {console.log('trace:', x); return x}


class MyForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    validationErrors: {}
  };

  validators = {
    firstName: (str) => str === '' ? 'Cannot be blank' : '',
    lastName: (str) => str === '' ? 'Cannot be blank' : '',
    email: (str) => !/.+@.+\..+/.test(str) ? 'Invalid email address' : ''
  }

  validate = (name) => {
    const value = this.state[name];
    let error = this.validators.hasOwnProperty(name) ? this.validators[name](value) : '';
    this.setState(({validationErrors}) => ({validationErrors: {...validationErrors, [name]: error}}));
    return error;
  }

  handleChange = (e) => {
    const fieldName = e.currentTarget.name;
    this.setState(
      { [fieldName]: e.currentTarget.value },
      () => this.validate(fieldName)
    );
  }

  onSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.keys(this.validators).map(this.validate).every((err) => !err);
    if (isValid) {
      // submit form
    }
  }

  render() {
    return (
      
      <form onSubmit={this.onSubmit}>
        <ValidatingFormGroup
          label='First name'
          fieldName='firstName'
          value={this.state.firstName}
          handleChange={this.handleChange}
          placeHolder='First Name'
          validationErrors={this.state.validationErrors}
        />
        <ValidatingFormGroup
          label='Last name'
          fieldName='lastName'
          value={this.state.lastName}
          handleChange={this.handleChange}
          placeHolder='Last Name'
          validationErrors={this.state.validationErrors}
        />
        <ValidatingFormGroup
          label='Email'
          fieldName='email'
          value={this.state.email}
          handleChange={this.handleChange}
          placeHolder='Email address'
          validationErrors={this.state.validationErrors}
        />
         <Button type="submit">Submit</Button>
      </form>    )
  }
}

const getValidationState = (validationErrors, name) =>  {
  const err = validationErrors[name];
  return typeof err === 'undefined' ? null : err === '' ? 'success' : 'error';
}

const ValidatingFormGroup = ({label, fieldName, value, handleChange, placeHolder, validationErrors}) =>
  <FormGroup
    validationState={getValidationState(validationErrors, fieldName)}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      type="text"
      name={fieldName}
      value={value}
      placeholder={placeHolder}
      onChange={handleChange}
    />
    <FormControl.Feedback />
    <HelpBlock>{validationErrors[fieldName]}</HelpBlock>
  </FormGroup>

class App extends Component {
  render() {
    return (
      <div>
        <h1>INFORMATION </h1>
        <MyForm/>
        <h3 style={{color:"red"}}>@hemareddy</h3>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
