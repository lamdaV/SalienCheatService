import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header, Message } from "semantic-ui-react";
import io from "socket.io-client";

import Credential from "./Credential";
import MessageLimitSelector from "./MessageLimitSelector";
import Control from "./Control";

import CredentialStore from "../stores/CredentialStore";
import MessageStore from "../stores/MessageStore";
import WorkerService from "../services/WorkerService";

class ConfigurationForm extends Component {
  constructor(props) {
    super(props);
    this.unsubscribeToError = null;
    this.unsubscribeToResponse = null;

    this.state = {
      socket: io(props.workerService.getBaseUrl()),
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
        this.setState((prevState, props) => Object.assign(prevState, {error: error.request}));
      } else { // request was not sent.
        this.setState((prevState, props) => Object.assign(prevState, {error: error.message}));
      }
    });
  }

  componentWillUnmount() {
    this.state.socket.close();
    this.setState((prevState, props) => Object.assign(prevState, {socket: null}));

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
      <div>
        <Header content="Configuration"
          textAlign="left"/>
        <Form>
          <Credential credentialStore={this.props.credentialStore}/>
          <MessageLimitSelector messageStore={this.props.messageStore}/>
          <Control socket={this.state.socket}
                   credentialStore={this.props.credentialStore}
                   workerService={this.props.workerService}
                   messageStore={this.props.messageStore}/>
          <Message error
                   hidden={this.state.error === null}
                   header="Error"
                   content={this.state.error}/>
        </Form>
      </div>
    );
  }
}

ConfigurationForm.propTypes = {
  credentialStore: PropTypes.instanceOf(CredentialStore).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
  workerService: PropTypes.instanceOf(WorkerService).isRequired
};

export default ConfigurationForm;
