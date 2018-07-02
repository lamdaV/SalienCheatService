import React, { Component } from "react";
import { Accordion, Icon, List } from "semantic-ui-react";

class InstructionAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: -1
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, {index}) {
    const activeIndex = (this.state.activeIndex === index) ? -1 : index;
    this.setState((prevState, props) => Object.assign(prevState, {activeIndex}));
  }

  render() {
    const steamLogin = "https://store.steampowered.com/login/"
      + "?redir=&redir_ssl=1";
    const steamDB = "https://steamcommunity.com/groups/SteamDB";
    const steamToken = "https://steamcommunity.com/saliengame/gettoken";
    const repo = "https://github.com/lamdaV/SalienCheatService";

    return (
      <Accordion styled
                 fluid>
        <Accordion.Title active={this.state.activeIndex === 0}
                         index={0}
                         onClick={this.handleClick}>
          <Icon name="dropdown"/>
          Getting Started
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <List ordered>
            <List.Item>
              Login to &nbsp;
              <a href={steamLogin}
                 rel="noopener noreferrer"
                 target="_blank">
                 Steam
              </a>.
            </List.Item>
            <List.Item>
              Join &nbsp;
              <a href={steamDB}
                 rel="noopener noreferrer"
                 target="_blank">
                 SteamDB
               </a>
               &nbsp; to represent captures.
            </List.Item>
            <List.Item>
              Get your token &nbsp;
              <a href={steamToken}
                 rel="noopener noreferrer"
                 target="_blank">
                 here
              </a>.
              Copy and paste your token in the "Steam Token" input field along
              with the "Server Secret".
            </List.Item>
          </List>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 1}
                         index={1}
                         onClick={this.handleClick}>
          <Icon name="dropdown"/>
          Updating
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 1}>
          <List ordered>
            <List.Item>Enter your credentials.</List.Item>
            <List.Item>Click "Stop."</List.Item>
            <List.Item>
                Click "Start." If the server maintainer has updated SalienCheat,
                your new bot process will now be running the latest version
                of SalienCheat.
            </List.Item>
          </List>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 2}
                         index={2}
                         onClick={this.handleClick}>
          <Icon name="dropdown"/>
          Returning to the site after starting bot?
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 2}>
          <p>
            Enter your credentials and your existing bot feed will resume
            streaming to your webpage.
          </p>
        </Accordion.Content>

        <Accordion.Title active={this.state.activeIndex === 3}
                         index={3}
                         onClick={this.handleClick}>
          <Icon name="dropdown"/>
          Contribute, Bug, or Suggestion?
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 3}>
          <p>
            Visit the &nbsp;
            <a href={repo}
               rel="noopener noreferrer"
               target="_blank">
               GitHub
            </a>.
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default InstructionAccordion;
