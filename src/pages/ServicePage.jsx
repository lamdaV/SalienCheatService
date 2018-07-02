import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Header, Segment } from "semantic-ui-react";

import CredentialStore from "../stores/CredentialStore";
import MessageStore from "../stores/MessageStore";
import WorkerService from "../services/WorkerService";

import InstructionAccordion from "../components/InstructionAccordion";
import ConfigurationForm from "../components/ConfigurationForm";
import BotLog from "../components/BotLog";

class ServicePage extends Component {
  render() {
    const segmentStyle = {
      marginTop: "50px"
    };
    return (
      <Container>
        <Segment.Group style={segmentStyle}>
          <Segment>
            <Header content="Salien Cheat Service"
                    textAlign="center"/>
          </Segment>

          <Segment>
            <InstructionAccordion/>
          </Segment>

          <Segment>
            <ConfigurationForm credentialStore={this.props.credentialStore}
                               messageStore={this.props.messageStore}
                               workerService={this.props.workerService}/>
          </Segment>
          <Segment>
            <BotLog messageStore={this.props.messageStore}/>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

ServicePage.propTypes = {
  credentialStore: PropTypes.instanceOf(CredentialStore).isRequired,
  messageStore: PropTypes.instanceOf(MessageStore).isRequired,
  workerService: PropTypes.instanceOf(WorkerService).isRequired
};

export default ServicePage;
