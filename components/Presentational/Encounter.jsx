import React from 'react';
import {Character } from './character.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addChar.jsx';
import { RoundPush } from './roundpush.jsx';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
        this.state={
                    CharData:[],
                    toggleWizard:'inactive',
                    currentTarget:0
                    
                     };
        this.addHp = this.addHp.bind(this);
        this.minusHp = this.minusHp.bind(this);
        this.addInputHp = this.addInputHp.bind(this);
        this.minusInputHp = this.minusInputHp.bind(this);  
        this.addChar = this.addChar.bind(this);
        this.addPC = this.addPC.bind(this);
        this.addNPC = this.addNPC.bind(this);
        this.addGroup = this.addGroup.bind(this); 
        this.getTarget = this.getTarget.bind(this);     

    }  
    
 //ToDo: Add var to handle anytoggleWizard setStates, best practice update
 //ToDO store functions in individual components
   //Name Updater
  
   //HP adjustment functions
    
    addHp() {
    const target = this.state.currentTarget;
    console.log(target);
    var stateCopy = this.state.CharData.slice();     
    stateCopy[target] = Object.assign({}, stateCopy[target])  
    stateCopy[target].hp += 1;                        
    this.setState({CharData : stateCopy });         
    }

    minusHp() {      
        const newHp = this.state.CharData.hp - 1;
         this.setState({CharData:{hp: newHp }});   
    }

    getTarget(X){
        this.setState({
            currentTarget:X
        });    
    }

    addInputHp() {
        const hpInput = this.state.CharData.hpInput;
        const parsedHPinput = parseInt(hpInput);
        //TODO: Input was getting passed as a string, don't know why 
        //parse is a hot fix
        const newHp = this.state.CharData.hp + parsedHPinput;
        this.setState({ hp: newHp });
    }
    
    minusInputHp() {
        const hpInput = this.state.CharData.hpInput;
        const parsedHPinput = parseInt(hpInput);
        //TODO: Input was getting passed as a string, don't know why 
        //parse is a hot fix
        const newHp = this.state.CharData.hp - parsedHPinput;
        this.setState({ hp: newHp });
    }
            
    //Add Character Sections, specific types to be stripped out after wizard is complete
    addChar() {
       this.setState({toggleWizard:'active'} 
                       );
    }
    closeWizard() {
         this.setState({toggleWizard:'inactive'} 
                       );
    }
    addPC() {
        var newArray = this.state.CharData.slice();
        newArray.push({
            name:'Clark Count',
            type: 'PC', 
                
        });   
        this.setState({CharData:newArray,
                      toggleWizard:'inactive'} 
                       );
        }
    addNPC() {
        var newArray = this.state.CharData.slice();    
        newArray.push({
            name:'CJimm',
            type:'NPC', 
            hp:100,
            hpmax:100,
            hpInput:3
        
        });   
        this.setState({CharData:newArray,
                       toggleWizard:'inactive'} 
                       );
        }
    addGroup() {
        var newArray = this.state.CharData.slice();    
        newArray.push({
            name:'Gru',
            type:'Group',
            hp:10,  
            hpmax:10,
            hpInput:3
        });   
    this.setState({CharData:newArray,
                    toggleWizard:'inactive'} 
                    );
    }

    
    //Turn updater

 
   

    cycleTurn(){
        var newArray = this.state.CharData;    
        newArray.push(newArray.shift());        
        this.setState({CharData:newArray}
        );       
    }
     
   

    render() { 
       
        const Characters = this.state.CharData.map((CharData, index)=>
        <li key={index}>
            <Character 
                //char data
                arrayTargeter={index}
                CharData={CharData}
                //functions to pass to char
                addHp={() => this.addHp()}
                minusHp={() => this.minusHp()} 
                addInputHp={() => this.addInputHp()}
                minusInputHp={() => this.minusInputHp()}
                getTarget={() => this.getTarget()}                 
                
            />
        </li>);      
            
        return (        
        <ul> 
            
            {Characters}         
           
            <Button 
                text="Add Char" 
                id="addCharButton" 
                onClick={() => this.addChar()}
            />            
            <Button 
                text="Cycle" 
                id="CycleButton" 
                onClick={() => this.cycleTurn()}
            />            
            <AddChar 
                toggleWizard = {this.state.toggleWizard}
                closeWizard={() => this.closeWizard()}
                addGroup={() => this.addGroup()}
                addPC={() => this.addPC()}
                addNPC={() => this.addNPC()}
            />
        </ul>       
        );
    }
}