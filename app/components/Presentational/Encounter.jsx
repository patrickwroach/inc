import React from 'react';
import Shortid from 'shortid';
import { InitGroup } from './initgroup.jsx';
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
			isEndTurnDisplayed:false,
			isAddCharModalOpen: false,
			isClearEncounterModalOpen: false,
			newName: 'Unnamed',
			newType: 'PC',
			newHp: 1,
			newInit: 0,
			newAmount: 1,
			amountVis: 'hidden',
			hpVis: 'hidden',
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
		this.setNewName = this.setNewName.bind(this);
		this.setNewType = this.setNewType.bind(this);
		this.setNewHp = this.setNewHp.bind(this);
		this.setNewInit = this.setNewInit.bind(this);
		this.setNewAmount = this.setNewAmount.bind(this);
		this.showAmount = this.showAmount.bind(this);
		this.hideAmount = this.hideAmount.bind(this);
		this.showHp = this.showHp.bind(this);
		this.hideHp = this.hideHp.bind(this);
		this.endTurn = this.endTurn.bind(this);
		this.toggleClearEncounterModal = this.toggleClearEncounterModal.bind(this);
		this.clearNpcs = this.clearNpcs.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.toggleMessageModal = this.toggleMessageModal.bind(this);
	}


	//ToDO store functions in individual components
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


	//Add Character Sections, specific types to be stripped out after wizard is complete
	toggleAddCharModal() {
		this.setState({ isAddCharModalOpen: !this.state.isAddCharModalOpen });
	}

	showAmount() {
		this.setState({
			amountVis: 'displayed'
		})
	}
	hideAmount() {
		this.setState({
			amountVis: 'hidden'
		})
	}
	showHp() {
		this.setState({
			hpVis: 'displayed'
		})
	}
	hideHp() {
		this.setState({
			hpVis: 'hidden'
		})
	}

	addChar() {
		var newCharArray = this.state.characters.slice();
		var charIds = [];
		for (var i = 0; i < this.state.newAmount; i++) {
			var newCharacter = {
				id: Shortid.generate(),
				name: this.state.newName + (this.state.newType == "Group" ? " " + (i + 1) : ""),
				hp: this.state.newHp,
				hpMax: this.state.newHp
			};
			newCharArray.push(newCharacter);
			charIds.push(newCharacter.id);
		}

		var newInitGroup = {
			id: Shortid.generate(),
			name: charIds.length > 1 ? this.state.newName + " Group" : "",
			init: this.state.newInit,
			type: this.state.newType,
			charIds: charIds
		};

		var newInitGroupArray = Helpers.insertInitGroup(newInitGroup, this.state.initGroups);

		this.setState({
			initGroups: newInitGroupArray,
			characters: newCharArray,
			isAddCharModalOpen: false,
			newName: 'Unnamed',
			newType: 'PC',
			newHp: 1,
			newInit: 0,
			newAmount: 1,
			hpVis: 'hidden',
			amountVis: 'hidden'
		});

		document.getElementById("char-wiz-form").reset();
		document.getElementById("NPC-entries").reset();
		document.getElementById("Group-entries").reset();
	}

	setNewName(name) {


		this.setState({
			newName: [name]
		});
	}
	setNewInit(init) {
		this.setState({
			newInit: init
		});
	}

	setNewType(type) {
		this.setState({ newType: type });
	}

	setNewHp(hp) {
		this.setState({ newHp: hp });
	}

	setNewAmount(amount) {
		this.setState({
			newAmount: amount
		});
	}

	// May not be used anymore after merge with data-organization branch.  Keeping so it can
	//  be incorporated into endTurn (renamed function in branch)
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
			initGroups: initGroupArray,
			characters: charArray,
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

	render() {
		const InitGroups = this.state.initGroups.map((ig, index) =>
			<li key={ig.id}>
				<InitGroup
					id={ig.id}
					name={ig.name}
					init={ig.init}
					type={ig.type}
					initPosition={index}
					charArray={this.state.characters.filter(character => ig.charIds.includes(character.id))}
					handleAddHp={this.addHp}
					handleEditName={this.editInitGroupName}
					handleRemoveInitGroup={this.removeInitGroup}
					handleRemoveCharacter={this.removeCharacter}
					handleEditCharName={this.editCharName}
					handleEditInit={this.editInit}
					handleStartRound={this.endTurn}
				/>
			</li>
		);

		return (
			<div>
				<div id="roundCounter">
					<h2>Round {this.state.round}</h2>
				</div>
				<ul>

					{InitGroups}

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
						toggleShowAmount={() => this.showAmount()}
						toggleHideAmount={() => this.hideAmount()}
						toggleShowHp={() => this.showHp()}
						toggleHideHp={() => this.hideHp()}
						amountVis={this.state.amountVis}
						hpVis={this.state.hpVis}
						isOpen={this.state.isAddCharModalOpen}
						toggleAddCharModal={this.toggleAddCharModal}
						onChangeName={this.setNewName}
						onChangeType={this.setNewType}
						onChangeHp={this.setNewHp}
						onChangeInit={this.setNewInit}
						onChangeAmount={this.setNewAmount}
						selectedType={this.state.newType}
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
						isDisplayed = {this.state.isMessageModalDisplayed}
						toggle = {this.toggleMessageModal}
						text = {this.state.messageModalText}
					/>
				</ul>
			</div>
		);
	}
}