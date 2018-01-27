import React from 'react';
import Shortid from 'shortid';
import { InitGroupList } from './InitGroupList.jsx';
import { Button } from './button.jsx';
import { EndTurnButton } from './endTurnButton.jsx';
import { AddCharModalContainer } from '../containers/AddCharModalContainer.jsx';
import { ClearEncounterModal } from './ClearEncounterModal.jsx';
import { MessageModal } from './MessageModal.jsx';
import { Constants } from '../../other/Constants.js';
import { Helpers } from '../../other/Helpers.js';
import { InitGroupStore } from '../../data/InitGroupStore.js';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initGroups: InitGroupStore.getInitGroups(),
      characters: InitGroupStore.getCharacters(),
      isEndTurnDisplayed: false,
      isAddCharModalOpen: false,
      isClearEncounterModalOpen: false,
      round: 0,
      turns: 0,
      isMessageModalDisplayed: false,
      messageModalText: ""
    };

    this.addHp = this.addHp.bind(this);
    this.editCharName = this.editCharName.bind(this);
    this.editInitGroupName = this.editInitGroupName.bind(this);
    this.removeInitGroup = this.removeInitGroup.bind(this);
    this.removeCharacter = this.removeCharacter.bind(this);
    this.editInit = this.editInit.bind(this);
    this.addChar = this.addChar.bind(this);
    this.toggleAddCharModal = this.toggleAddCharModal.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.toggleClearEncounterModal = this.toggleClearEncounterModal.bind(this);
    this.clearNpcs = this.clearNpcs.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.updateInitGroupsAndCharacters = this.updateInitGroupsAndCharacters.bind(this);
  }

  addHp(charId, amount) {
    InitGroupStore.addHp(charId, amount);
  }

  editCharName(charId, newName) {
    InitGroupStore.editCharName(charId, newName);
  }

  editInitGroupName(initGroupId, newName) {
    InitGroupStore.editInitGroupName(initGroupId, newName);
  }

  removeCharacter(charId, initGroupId) {
    InitGroupStore.removeCharacter(charId, initGroupId);
  }

  removeInitGroup(initGroupId) {
    InitGroupStore.removeInitGroup(initGroupId);
  }

  editInit(initGroupId, newInit) {
    InitGroupStore.editInit(initGroupId, newInit);
  }

  toggleAddCharModal() {
    this.setState({ isAddCharModalOpen: !this.state.isAddCharModalOpen });
  }

  addChar(name, init, type, hp, amount) {
    InitGroupStore.addChar(name, init, type, hp, amount);

    this.setState({
      isAddCharModalOpen: false
    });

    document.getElementById("char-wiz-form").reset();
    document.getElementById("NPC-entries").reset();
    document.getElementById("Group-entries").reset();
  }

  endTurn() {
    var isEndTurnDisplayed = false;
    var currentRound = this.state.round;

    if (this.state.initGroups.length > 1) {
      var newInitGroupsArray = InitGroupStore.endTurn(currentRound);
      if (newInitGroupsArray[0].id !== "group-start") {
        isEndTurnDisplayed = true;
      }
      if (newInitGroupsArray[newInitGroupsArray.length - 1].id === "group-start") {
        currentRound++;
      }
    }
    else {
      this.toggleMessageModal(Constants.continueEncounterWithNoCharactersString);
    }

    this.setState({
      round: currentRound,
      isEndTurnDisplayed: isEndTurnDisplayed
    })
  }

  toggleClearEncounterModal() {
    this.setState({ isClearEncounterModalOpen: !this.state.isClearEncounterModalOpen });
  }

  clearNpcs() {
    InitGroupStore.clearNpcs();

    this.setState({
      round: 1,
      turns: 0
    });
    this.toggleClearEncounterModal();
  }

  clearAll() {
    InitGroupStore.clearAll();
    this.setState({
      round: 1,
      turns: 0
    });
    this.toggleClearEncounterModal();
  }

  toggleMessageModal(text) {
    this.setState({
      isMessageModalDisplayed: !this.state.isMessageModalDisplayed,
      messageModalText: text
    });
  }

  getCharacters(charIds) {
    return InitGroupStore.getCharactersByIds(charIds);
  }

  updateInitGroupsAndCharacters() {
    this.setState({
      initGroups: InitGroupStore.getInitGroups(),
      characters: InitGroupStore.getCharacters()
    });
  }

  componentWillMount() {
    InitGroupStore.subscribe(this.updateInitGroupsAndCharacters);
  }

  componentWillUnmount() {
    InitGroupStore.unsubscribe(this.updateInitGroupsAndCharacters);
  }

  render() {
    return (
      <div>
        <div id="roundCounter">
          <h2>Round {this.state.round}</h2>
        </div>
        <ul>

          <InitGroupList
            initGroups={this.state.initGroups}
            handleGetCharacters={this.getCharacters}
            handleAddHp={this.addHp}
            handleEditName={this.editInitGroupName}
            handleRemoveInitGroup={this.removeInitGroup}
            handleRemoveCharacter={this.removeCharacter}
            handleEditCharName={this.editCharName}
            handleEditInit={this.editInit}
            handleStartRound={this.endTurn}
          />

          <Button
            text="Add Char"
            id="addCharButton"
            onClick={this.toggleAddCharModal}
          />
          <EndTurnButton
            isDisplayed={this.state.isEndTurnDisplayed}
            endTurn={this.endTurn}
          />
          <AddCharModalContainer
            onAddCharSubmit={this.addChar}
            isOpen={this.state.isAddCharModalOpen}
            toggleAddCharModal={this.toggleAddCharModal}
          />
          <Button
            text={Constants.clearEncounterModalButtonString}
            id="clearEncounter"
            onClick={this.toggleClearEncounterModal}
          />
          <ClearEncounterModal
            isOpen={this.state.isClearEncounterModalOpen}
            toggle={this.toggleClearEncounterModal}
            labelText={Constants.clearEncounterLabelString}
            clearAllButtonText={Constants.clearAllButtonString}
            clearNpcsButtonText={Constants.clearNpcsButtonString}
            onClearAll={this.clearAll}
            onClearNpcs={this.clearNpcs}
          />
          <MessageModal
            isDisplayed={this.state.isMessageModalDisplayed}
            toggle={this.toggleMessageModal}
            text={this.state.messageModalText}
          />
        </ul>
      </div>
    );
  }
}