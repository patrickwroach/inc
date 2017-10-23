import React from 'react';
import { InitGroup } from './initgroup.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addchar.jsx';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
        this.state={
                    CharData:[],
                    toggleWizard:'inactive',
                                    
                     };
        this.addHp = this.addHp.bind(this);
        this.minusHp = this.minusHp.bind(this);
        this.addChar = this.addChar.bind(this);
        this.addPC = this.addPC.bind(this);
        this.addNPC = this.addNPC.bind(this);
        this.addGroup = this.addGroup.bind(this); 
  

    }  
    
 //ToDo: Add var to handle anytoggleWizard setStates, best practice update
 //ToDO store functions in individual components
   //Name Updater
  
   //HP adjustment functions
    
    addHp() {

    
    }

    minusHp() {      

  
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
            name:'Sol the Halfling',
            type: 'PC',
            amount: [1]  
           
                
        });   
        this.setState({CharData:newArray,
                      toggleWizard:'inactive'} 
                       );
        }
    addNPC() {
        var newArray = this.state.CharData.slice();    
            newArray.push({
            name:'Tarask',
            type:'NPC', 
            hp:100,
            hpmax:100,
            hpInput:3,
            amount: [1]   
        
        });   
        this.setState({CharData:newArray,
                       toggleWizard:'inactive'} 
                       );
        }
    addGroup() {
        var newArray = this.state.CharData.slice();   
         
        newArray.push({
            name:'Goblin',
            type:'Group',
            hp:10,  
            hpmax:10,
            hpInput:3,
            amount: [0,1,2] 
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
       
        const  InitGroups = this.state.CharData.map((CharData, index)=>
            <li key={index}>
                <InitGroup 
                    //char data
                    target={index}
                    CharData={CharData}
                    //functions to pass to char
                    addHp={() => this.addHp()}
                    minusHp={() => this.minusHp()}                
                                     
                />
            </li>
        );      
            
        return (        
        <ul> 
            
            {InitGroups}         
           
            <Button 
                text="Add Char" 
                id="addCharButton" 
                onClick={() => this.addChar()}
            />            
            <Button 
                text="End Turn" 
                id="endTurnButton" 
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