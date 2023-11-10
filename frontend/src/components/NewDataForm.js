import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    pk: 0,
    data: ""
  };

  componentDidMount() {
    if (this.props.data) {
      const { pk, data } = this.props.data;
      this.setState({ pk, data });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  generateForm = () => {
    
  }
 
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
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewDataForm;
