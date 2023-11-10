import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    pk: 0,
    data: "",
    additionalInputs: [],
  };

  componentDidMount() {
    if (this.props.data) {
      const { pk, data } = this.props.data;
      this.setState({ pk, data });
    }
  }

  onChange = (e, index) => {
    if (index === undefined) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      const additionalInputs = [...this.state.additionalInputs];
      additionalInputs[index] = { ...additionalInputs[index], [e.target.name]: e.target.value };
      this.setState({ additionalInputs });
    }
  };

  createData = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editData = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  addAdditionalInput = () => {
    this.setState((prevState) => ({
      additionalInputs: [...prevState.additionalInputs, { additionalData: "" }],
    }));
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.data ? this.editData : this.createData}>
        <FormGroup>
          <Label for="data">Data:</Label>
          <Input
            type="text"
            name="data"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.data)}
          />
          {this.state.additionalInputs.map((input, index) => (
            <>
              <Label for="data">Data {index+1}:</Label>
              <Input
                key={index}
                type="text"
                name="additionalData"
                onChange={(e) => this.onChange(e, index)}
                value={this.defaultIfEmpty(input.additionalData)}
                />
              </>
          ))}
          <Button onClick={this.addAdditionalInput}>+</Button>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewDataForm;
