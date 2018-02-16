import React from 'react';
import { Button } from './button.jsx';
import { AliveToggleButton } from './AliveToggleButton.jsx';
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { HitPointsContainer } from '../containers/HitPointsContainer.jsx';
import { Constants } from '../../other/Constants.js';
import { InitGroupStore } from '../../data/InitGroupStore.js';

export class Character extends React.Component {
  render() {
    var charNameDisplay = null;
    if (this.props.id === 'new-round') {
      const currentRound = this.props.currentRound;
      var nextRound = currentRound + 1;
      if (this.props.initPosition === 0) {
        charNameDisplay = (
          <div className="char-name">
            <h1>
              <Button id="start-round-button" text={currentRound > 0 ? Constants.startRoundButtonString + " " + nextRound : Constants.startEncounterButtonString} onClick={this.props.handleStartRound} />
            </h1>
          </div>
        );
      } else {
        charNameDisplay = (
        <div className="char-name">
          <Button text="&#10006;" addClass="remove " onClick={this.props.handleRemoveCharacter} />
          <h1>
            {this.props.name + " " + nextRound}
            <span className="edit-pen" onClick={this.props.toggleNameEdit}>{String.fromCharCode(9999)}</span>
          </h1>
        </div>
        );
      }
    } else {
      charNameDisplay = (
        <div className="char-name">
          <Button text="&#10006;" addClass="remove " onClick={this.props.handleRemoveCharacter} />
          <h1>
            {this.props.name}
            <span className="edit-pen" onClick={this.props.toggleNameEdit}>{String.fromCharCode(9999)}</span>
          </h1>
        </div>
      );
    }

    return (
      <div className={`char-bar${this.props.hp <= 0 ? ' dead' : ' alive'}`}>
        {charNameDisplay}
        
        <AliveToggleButton
          isAlive={this.props.hp <= 0}
          toggleAliveDead={this.props.toggleAliveDead}
        />

        <HitPointsContainer
          hp={this.props.hp}
          hpMax={this.props.hpMax}
          handleAddHp={this.props.handleAddHp}
        />

        <SingleTextModalContainer
          isOpen={this.props.isNameEditModalOpen}
          toggle={this.props.toggleNameEdit}
          onSubmit={this.props.handleSubmitName}
          labelText={Constants.editNameLabelString}
          inputValue={this.props.name}
          buttonText={Constants.editNameButtonString}
        />
      </div>
    );
  }
}


