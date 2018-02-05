import React from 'react';
import { InitGroup } from '../presentational/InitGroup.jsx';

export class InitGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayGroup: 'inactive',
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
    if (this.state.displayGroup == 'active') {
      this.setState({
        displayGroup: 'inactive',
        toggleButtonText: 'Show Group'
      });
    } else {
      this.setState({
        displayGroup: 'active',
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
      <InitGroup
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        init={this.props.init}
        initPosition={this.props.initPosition}
        characters={this.props.characters}
        currentRound={this.props.currentRound}
        handleRemoveInitGroup={this.handleRemoveInitGroup}
        handleAddHp={this.props.handleAddHp}
        handleEditCharName={this.props.handleEditCharName}
        handleRemoveCharacter={this.props.handleRemoveCharacter}
        handleToggleNameEdit={this.toggleNameEdit}
        handleStartRound={this.props.handleStartRound}
        handleSubmitName={this.submitName}
        handleSubmitInit={this.submitInit}
        isNameEditModalOpen={this.state.isNameEditModalOpen}
        isInitEditModalOpen={this.state.isInitEditModalOpen}
        displayGroup={this.state.displayGroup}
        toggleGroup={this.toggleGroup}
        toggleNameEdit={this.toggleNameEdit}
        toggleInitEdit={this.toggleInitEdit}
        toggleButtonText={this.state.toggleButtonText}
      />
    );
  }
}