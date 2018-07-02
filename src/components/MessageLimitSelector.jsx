import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import MessageStore from "../stores/MessageStore";

class MessageLimitSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: props.messageStore.getLimit()
    };

    this.handleMessageLimit = this.handleMessageLimit.bind(this);
  };

  handleMessageLimit(event, {value}) {
    const limit = value;
    this.props.messageStore.setLimit(limit);
    this.setState((prevState, props) => Object.assign(prevState, {limit}));
  }

  render() {
    return (
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
    );
  }
}

MessageLimitSelector.propTypes = {
  messageStore: PropTypes.instanceOf(MessageStore).isRequired
};

export default MessageLimitSelector;
