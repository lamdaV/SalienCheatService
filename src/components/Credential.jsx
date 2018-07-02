import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import CredentialStore from "../stores/CredentialStore";

class Credential extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      secret: ""
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleSecretChange = this.handleSecretChange.bind(this);
  }

  handleTokenChange(event, {value}) {
    const token = value;
    this.props.credentialStore.publishToken(token);
    this.setState((prevState, props) => Object.assign(prevState, {token}));
  }

  handleSecretChange(event, {value}) {
    const secret = value;
    this.props.credentialStore.publishSecret(secret);
    this.setState((prevState, props) => Object.assign(prevState, {secret}));
  }

  render() {
    return (
      <Form.Group widths="equal">
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
      </Form.Group>
    );
  }
}

Credential.propTypes = {
  credentialStore: PropTypes.instanceOf(CredentialStore)
};

export default Credential;
