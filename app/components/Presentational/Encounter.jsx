import React from 'react';
import Shortid from 'shortid';
import { InitGroupList } from './InitGroupList.jsx';
import { Button } from './button.jsx';
import { EndTurnButton } from './endTurnButton.jsx';
import { AddCharModalContainer } from '../containers/AddCharModalContainer.jsx';
import { ClearEncounterModal } from './ClearEncounterModal.jsx';
import { MessageModal } from './MessageModal.jsx';
import { EncounterReportModalContainer } from '../containers/EncounterReportModalContainer.jsx';
import { Constants } from '../../other/Constants.js';
import { InitGroupStore } from '../../data/InitGroupStore.js';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);

    // Probably not the most appropriate place for this
    let savedInitGroups = JSON.parse(localStorage.getItem(Constants.EncounterStateInitGroupsString));
    let savedCharacters = JSON.parse(localStorage.getItem(Constants.EncounterStateCharactersString));
    if (savedInitGroups) {
      InitGroupStore.loadInitGroups(savedInitGroups);
    }
    if (savedCharacters) {
      InitGroupStore.loadCharacters(savedCharacters);
    }
    
    this.state = {
      initGroups: InitGroupStore.getInitGroups(),
      characters: InitGroupStore.getCharacters(),
      isEndTurnDisplayed: JSON.parse(localStorage.getItem(Constants.EncounterStateIsEndTurnDisplayedString)) || false,
      isAddCharModalOpen: JSON.parse(localStorage.getItem(Constants.EncounterStateIsAddCharModalOpenString)) || false,
      isClearEncounterModalOpen: JSON.parse(localStorage.getItem(Constants.EncounterStateIsClearEncounterModalOpenString)) || false,
      round: JSON.parse(localStorage.getItem(Constants.EncounterStateRoundString)) || 0,
      loggedRounds: JSON.parse(localStorage.getItem(Constants.EncounterStateLoggedRoundsString)) || 0,
      turns: JSON.parse(localStorage.getItem(Constants.EncounterStateTurnsString)) || 0,
      loggedTurns: JSON.parse(localStorage.getItem(Constants.EncounterStateLoggedTurnsString)) || 0,
      isMessageModalDisplayed: JSON.parse(localStorage.getItem(Constants.EncounterStateIsMessageModalDisplayedString)) || false,
      isEncounterReportModalDisplayed: JSON.parse(localStorage.getItem(Constants.EncounterStateIsEncounterReportModalDisplayedString)) || false,
      messageModalText: JSON.parse(localStorage.getItem(Constants.EncounterStateMessageModalTextString)) || "",
      encounterStartTime: JSON.parse(localStorage.getItem(Constants.EncounterStateEncounterStartTimeString)) || 0,
      loggedEncounterStartTime: JSON.parse(localStorage.getItem(Constants.EncounterStateLoggedEncounterStartTimeString)) || null
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
    this.toggleEncounterReportModal = this.toggleEncounterReportModal.bind(this);
    this.getCharacters = this.getCharacters.bind(this);
    this.updateInitGroupsAndCharacters = this.updateInitGroupsAndCharacters.bind(this);
    this.persistEncounterState = this.persistEncounterState.bind(this);
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
  }

  endTurn() {
    var isEndTurnDisplayed = false;
    var currentRound = this.state.round;
    var currentTurn = this.state.turns;

    if (this.state.initGroups.length > 1) {
      var newInitGroupsArray = InitGroupStore.endTurn(currentRound);
      if (this.state.round === 0) {
        var startTime = Date.now();
        this.setState({ encounterStartTime: startTime });
      }
      if (newInitGroupsArray[0].id !== "group-start") {
        isEndTurnDisplayed = true;
              
        
      }
      if (newInitGroupsArray[newInitGroupsArray.length - 1].id === "group-start") {
        currentRound++;
      }
      if (newInitGroupsArray[newInitGroupsArray.length - 1].id !== "group-start") {
        currentTurn++;    

      }

    }
    else {
      this.toggleMessageModal(Constants.continueEncounterWithNoCharactersString);
    }

    this.setState({
      round: currentRound,
      turns:currentTurn,
      isEndTurnDisplayed: isEndTurnDisplayed
    })
  }
  

  toggleClearEncounterModal() {
    var loggedRoundCount = this.state.round; 
    var loggedTurnCount = this.state.turns; 
    var loggedStartTime = this.state.encounterStartTime; 
    this.setState({ 
      isClearEncounterModalOpen: !this.state.isClearEncounterModalOpen,
      loggedRounds:loggedRoundCount,
      loggedTurns:loggedTurnCount,
      loggedEncounterStartTime:loggedStartTime
    });
  }

  clearNpcs() {
    InitGroupStore.clearNpcs();
    this.setState({
      round: 0,
      turns: 0,
      encounterStartTime:0
    });
    this.toggleClearEncounterModal();
    this.toggleEncounterReportModal();
  }

  clearAll() {
    InitGroupStore.clearAll();

    this.setState({
      round: 0,
      turns: 0,
    });

    this.toggleClearEncounterModal();
    // TODO: Doesn't seem to be the place for this check, since it's after the previous setState (may or may not be complete by it gets here)
    if (this.state.round > 0) {
      this.toggleEncounterReportModal();
    }
  }

  toggleMessageModal(text) {
    this.setState({
      isMessageModalDisplayed: !this.state.isMessageModalDisplayed,
      messageModalText: text
    });
  }

  toggleEncounterReportModal(text) {
    this.setState({
      isEncounterReportModalDisplayed: !this.state.isEncounterReportModalDisplayed,
      messageModalText: text
    });
  }

  getCharacters(charIds) {
    return InitGroupStore.getCharactersByIds(charIds);
  }

  persistEncounterState() {
    localStorage.setItem(Constants.EncounterStateCharactersString, JSON.stringify(this.state.characters));
    localStorage.setItem(Constants.EncounterStateInitGroupsString, JSON.stringify(this.state.initGroups));
    localStorage.setItem(Constants.EncounterStateIsEndTurnDisplayedString, JSON.stringify(this.state.isEndTurnDisplayed));
    localStorage.setItem(Constants.EncounterStateIsAddCharModalOpenString, JSON.stringify(this.state.isAddCharModalOpen));
    localStorage.setItem(Constants.EncounterStateIsClearEncounterModalOpenString, JSON.stringify(this.state.isClearEncounterModalOpen));
    localStorage.setItem(Constants.EncounterStateRoundString, JSON.stringify(this.state.round));
    localStorage.setItem(Constants.EncounterStateLoggedRoundsString, JSON.stringify(this.state.loggedRounds));
    localStorage.setItem(Constants.EncounterStateTurnsString, JSON.stringify(this.state.turns));
    localStorage.setItem(Constants.EncounterStateLoggedTurnsString, JSON.stringify(this.state.loggedTurns));
    localStorage.setItem(Constants.EncounterStateIsMessageModalDisplayedString, JSON.stringify(this.state.isMessageModalDisplayed));
    localStorage.setItem(Constants.EncounterStateIsEncounterReportModalDisplayedString, JSON.stringify(this.state.isEncounterReportModalDisplayed));
    localStorage.setItem(Constants.EncounterStateMessageModalTextString, JSON.stringify(this.state.messageModalText));
    localStorage.setItem(Constants.EncounterStateEncounterStartTimeString, JSON.stringify(this.state.encounterStartTime));
    localStorage.setItem(Constants.EncounterStateLoggedEncounterStartTimeString, JSON.stringify(this.state.loggedEncounterStartTime));
  }

  updateInitGroupsAndCharacters() {
    this.setState({
      initGroups: InitGroupStore.getInitGroups(),
      characters: InitGroupStore.getCharacters()
    });
  }

  componentDidMount() {
    InitGroupStore.subscribe(this.updateInitGroupsAndCharacters);
  }

  componentWillUnmount() {
    InitGroupStore.unsubscribe(this.updateInitGroupsAndCharacters);
  }

  componentDidUpdate() {
    this.persistEncounterState();
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
            currentRound={this.state.round}
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
          <EncounterReportModalContainer
            isDisplayed={this.state.isEncounterReportModalDisplayed}
            toggle={this.toggleEncounterReportModal}
            encounterRoundCount={this.state.loggedRounds}
            encounterTurnCount={this.state.loggedTurns}
            encounterStartTime={this.state.loggedEncounterStartTime}
            initGroups={this.state.initGroups}

          />
        </ul>
      </div>
    );
  }
}