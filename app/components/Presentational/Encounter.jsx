import React from 'react';
import { InitGroup } from './initgroup.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addchar.jsx';
/*
let initGroupTemplate = {
	name: "", // If empty/null/ then use name of first characterSet
	init: 0,
	charKeys: ["char-1", "char-2", "char-3"]
};
let characterTemplate = {
	id: "doggo-1" 
	name: "Doggo",
	type: "PC", "NPC", or "nonChar",
	hp: 0,
	hpMax: 0
};
*/
let charArray = [
	{
		id: "new-round",
		name: "start of new round",
		hp: 0,
		hpMax: 0
	}, {
		id: "doggo-1",
		name: "Doggo 1",
		hp: 10,
		hpMax: 10
	}, {
		id: "joe-1",
		name: "Joe",
		type: "PC",
		hp: 0,
		hpMax: 0 // if hpMax is 0 or null/undefined don't display/pass
	}, {
		id: "doggo-2",
		name: "Doggo 2",
		hp: 15,
		hpMax: 15
	}, {
		id: "snip-snap-1",
		name: "Snip Snap Doggo",
		hp: 25,
		hpMax: 25
	}
];

let initGroupArray = [
	{
		id: "group-start",
		name: "start of new round",
		init: Number.MAX_SAFE_INTEGER,
		type: "nonChar",
		charKeys: ["new-round"]
	}, {
		id: "group-joe",
		name: "",
		init: 17,
		type: "PC",
		charKeys: ["joe-1"]
	}, {
		id: "group-doggos",
		name: "Doggo Group",
		init: 12,
		type: "Group",
		charKeys: ["doggo-1", "doggo-2"]
	}, {
		id: "group-snip-snap-doggo",
		name: "Snip Snap Doggo Group",
		init: 5,
		type: "NPC",
		charKeys: ["snip-snap-1"]
	}
];

function sortInitGroups (left, right) {
	return right.init - left.init;
}

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
        this.state={
					/*
                    CharData:[ {
                        name:["start of new round"],
                        type:"nonChar",
                        init: Number.MAX_SAFE_INTEGER,
                        hp:[0],
                        hpmax:[0],
                        amount:1}
                        ],
					*/
					initGroups: initGroupArray,
					characters: charArray,
                    toggleWizard:'inactive',                                 
                    newName:'Unnamed',
                    newType:'PC',
                    newHp:[1],
                    newInit:0,
                    newAmount:1,
                    amountVis:'hidden',  
                    hpVis:'hidden',   
                                        
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
       this.setState({toggleWizard:'active'} 
                       );
    }
    closeWizard() {
         this.setState({toggleWizard:'inactive'} 
                       );
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
  
   addChar(){
         var newArray = this.state.CharData.slice();  
         var hpArr = [];
         var nameArr = [];
         hpArr.length = this.state.newAmount;
         nameArr.length = this.state.newAmount + 1;      
         hpArr.fill(this.state.newHp); 
         nameArr.fill(this.state.newName); 
		 newArray.push({
            name:nameArr,
            type:this.state.newType, 
            hp:hpArr,
            hpmax:this.state.newHp,
            init:this.state.newInit,  
            amount:this.state.newAmount
         });   
		 newArray.sort(sortCharData);
        
         this.setState({CharData:newArray,
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
            this.setState({
                newType:type
            });
     }
    setNewHp(hp) {                  
            this.setState({
            newHp: hp
        });
     }
    setNewAmount(amount) {      
       this.setState({
            newAmount:amount
        });
     }
	
	endTurn(){
		var newInitGroupsArray = this.state.initGroups.slice();
		newInitGroupsArray.push(newInitGroupsArray.shift());
		this.setState({ initGroups: newInitGroupsArray });
	}
	
    render() { 
		/*
        const  InitGroups = this.state.CharData.map((CharData, index)=>
            <li key={index}>
                <InitGroup 
                    //char data
                    target={index}
                    CharData={CharData}       
                    onAddHp= {this.editHp} 
                    onEditName = {this.editName}  
                    onEditInit = {this.editInit}         
                                        
                                     
                />
            </li>
        );
		*/
		const InitGroups = this.state.initGroups.map((ig) =>
			<li key={ig.id} >
				<InitGroup
					key = {ig.id}
					id = {ig.id}
					name = {ig.name}
					init = {ig.init}
					type = {ig.type}
					charArray = {this.state.characters.filter(character => ig.charKeys.includes(character.id) )}
					handleAddHp = {this.addHp}
					handleEditName = {this.editInitGroupName}
					handleEditCharName = {this.editCharName}
					handleEditInit = {this.editInit}
				/>
			</li>
		);
            
        return (        
        <ul> 
          
            {InitGroups}         
           
            <Button 
                text="Add Char" 
                id="addCharButton" 
                onClick={() => this.openWizard()}
            />            
            <Button 
                text="End Turn" 
                id="endTurnButton" 
                onClick = {this.endTurn}
            />            
            <AddChar 
                onAddCharClick = {()=> this.addChar()}
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
        );
    }
}