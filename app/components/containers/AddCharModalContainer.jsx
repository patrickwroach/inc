import React from 'react';
import { AddCharModal } from '../presentational/AddCharModal.jsx';
import { Constants } from '../../other/Constants.js';

export class AddCharModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: 'Unnamed',
      selectedType: 'PC',
      newHp: 1,
      newInit: 0,
      newAmount: 1,
      amountVis: false,
      hpVis: false,
    }

    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewPC = this.handleNewPC.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.handleNewNPC = this.handleNewNPC.bind(this);
    this.handleNewHp = this.handleNewHp.bind(this);
    this.handleNewAmount = this.handleNewAmount.bind(this);
    this.handleNewInit = this.handleNewInit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNewName(e) {
    const name = e.target.value;
    this.setState({ newName: name });
  }

  handleNewInit(e) {
    const init = parseInt(e.target.value);
    this.setState({ newInit: init });
  }

  handleNewHp(e) {
    const hp = parseInt(e.target.value);
    this.setState({ newHp: hp });
  }

  handleNewAmount(e) {
    const amount = parseInt(e.target.value);
    this.setState({ newAmount: amount });
  }

  handleNewPC() {
    this.setState({
      selectedType: 'PC',
      newAmount: 1,
      hpVis: false,
      amountVis: false
    });

    //Todo -reset here is clumsy
    document.getElementById("NPC-entries").reset();
    document.getElementById("Group-entries").reset();
  }
  handleNewNPC() {
    this.setState({
      selectedType: 'NPC',
      newAmount: 1,
      hpVis: true,
      amountVis: false
    });

    //Todo -reset here is clumsy
    document.getElementById("Group-entries").reset();
  }
  handleNewGroup() {
    this.setState({
      selectedType: 'Group',
      newAmount: 2,
      hpVis: true,
      amountVis: true
    });
  }

  handleKeyPress(e) {
    if (e.key == Constants.enterKey) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.onAddCharSubmit(
      this.state.newName,
      this.state.newInit,
      this.state.selectedType,
      this.state.newHp,
      this.state.newAmount
    );

    this.setState({
      newName: 'Unnamed',
      newHp: 1,
      newInit: 0
    });
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <AddCharModal
        selectedType={this.state.selectedType}
        amountVis={this.state.amountVis}
        hpVis={this.state.hpVis}
        handleNewAmount={this.handleNewAmount}
        handleKeyPress={this.handleKeyPress}
        handleNewHp={this.handleNewHp}
        handleNewName={this.handleNewName}
        handleNewInit={this.handleNewInit}
        handleNewPC={this.handleNewPC}
        handleNewNPC={this.handleNewNPC}
        handleNewGroup={this.handleNewGroup}
        handleSubmit={this.handleSubmit}
        toggleAddCharModal={this.props.toggleAddCharModal}
      />
    );
  }
}