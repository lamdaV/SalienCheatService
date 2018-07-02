import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

import WorkerService from "../services/WorkerService";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);

    this.unsubscribeToResponse = null;
    this.unsubscribeToError = null;

    this.state = {
      error: null
    };
  }

  componentDidMount() {
    this.unsubscribeToResponse = this.props.workerService.subscribeToResponse((response) => {
      const error = (response.status === 200) ? null : response.data;
      this.setState((prevState, props) => Object.assign(prevState, {error}));
    });
    this.unsubscribeToError = this.props.workerService.subscribeToError((error) => {
      if (error.response) { // request was responded to.
        this.setState((prevState, props) => Object.assign(prevState, {error: error.response.data}));
      } else if (error.request) { // request was sent but not responded to.
        this.setState((prevState, props) => Object.assign(prevState, {error: "Server is not responding"}));
      } else { // request was not sent.
        this.setState((prevState, props) => Object.assign(prevState, {error: error.message}));
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeToError) {
      this.unsubscribeToError();
      this.unsubscribeToError = null;
    }
    if (this.unsubscribeToResponse) {
      this.unsubscribeToResponse();
      this.unsubscribeToResponse = null;
    }
  }

  render() {
    return (
      <Message error
               hidden={this.state.error === null}
               header="Error"
               content={this.state.error}/>
    );
  }
}

ErrorMessage.propTypes = {
  workerService: PropTypes.instanceOf(WorkerService)
};

export default ErrorMessage;
