import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewDataForm extends React.Component {
  state = {
    pk: 0,
    data: "",
    additionalInputs: [{}],
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

  isValidMail = (mail) => {
      const regex = /\S+@\S+\.\S+/;
      console.log(regex.test(mail));
      return regex.test(mail)
  }

  createData = e => {
    e.preventDefault();
    
    this.state.additionalInputs.forEach(element => {
      const payload = {
        pk: 0,
        data: element.additionalData
      }

        if(this.isValidMail(payload.data)){
      axios.post(API_URL, payload).then(() => {
        this.props.resetState();
      this.props.toggle();})}
      else{
        
      };

    }
    );
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
          {this.state.additionalInputs.map((input, index) => (
            <div key={index}>
              <Label for="data">Data {index + 1}:</Label>
              <Input
                key={index}
                type="text"
                name="additionalData"
                onChange={(e) => this.onChange(e, index)}
                value={this.defaultIfEmpty(input.additionalData)}
                />
            </div>
          ))}
          <Button onClick={this.addAdditionalInput} style={{marginTop: "1rem"}}>+</Button>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewDataForm;
