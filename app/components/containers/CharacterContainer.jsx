import React from 'react';
import { Character } from '../presentational/Character.jsx';

export class CharacterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNameEditModalOpen: false
    };
     
    this.handleAddHp =  this.handleAddHp.bind(this);
    this.toggleNameEdit = this.toggleNameEdit.bind(this);
    this.submitName =  this.submitName.bind(this);
    this.handleRemoveCharacter = this.handleRemoveCharacter.bind(this);
    this.toggleAliveDead = this.toggleAliveDead.bind(this);
  }
	
  toggleNameEdit() {
    this.setState({ isNameEditModalOpen: !this.state.isNameEditModalOpen });
  }
	
  submitName(name) {
    this.props.handleEditName(this.props.id, name);
    this.toggleNameEdit();
  }
	
  handleRemoveCharacter(){
    this.props.handleRemoveCharacter(this.props.id, this.props.initGroupId);
  }

  toggleAliveDead() {
    if (this.props.hp >= 1) {
      const currentAmount = this.props.hp * -1;
      this.props.handleAddHp(this.props.id, currentAmount);          
    } else {
      const currentAmount = (this.props.hp * -1) + 1;
      this.props.handleAddHp(this.props.id, currentAmount);
    }
  }

  handleAddHp(amount) {
    const currentAmount = amount;
    this.props.handleAddHp(this.props.id, currentAmount);
  }
  
  render() {
    return (
      <Character
        id = {this.props.id}
        initPosition = {this.props.initPosition}
        name = {this.props.name}
        currentRound={this.props.currentRound}
        hp = {this.props.hp}
        hpMax = {this.props.hpMax}
        inputHp = {this.state.inputHp}
        handleStartRound = {this.props.handleStartRound}
        handleRemoveCharacter = {this.handleRemoveCharacter}
        toggleNameEdit = {this.toggleNameEdit}
        toggleAliveDead = {this.toggleAliveDead}
        handleAddHp = {this.handleAddHp}
        handleInputHp = {this.handleInputHp}
        isNameEditModalOpen = {this.state.isNameEditModalOpen}
        handleSubmitName = {this.submitName}
      />
    );
  }
}