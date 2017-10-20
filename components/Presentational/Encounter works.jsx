import React from 'react';
import {Character } from './character.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addChar.jsx';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
    this.state={
                CharData:[],
                toggleWizard:'inactive'
                };
    this.addChar = this.addChar.bind(this);
    this.addPC = this.addPC.bind(this);
    this.addNPC = this.addNPC.bind(this);
    this.addGroup = this.addGroup.bind(this);   
    
}  
    
 //ToDo: Add var to handle anytoggleWizard setStates, best practice update
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
        });   
        this.setState({CharData:newArray,
                      toggleWizard:'inactive'} 
                       );
        }
    
   
  
   

    render() {
        const latestAdd = this.state.CharData[(this.state.CharData.length) -1];
        const charOnAdd = this.state.CharData;
        const Characters = this.state.CharData.map((number)=><li key={number.toString()}><Character hp={latestAdd.hp} name={latestAdd.name} type={latestAdd.type} /></li>);
        console.log(charOnAdd.indexOf(latestAdd));
       
        
      
        return (        
        <ul>
        
        {Characters}         
        <li><Button text="Round End" id="roundEndButton" /></li>
        <Button text="Add Char" id="addCharButton" onClick={() => this.addChar()}/>
        <AddChar toggleWizard = {this.state.toggleWizard}
                 closeWizard={() => this.closeWizard()}
                 addGroup={() => this.addGroup()}
                 addPC={() => this.addPC()}
                 addNPC={() => this.addNPC()}
                 />
        </ul>	 
        
        );
    }
    }