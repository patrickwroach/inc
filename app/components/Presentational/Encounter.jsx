import React from 'react';
import Shortid from 'shortid';
import { InitGroup } from './initgroup.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addchar.jsx';
/*
let initGroupTemplate = {
	id: "group-doggos",
		name: "",
		init: 12,
		type: "Group",
		charIds: ["doggo-1"]
};
let characterTemplate = {
	id: "doggo-1",
	name: "Doggo",
	hp: 10,
	hpMax: 10
};
*/
let charArray = [
	{
		id: "new-round",
		name: "start of new round",
		hp: 0,
		hpMax: 0
	}
];

let initGroupArray = [
	{
		id: "group-start",
		name: "start of new round",
		init: Number.MAX_SAFE_INTEGER,
		type: "nonChar",
		charIds: ["new-round"]
	}
];

function sortInitGroups (left, right) {
	return right.init - left.init;
}

export class Encounter extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
			initGroups: initGroupArray,
			characters: charArray,
			toggleWizard: 'inactive',                                 
			newName: 'Unnamed',
			newType: 'PC',
			newHp: 1,
			newInit: 0,
			newAmount: 1,
			amountVis: 'hidden',  
			hpVis: 'hidden', 
			round: 1,
			turns: 0  
		};
		
        this.addHp = this.addHp.bind(this);
        this.editCharName = this.editCharName.bind(this);
		this.editInitGroupName = this.editInitGroupName.bind(this);
        this.editInit = this.editInit.bind(this);
        this.addChar = this.addChar.bind(this);
        this.openWizard = this.openWizard.bind(this);
        this.setNewName = this.setNewName.bind(this);
        this.setNewType= this.setNewType.bind(this);
        this.setNewHp = this.setNewHp.bind(this);
        this.setNewInit = this.setNewInit.bind(this);
        this.setNewAmount= this.setNewAmount.bind(this);
        this.showAmount = this.showAmount.bind(this);
        this.hideAmount = this.hideAmount.bind(this);
        this.showHp = this.showHp.bind(this);
        this.hideHp = this.hideHp.bind(this);
		this.endTurn = this.endTurn.bind(this);
    }  
    
 //ToDo: Add var to handle anytoggleWizard setStates, best practice update
 //ToDO store functions in individual components
	addHp(charId, amount) {
		var newCharArray = this.state.characters.slice();
		var charIndex = newCharArray.findIndex(c => c.id === charId);
		newCharArray[charIndex].hp += amount;
		
		this.setState({ characters: newCharArray });
	}

    editCharName(charId, newName) {
        var newCharArray = this.state.characters.slice();
		var charIndex = newCharArray.findIndex(c => c.id === charId);
        newCharArray[charIndex].name = newName;
        this.setState({ characters: newCharArray});
    }
	
	editInitGroupName(initGroupId, newName) {
		var newInitGroupArray = this.state.initGroups.slice();
		var index = newInitGroupArray.findIndex(ig => ig.id === initGroupId);
		newInitGroupArray[index].name = newName;
		this.setState({ initGroups: newInitGroupArray });
	}
	
	editInit(initGroupId, newInit) {
		var newInitGroupArray = this.state.initGroups.slice();
		var initGroupIndex = newInitGroupArray.findIndex(ig => ig.id === initGroupId)
		newInitGroupArray[initGroupIndex].init = newInit;
		newInitGroupArray.sort(sortInitGroups);
        this.setState({ initGroups: newInitGroupArray});
    }
        
            
    //Add Character Sections, specific types to be stripped out after wizard is complete
    openWizard() {
		this.setState({ toggleWizard: 'active' });
    }
    closeWizard() {
		this.setState({ toggleWizard: 'inactive' });
    }
	
    showAmount(){
         this.setState({
                    amountVis:'displayed'
        })
    }
    hideAmount(){
        this.setState({
                   amountVis:'hidden'
        })
    }
    showHp(){
         this.setState({
                    hpVis:'displayed'
        })
    }
    hideHp(){
        this.setState({
                    hpVis:'hidden'
        })
    }
  
	addChar() {
		var newInitGroupArray = this.state.initGroups.slice();
		var newCharArray = this.state.characters.slice();
		
		var newInitGroup = {
			id: Shortid.generate(),
			name: "",
			init: this.state.newInit,
			type: this.state.newType,
		};
		
		var charIds = [];
		for(var i = 0; i < this.state.newAmount; i++) {
			var newCharacter = {
				id: Shortid.generate(),
				name: this.state.newName + (this.state.newType == "Group" ? " " + (i + 1) : ""),
				hp: this.state.newHp,
				hpMax: this.state.newHp
			};
			newCharArray.push(newCharacter);
			charIds.push(newCharacter.id);
		}
		
		newInitGroup.charIds = charIds;
		newInitGroup.name = charIds.length > 1 ? this.state.newName + " Group" : "";
		newInitGroupArray.push(newInitGroup);
		newInitGroupArray.sort(sortInitGroups);
		
		this.setState({
			initGroups: newInitGroupArray,
			characters: newCharArray,
			toggleWizard:'inactive',
			newName:'Unnamed',
			newType:'PC',
			newHp:[1],
			newInit:0,
			newAmount:1,
			hpVis:'hidden',
			amountVis:'hidden'
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
            newAmount:amount
        });
     }

	// May not be used anymore after merge with data-organization branch.  Keeping so it can
	//  be incorporated into endTurn (renamed function in branch)
    cycleTurn(){
        if (this.state.CharData.length > 1){
        var newArray = this.state.CharData;    
        newArray.push(newArray.shift());        
        this.setState({
            CharData:newArray,
           }
        );
            if (this.state.CharData[0].name[0] === "start of new round"){
                var currentRound = this.state.round + 1;
                this.setState({
                round:currentRound        
            });
            }      
        }
    }
	
	endTurn(){
		var newInitGroupsArray = this.state.initGroups.slice();
		newInitGroupsArray.push(newInitGroupsArray.shift());
		this.setState({ initGroups: newInitGroupsArray });
	}
	
    render() {
		const InitGroups = this.state.initGroups.map((ig) =>
			<li key={ig.id} >
				<InitGroup
					id = {ig.id}
					name = {ig.name}
					init = {ig.init}
					type = {ig.type}
					charArray = {this.state.characters.filter(character => ig.charIds.includes(character.id) )}
					handleAddHp = {this.addHp}
					handleEditName = {this.editInitGroupName}
					handleEditCharName = {this.editCharName}
					handleEditInit = {this.editInit}
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
                text = "Add Char"
                id = "addCharButton"
                onClick = {this.openWizard}
            />         
            <Button 
                text="End Turn" 
                id="endTurnButton" 
                onClick = {this.endTurn}
            />            
            <AddChar 
                onAddCharClick = {this.addChar}
                toggleShowAmount = {()=> this.showAmount()}
                toggleHideAmount = {()=> this.hideAmount()}
                toggleShowHp = {()=> this.showHp()}
                toggleHideHp = {()=> this.hideHp()}
                amountVis = {this.state.amountVis}
                hpVis = {this.state.hpVis}
                toggleWizard = {this.state.toggleWizard}
                closeWizard={() => this.closeWizard()}               
                onChangeName = {this.setNewName}
                onChangeType = {this.setNewType}
                onChangeHp = {this.setNewHp}
                onChangeInit = {this.setNewInit}
                onChangeAmount = {this.setNewAmount}
                selectedType = {this.state.newType}
            />
        </ul>  
        </div>     
        );
    }
}