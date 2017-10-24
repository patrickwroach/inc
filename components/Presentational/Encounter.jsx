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
                    newName:'',
                    newType:'',
                    newHp:10,
                    newInit:0,
                    newAmount:[0]
                                                     
                     };
        this.addHp = this.addHp.bind(this);
        this.minusHp = this.minusHp.bind(this);
        this.addChar = this.addChar.bind(this);
        this.openWizard = this.openWizard.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeType= this.changeType.bind(this);
        this.changeHp = this.changeHp.bind(this);
        this.changeAmount= this.changeAmount.bind(this);

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
    openWizard() {
       this.setState({toggleWizard:'active'} 
                       );
    }
    closeWizard() {
         this.setState({toggleWizard:'inactive'} 
                       );
    }

   addChar(){
         var newArray = this.state.CharData.slice();    
            newArray.push({
            name:this.state.newName,
            type:this.state.newType, 
            hp:this.state.newHp,
            hpmax:this.state.newHp,
            amount:this.state.newAmount  
        
        });   
        this.setState({CharData:newArray,
                       toggleWizard:'inactive'} 
                       );
        

   }

    changeName(name) {                  
            this.setState({
            newName: name
        });
     }
    changeType(type) {
            this.setState({
                newType:type
            });
     }
     changeHp(hp) {                  
            this.setState({
            newHp: hp
        });
     }
    changeAmount(amount) {      
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
                onClick={() => this.openWizard()}
            />            
            <Button 
                text="End Turn" 
                id="endTurnButton" 
                onClick={() => this.cycleTurn()}
            />            
            <AddChar 
               
                onAddCharClick = {()=> this.addChar()}
                toggleWizard = {this.state.toggleWizard}
                closeWizard={() => this.closeWizard()}               
                onChangeName = {this.changeName}
                onChangeType = {this.changeType}
                onChangeHp = {this.changeHp}
                onChangeAmount = {this.changeAmount}
            />
        </ul>       
        );
    }
}