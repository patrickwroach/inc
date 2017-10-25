import React from 'react';
import { InitGroup } from './initgroup.jsx';
import { Button } from './button.jsx';
import { AddChar } from './addchar.jsx';

export class Encounter extends React.Component {
  constructor(props) {
    super(props);
        this.state={
                    CharData:[ {
                        name:"start of new round",
                        type:"nonChar",
                        init:-20,
                        amount:1}
                        ],
                    toggleWizard:'inactive',                                 
                    newName:'Unnamed',
                    newType:'PC',
                    newHp:1,
                    newInit:0,
                    newAmount:1,
                    amountVis:'hidden',  
                    hpVis:'hidden',   
                    test : 9                            
                     };
        this.addHp = this.addHp.bind(this);
        this.minusHp = this.minusHp.bind(this);
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
         
    }  
    
 //ToDo: Add var to handle anytoggleWizard setStates, best practice update
 //ToDO store functions in individual components
   //Name Updater
  
   //HP adjustment functions
    
    addHp(index, amount) {
      const currentIndex = index;
      const currentAmount = amount;
      var newArray = this.state.CharData.slice();    
      newArray[currentIndex].hp = parseInt(newArray[currentIndex].hp) + amount;
        this.setState({CharData:newArray});

    }

    minusHp() {      

  
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
            newArray.push({
            name:this.state.newName,
            type:this.state.newType, 
            hp:this.state.newHp,
            hpmax:this.state.newHp,
            init:this.state.newInit,  
            amount:this.state.newAmount 
        
        });   
        
        this.setState({CharData:newArray,
                       toggleWizard:'inactive',
                        newName:'Unnamed',
                        newType:'PC',
                        newHp:1,
                        newInit:0,
                        newAmount:1,
                        hpVis:'hidden',
                        amountVis:'hidden'
                        } 
        );
        
        document.getElementById("char-wiz-form").reset();
        document.getElementById("NPC-entries").reset();
        document.getElementById("Group-entries").reset();
        
   }

    setNewName(name) {                  
            this.setState({
            newName: name
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
                   
                    minusHp={() => this.minusHp()} 
                    onAddHp= {this.addHp}           
                                        
                                     
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
                onClick={() => this.cycleTurn()}
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