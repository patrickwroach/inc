import React from 'react';
import { Button } from './button.jsx';
import { CharacterList } from './CharacterList.jsx'
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { SingleNumberModalContainer } from '../containers/SingleNumberModalContainer.jsx';
import { Constants } from '../../other/Constants.js';

export class InitGroup extends React.Component {
  render() {
    return (
      <ul id={this.props.id} className={'character' + ' ' + this.props.displayGroup + ' ' + this.props.type + ' index'+ this.props.initPosition}> 
        <div className="group-name-bar">
          <Button text="&#10006;" addClass="remove " onClick={this.props.handleRemoveInitGroup} />
          <div className="char-name">
            <h1>{this.props.name}<span className="edit-pen" onClick={this.props.toggleNameEdit}>{String.fromCharCode(9999)}</span></h1>
          </div>
          <div className="button-container">
            <Button text={this.props.toggleButtonText} id="expand" onClick={this.props.toggleGroup} />
          </div>     
        </div>
        <h3 className="init-number">Init: {this.props.init}<span className="edit-pen" onClick={this.props.toggleInitEdit}>{String.fromCharCode(9999)}</span></h3>  
        
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
          labelText = {Constants.editInitLabelString}
          inputValue = {this.props.init}
          buttonText = {Constants.editInitButtonString}
        />
      </ul>
    );
  }
}