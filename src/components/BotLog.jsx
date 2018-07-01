import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Segment } from "semantic-ui-react";

class BotLog extends Component {
  constructor(props) {
    super(props);
    this.ender = null;
  }

  constructLogMessages(message, index) {
    return (
      <Message info
               key={`logmessage${index}`}
               size="mini"
               content={message}/>
    );
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.ender) {
      this.ender.scrollIntoView({ behavior: "smooth" });
    }
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

    let messages = this.props.messages;
    if (messages.length > this.props.limit) {
      messages = messages.slice(messages.length - this.props.limit, messages.length)
    }

    return (
      <Segment.Group>
        <Segment content="Bot Logs"/>

        <Segment style={logStyle}>
          {messages.map(this.constructLogMessages)}
          <div style={divEnderStyle}
               ref={(element) => { this.ender = element; }}/>
        </Segment>

        <Segment inverted/>
      </Segment.Group>
    )
  }
}

BotLog.defaultProps = {
  messages: [],
  limit: 100
};

BotLog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
  limit: Proptypes.number
};

export default BotLog;
