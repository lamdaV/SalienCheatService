import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";

import TokenForm from "../components/TokenForm";

class TokenPage extends Component {
  render() {
    const segmentStyle = {
      marginTop: "50px"
    };
    return (
      <Container>
        <Segment style={segmentStyle}>
          <Header content="Salien Cheat Service"
                  textAlign="center"/>
          <TokenForm worker="http://localhost:8181"/>
        </Segment>
      </Container>
    );
  }
}

export default TokenPage;
