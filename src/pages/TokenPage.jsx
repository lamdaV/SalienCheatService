import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";

import TokenForm from "../components/TokenForm";
import InstructionAccordion from "../components/InstructionAccordion";


class TokenPage extends Component {
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
            <Header content="FAQs"
                    textAlign="left"/>
            <InstructionAccordion/>
          </Segment>
          <Segment>
            <TokenForm worker={process.env.REACT_APP_BACKEND_URL}/>
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default TokenPage;
