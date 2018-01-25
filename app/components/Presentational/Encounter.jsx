import React from 'react';
import Shortid from 'shortid';
import { InitGroupList } from './InitGroupList.jsx';
import { Button } from './button.jsx';
import { EndTurnButton } from './endTurnButton.jsx';
import { AddChar } from './addchar.jsx';
import { ClearEncounterModal } from './ClearEncounterModal.jsx';
import { MessageModal } from './MessageModal.jsx';
import { Constants } from '../../other/Constants.js';
import { Helpers } from '../../other/Helpers.js';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initGroups: Helpers.initialInitGroups,
      characters: Helpers.initialCharacters,
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
  }

  addHp(charId, amount) {
    var newCharArray = this.state.characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].hp += parseInt(amount);

    this.setState({ characters: newCharArray });
  }

  editCharName(charId, newName) {
    var newCharArray = this.state.characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray[charIndex].name = newName;
    this.setState({ characters: newCharArray });
  }

  editInitGroupName(initGroupId, newName) {
    var newInitGroupArray = this.state.initGroups.slice();
    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray[index].name = newName;
    this.setState({ initGroups: newInitGroupArray });
  }

  removeCharacter(charId, initGroupId) {
    var newInitGroupArray = this.state.initGroups.slice();
    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    var newCharIdsArray = newInitGroupArray[index].charIds;
    var charIdsIndex = newCharIdsArray.indexOf(charId);
    newInitGroupArray[index].charIds.splice(charIdsIndex, 1);

    if (newInitGroupArray[index].charIds.length === 0) {
      newInitGroupArray.splice(index, 1);
    }

    var newCharArray = this.state.characters.slice();
    var charIndex = newCharArray.findIndex(c => c.id === charId);
    newCharArray.splice(charIndex, 1);

    this.setState({
      initGroups: newInitGroupArray,
      characters: newCharArray
    });
  }

  removeInitGroup(initGroupId) {
    var newInitGroupArray = this.state.initGroups.slice();
    var initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    var newCharArray = this.state.characters.slice();
    var initGroup = newInitGroupArray[initGroupIndex];
    for (var i = 0; i < initGroup.charIds.length; i++) {
      var charId = initGroup.charIds[i];
      var charIndex = newCharArray.findIndex(c => c.id === charId);
      newCharArray.splice(charIndex, 1);
    }

    var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
    newInitGroupArray.splice(index, 1);

    this.setState({
      initGroups: newInitGroupArray,
      characters: newCharArray
    });
  }

  editInit(initGroupId, newInit) {
    var newInitGroupArray = this.state.initGroups.slice();
    var initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId);

    var elemArr = newInitGroupArray.splice(initGroupIndex, 1);
    var initGroup = elemArr[0];
    initGroup.init = newInit;
    newInitGroupArray = Helpers.insertInitGroup(initGroup, newInitGroupArray);

    this.setState({ initGroups: newInitGroupArray });
  }

  toggleAddCharModal() {
    this.setState({ isAddCharModalOpen: !this.state.isAddCharModalOpen });
  }

  addChar(name, init, type, hp, amount) {
    const charName = name;
    const initValue = init;
    const typeValue = type;
    const hpValue = hp;
    const amountValue = amount;
    var newCharArray = this.state.characters.slice();
    var charIds = [];
    for (var i = 0; i < amountValue; i++) {
      var newCharacter = {
        id: Shortid.generate(),
        name: charName + (typeValue == "Group" ? " " + (i + 1) : ""),
        hp: hpValue,
        hpMax: hpValue
      };
      newCharArray.push(newCharacter);
      charIds.push(newCharacter.id);
    }

    var newInitGroup = {
      id: Shortid.generate(),
      name: charIds.length > 1 ? charName + " Group" : "",
      init: initValue,
      type: typeValue,
      charIds: charIds
    };

    var newInitGroupArray = Helpers.insertInitGroup(newInitGroup, this.state.initGroups);

    this.setState({
      initGroups: newInitGroupArray,
      characters: newCharArray,
      isAddCharModalOpen: false
    });

    document.getElementById("char-wiz-form").reset();
    document.getElementById("NPC-entries").reset();
    document.getElementById("Group-entries").reset();
  }

  endTurn() {
    var isEndTurnDisplayed = false;
    var currentRound = this.state.round;
    var newInitGroupsArray = this.state.initGroups.slice();

    if (this.state.initGroups.length > 1) {
      newInitGroupsArray.push(newInitGroupsArray.shift());
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
      initGroups: newInitGroupsArray,
      round: currentRound,
      isEndTurnDisplayed: isEndTurnDisplayed
    })
  }

  toggleClearEncounterModal() {
    this.setState({ isClearEncounterModalOpen: !this.state.isClearEncounterModalOpen });
  }

  clearNpcs() {
    var currentInitGroupArray = this.state.initGroups.slice();
    var currentCharArray = this.state.characters.slice();
    var newInitGroupArray = [];
    var newCharArray = [];
    for (var i = 0; i < currentInitGroupArray.length; i++) {
      var initGroup = currentInitGroupArray[i];
      if (initGroup.type === 'PC' || initGroup.type === 'nonChar') {
        newInitGroupArray.push(initGroup);
        for (var j = 0; j < initGroup.charIds.length; j++) {
          var character = currentCharArray.find(c => c.id === initGroup.charIds[j]);
          newCharArray.push(character);
        }
      }
    }

    this.setState({
      initGroups: newInitGroupArray,
      characters: newCharArray,
      round: 1,
      turns: 0
    });
    this.toggleClearEncounterModal();
  }

  clearAll() {
    this.setState({
      initGroups: Helpers.initialInitGroups,
      characters: Helpers.initialCharacters,
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
    return this.state.characters.filter(character => charIds.includes(character.id));
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
          <AddChar
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