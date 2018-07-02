import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Header } from "semantic-ui-react";

import Credential from "./Credential";
import MessageLimitSelector from "./MessageLimitSelector";
import Control from "./Control";
import ErrorMessage from "./ErrorMessage";

import CredentialStore from "../stores/CredentialStore";
import MessageStore from "../stores/MessageStore";
import WorkerService from "../services/WorkerService";

class ConfigurationForm extends Component {
  render() {
    return (
      <div>
        <Header content="Configuration"
          textAlign="left"/>
        <Form>
          <Credential credentialStore={this.props.credentialStore}/>
          <MessageLimitSelector messageStore={this.props.messageStore}/>
          <Control credentialStore={this.props.credentialStore}
                   workerService={this.props.workerService}
                   messageStore={this.props.messageStore}/>
          <ErrorMessage workerService={this.props.workerService}/>
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
