import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class AddChar extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      newName: 'Unnamed',
			selectedType: 'PC',
			newHp: 1,
			newInit: 0,
			newAmount: 1,
			amountVis: false,
			hpVis: false,
    }

		this.handleNewName = this.handleNewName.bind(this);
		this.handleNewPC = this.handleNewPC.bind(this);
		this.handleNewGroup = this.handleNewGroup.bind(this);
		this.handleNewNPC = this.handleNewNPC.bind(this);
		this.handleNewHp = this.handleNewHp.bind(this);
		this.handleNewAmount = this.handleNewAmount.bind(this);
		this.handleNewInit = this.handleNewInit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNewName(e) {
		const name = e.target.value;
    this.setState({ newName: name });
	}

	handleNewInit(e) {
		const init = parseInt(e.target.value);
    this.setState({ newInit: init });
  }
  
  handleNewHp(e) {
		const hp = parseInt(e.target.value);
    this.setState({ newHp: hp });
	}

	handleNewAmount(e) {
		const amount = parseInt(e.target.value);
    this.setState({ newAmount: amount });
	}

	handleNewPC() {
    this.setState({
      selectedType: 'PC',
      newAmount: 1,
      hpVis: false,
      amountVis: false
    });
    
		//Todo -reset here is clumsy
		document.getElementById("NPC-entries").reset();
    document.getElementById("Group-entries").reset();
	}
	handleNewNPC() {
    this.setState({
      selectedType: 'NPC',
      newAmount: 1,
      hpVis: true,
      amountVis: false
    });

		//Todo -reset here is clumsy
    document.getElementById("Group-entries").reset();
	}
	handleNewGroup() {
    this.setState({
      selectedType: 'Group',
      newAmount: 2,
      hpVis: true,
      amountVis: true
    });
	}

  handleKeyPress(e) {
		if (e.key == Constants.enterKey) {
			this.handleSubmit();
		}
  }

  handleSubmit() {
    this.props.onAddCharSubmit(
      this.state.newName,
      this.state.newInit,
      this.state.selectedType,
      this.state.newHp,
      this.state.newAmount
    );

    this.setState({
      newName: 'Unnamed',
      newHp: 1,
      newInit: 0
    });
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    var amountInput = null;
    if (this.state.amountVis) {
      amountInput = (
        <form id="Group-entries">
						<p id="amount-entry">
							How many?
							<input onChange={this.handleNewAmount}
								onKeyPress={this.handleKeyPress}
								type="number"
								min="2"
								placeholder="2"
							/>
						</p>
					</form>
      );
    }

    var hpInput = null;
    if (this.state.hpVis) {
      hpInput = (
        <form id="NPC-entries">
          <p id="hp-entry">
            Hit Points
            <input onChange={this.handleNewHp}
              onKeyPress={this.handleKeyPress}
              type="number"
              placeholder="1"
            />
          </p>
        </form>
      );
    }
		return (
			<div id="addCharModal">
				<div className="choice-container">
					<Button id="closer" text="&#10006;" onClick={this.props.toggleAddCharModal} />
					<h2> Add a character to the Encounter </h2>
          <Button addClass={this.state.selectedType + ' ' + "PCbox"} text="PC" onClick={this.handleNewPC} />
					<Button addClass={this.state.selectedType + ' ' + "NPCbox"} text="NPC" onClick={this.handleNewNPC} />
					<Button addClass={this.state.selectedType + ' ' + "Groupbox"} text="Group" onClick={this.handleNewGroup} />
					<form id="char-wiz-form" className="input-container">
						<p>
							Name:
							<input type="text"
								onChange={this.handleNewName}
								onKeyPress={this.handleKeyPress}
								autoFocus
							/>
						</p>
						<p>
							Initiative
							<input type="number"
								placeholder="0"
								onChange={this.handleNewInit}
								onKeyPress={this.handleKeyPress}
							/>
						</p>
					</form>
					{hpInput}
					{amountInput}
					<br />
					<Button addClass="submit" text="Add Character(s)" onClick={this.handleSubmit} />
				</div>
			</div>
		);
	}
}