import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Segment } from "semantic-ui-react";
import MessageStore from "../stores/MessageStore";

class BotLog extends Component {
  constructor(props) {
    super(props);
    this.ender = null;
    this.unsubscribe = null;

    this.state = {
      messages: props.messageStore.getMessages()
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.messageStore.subscribeToMessages((messages) => {
      this.setState((prevState, props) => Object.assign(prevState, {messages}));
    });
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.ender) {
      this.ender.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  constructLogMessages(message, index) {
    return (
      <Message info
               key={`logmessage${index}`}
               size="mini"
               content={message}/>
    );
  }

  render() {
    const logStyle = {
      height: "400px",
      maxHeight: "400px",
      overflow: "auto"
    };
    const divEnderStyle = {
      float: "left",
      clear: "both"
    };

    return (
      <Segment.Group>
        <Segment content="Bot Logs"/>

        <Segment style={logStyle}>
          {this.state.messages.map(this.constructLogMessages)}
          <div style={divEnderStyle}
               ref={(element) => { this.ender = element; }}/>
        </Segment>

        <Segment inverted/>
      </Segment.Group>
    )
  }
}

BotLog.propTypes = {
  messageStore: PropTypes.instanceOf(MessageStore).isRequired
};

export default BotLog;
