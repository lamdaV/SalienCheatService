import React, { Component } from "react";
import { Button, Divider, Form, Message } from "semantic-ui-react";
import io from "socket.io-client";

import WorkerService from "../services/WorkerService";
import BotLog from "./BotLog";

class TokenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      secret: "",
      socket: null,
      error: null,
      messages: [],
      limit: 100
    };

    this.workerService = new WorkerService(props.worker);

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleSecretChange = this.handleSecretChange.bind(this);
    this.handleMessageLimit = this.handleMessageLimit.bind(this);
    this.subscribeToMessages = this.subscribeToMessages.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleTokenChange(event, {value}) {
    this.setState((prevState, props) => Object.assign(prevState, {token: value}));
  }

  handleSecretChange(event, {value}) {
    this.setState((prevState, props) => Object.assign(prevState, {secret: value}));
  }

  handleMessageLimit(event, {value}) {
    this.setState((prevState, props) => Object.assign(prevState, {limit: value}));
  }

  subscribeToMessages() {
    if (!this.state.socket.hasListeners(this.state.token)) {
      this.state.socket.on(this.state.token, (data) => {
        const messages = this.state.messages;
        messages.push(data.toString("utf-8"));
        this.setState((prevState, props) => Object.assign(prevState, {messages}));
      });
    }
  }

  handleResponse(response) {
    if (response.status === 200) {
      this.setState((prevState, props) => Object.assign(prevState, {error: null}));
    } else {
      this.setState((prevState, props) => Object.assign(prevState, {error: response.data}));
    }
  }

  handleError(error) {
    if (error.response) { // request was responded to.
      this.setState((prevState, props) => Object.assign(prevState, {error: error.response.data}));
    } else if (error.request) { // request was sent but not responded to.
      this.setState((prevState, props) => Object.assign(prevState, {error: error.request}));
    } else { // request was not sent.
      this.setState((prevState, props) => Object.assign(prevState, {error: error.message}));
    }
  }

  handleSubmit(event, data) {
    if (this.state.token.length === 32 && this.state.secret) {
      this.subscribeToMessages();
      this.workerService.serve(this.state.token, this.state.secret)
        .then(this.handleResponse)
        .catch(this.handleError);
    }
  }

  handleStop(event, data) {
    if (this.state.token.length === 32 && this.state.secret) {
      this.subscribeToMessages();
      this.workerService.stop(this.state.token, this.state.secret)
        .then(this.handleResponse)
        .catch(this.handleError)
    }
  }

  componentDidMount() {
    const socket = io("http://localhost:8181");
    this.setState((prevState, props) => Object.assign(prevState, {socket}));
  }

  componentWillUnmount() {
    this.state.socket.close();
    this.setState((prevState, props) => Object.assign(prevState, {socket: null}));
  }

  render() {
    return (
      <div>
        <Form error={this.state.error !== null}>
          <Form.Input placeholder="Steam Token"
                      type="text"
                      value={this.state.token}
                      onChange={this.handleTokenChange}
                      required/>
          <Form.Input placeholder="Server Secret"
                      type="password"
                      value={this.state.secret}
                      onChange={this.handleSecretChange}
                      required/>
          <Form.Group inline>
            <label>Message Limit: </label>
            <Form.Radio label="100"
                        value={100}
                        checked={this.state.limit === 100}
                        onChange={this.handleMessageLimit}/>
            <Form.Radio label="500"
                        value={500}
                        checked={this.state.limit === 500}
                        onChange={this.handleMessageLimit}/>
            <Form.Radio label="1000"
                        value={1000}
                        checked={this.state.limit === 1000}
                        onChange={this.handleMessageLimit}/>
          </Form.Group>
          <Button type="submit"
                  primary
                  fluid
                  content="Submit"
                  disabled={this.state.token.length !== 32 && !this.state.secret}
                  onClick={this.handleSubmit}/>
          <Button type="submit"
                  color="red"
                  fluid
                  content="Stop"
                  disabled={this.state.token.length !== 32 && !this.state.secret}
                  onClick={this.handleStop}/>
          <Message error
                   header="Error"
                   content={this.state.error}/>
        </Form>
        <Divider as="span"
                 clearing
                 horizontal
                 role="img"
                 aria-label="jsx-a11y/accessible-emoji"
                 content="🤖"/>
        <BotLog messages={this.state.messages}
                limit={this.state.limit}/>
      </div>
    );
  }
}

export default TokenForm;
