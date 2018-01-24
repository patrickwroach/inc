import React from 'react';
import { Button } from './button.jsx';
import { CharacterList } from './CharacterList.jsx'
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { SingleNumberModalContainer } from '../containers/SingleNumberModalContainer.jsx';
import { Constants } from '../../other/Constants.js';

export class InitGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleGroup: 'inactive',
      toggleButtonText: 'Show Group',
			isNameEditModalOpen: false,
			isInitEditModalOpen: false,
      inputInit: this.props.init,
    };
    this.toggleGroup = this.toggleGroup.bind(this);
		this.toggleNameEdit = this.toggleNameEdit.bind(this);
    this.submitName =  this.submitName.bind(this);
		this.toggleInitEdit = this.toggleInitEdit.bind(this);
    this.submitInit =  this.submitInit.bind(this);
    this.handleRemoveInitGroup = this.handleRemoveInitGroup.bind(this);
  }
  toggleGroup() {
    if (this.state.toggleGroup == 'active') {
      this.setState({
        toggleGroup: 'inactive',
        toggleButtonText: 'Show Group'
      });
    } else {
      this.setState({
        toggleGroup: 'active',
        toggleButtonText: 'Hide Group'
      });
    }
  }
	
	toggleNameEdit() {
		this.setState({ isNameEditModalOpen: !this.state.isNameEditModalOpen });
  }
	
	submitName(name) {
		this.props.handleEditName(this.props.id, name);
		this.toggleNameEdit();
  }
	
	toggleInitEdit() {
		this.setState({isInitEditModalOpen: !this.state.isInitEditModalOpen })
  }
	
  submitInit(initValue) {
    this.props.handleEditInit(this.props.id, initValue);
    this.toggleInitEdit();
  }
    
  handleRemoveInitGroup(){
    this.props.handleRemoveInitGroup(this.props.id);
  }
	
  render() {
    return (
      <ul id={this.props.id} className={'character' + ' ' + this.state.toggleGroup + ' ' + this.props.type + ' index'+ this.props.initPosition}> 
        <div className="group-name-bar">
          <Button text="&#10006;" addClass="remove " onClick={() => this.handleRemoveInitGroup()} />
          <div className="char-name">
            <h1>{this.props.name}<span className="edit-pen" onClick={this.toggleNameEdit}>{String.fromCharCode(9999)}</span></h1>
          </div>
          <div className="button-container">
            <Button text={this.state.toggleButtonText} id="expand" onClick={() => this.toggleGroup()} />
          </div>     
        </div>
        <h3 className="init-number">Init: {this.props.init}<span className="edit-pen" onClick={() => this.toggleInitEdit()}>{String.fromCharCode(9999)}</span></h3>  
        
        <CharacterList
          characters={this.props.charArray}
          handleAddHp={this.props.handleAddHp}
          handleEditName={this.props.handleEditCharName}
          handleRemoveCharacter={this.props.handleRemoveCharacter}
          handleRemoveInitGroup={this.props.handleRemoveInitGroup}
          handleToggleNameEdit={this.toggleNameEdit}
          handleStartRound={this.props.handleStartRound}
          initPosition={this.props.initPosition}
        />
				
				<SingleTextModalContainer
					isOpen = {this.state.isNameEditModalOpen}
					toggle = {this.toggleNameEdit}
					onSubmit = {this.submitName}
					labelText = {Constants.editNameLabelString}
					inputValue = {this.props.name}
					buttonText = {Constants.editNameButtonString}
				/>
          
        <SingleNumberModalContainer
          isOpen = {this.state.isInitEditModalOpen}
          toggle = {this.toggleInitEdit}
          onSubmit = {this.submitInit}
          labelText = {Constants.editInitLabelString}
          inputValue = {this.props.init}
          buttonText = {Constants.editInitButtonString}
        />
      </ul>
    );
  }
}


