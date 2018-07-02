import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

import io from "socket.io-client";
import CredentialStore from "../stores/CredentialStore";
import MessageStore from "../stores/MessageStore";
import WorkerService from "../services/WorkerService";

class Control extends Component {
  constructor(props) {
    super(props);

    this.unsubscribeToToken = null;
    this.unsubscribeToSecret = null;

    this.state = {
      token: props.credentialStore.getToken(),
      secret: props.credentialStore.getSecret(),
      socket: io(this.props.workerService.getBaseUrl())
    };

    this.listenToMessages = this.listenToMessages.bind(this);
    this.validateAndSend = this.validateAndSend.bind(this);
  }

  componentDidMount() {
    this.unsubscribeToToken = this.props.credentialStore.subscribeToToken((token) => {
      this.setState((prevState, props) => Object.assign(prevState, {token}));
    });
    this.unsubscribeToSecret = this.props.credentialStore.subscribeToSecret((secret) => {
      this.setState((prevState, props) => Object.assign(prevState, {secret}));
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeToToken) {
      this.unsubscribeToToken();
    }
    if (this.unsubscribeToSecret) {
      this.unsubscribeToSecret();
    }
  }

  listenToMessages() {
    if (!this.state.socket.hasListeners(this.state.token)) {
      this.state.socket.on(this.state.token, (data) => {
        const message = data.toString("utf-8");
        this.props.messageStore.publishMessage(message);
      });
    }
  }

  validateAndSend(callback) {
    return ((event, data) => {
      if (this.state.token.length === 32 && this.state.secret) {
        this.listenToMessages();
        callback(this.state.token, this.state.secret);
      }
    });
  }

  render() {
    return (
      <Button.Group fluid>
        <Button type="submit"
                primary
                content="Submit"
                disabled={this.state.token.length !== 32 || !this.state.secret}
                onClick={this.validateAndSend(this.props.workerService.serve)}/>
        <Button.Or/>
        <Button type="submit"
                color="red"
                content="Stop"
                disabled={this.state.token.length !== 32 || !this.state.secret}
                onClick={this.validateAndSend(this.props.workerService.stop)}/>
        <Button.Or/>
        <Button type="submit"
                color="green"
                content="Register"
                disabled={this.state.token.length !== 32 || !this.state.secret}
                onClick={this.validateAndSend(this.props.workerService.register)}/>
      </Button.Group>
    );
  }
}

Control.propTypes = {
  credentialStore: PropTypes.instanceOf(CredentialStore).isRequired,
  workerService: PropTypes.instanceOf(WorkerService).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired
};

export default Control;
