import React from 'react';
import { CharacterList } from './CharacterList.jsx'
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { SingleNumberModalContainer } from '../containers/SingleNumberModalContainer.jsx';
import { NameBar } from './NameBar.jsx';
import { InitBar } from './InitBar.jsx';
import { Constants } from '../../other/Constants.js';

export class InitGroup extends React.Component {
  render() {
    return (
      <ul id={this.props.id} className={'character' + ' ' + this.props.displayGroup + ' ' + this.props.type + ' index'+ this.props.initPosition}>
        <NameBar
          handleRemoveInitGroup={this.props.handleRemoveInitGroup}
          name={this.props.name}
          toggleNameEdit={this.props.toggleNameEdit}
          toggleButtonText={this.props.toggleButtonText}
          toggleGroup={this.props.toggleGroup}
        />
        
        <InitBar
          init={this.props.init}
          toggleInitEdit={this.props.toggleInitEdit}
        />
        
        <CharacterList
          initGroupId={this.props.id}
          characters={this.props.characters}
          currentRound={this.props.currentRound}
          handleAddHp={this.props.handleAddHp}
          handleEditName={this.props.handleEditCharName}
          handleRemoveCharacter={this.props.handleRemoveCharacter}
          handleRemoveInitGroup={this.props.handleRemoveInitGroup}
          handleToggleNameEdit={this.props.handleToggleNameEdit}
          handleStartRound={this.props.handleStartRound}
          initPosition={this.props.initPosition}
        />
				
				<SingleTextModalContainer
					isOpen = {this.props.isNameEditModalOpen}
					toggle = {this.props.toggleNameEdit}
					onSubmit = {this.props.handleSubmitName}
					labelText = {Constants.editNameLabelString}
					inputValue = {this.props.name}
					buttonText = {Constants.editNameButtonString}
				/>
          
        <SingleNumberModalContainer
          isOpen = {this.props.isInitEditModalOpen}
          toggle = {this.props.toggleInitEdit}
          onSubmit = {this.props.handleSubmitInit}
          labelText = {Constants.initLabelString}
          inputValue = {this.props.init}
          buttonText = {Constants.editInitButtonString}
        />
      </ul>
    );
  }
}