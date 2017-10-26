import React from 'react';
import { Button } from './button.jsx';
import { Character } from './character.jsx';

export class InitGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroup: 'inactive',
            toggleButtonText: 'Show Group',
            NameEdit: 'hidden',
            InitEdit: 'hidden',
            inputName:'',
            inputInit:0
        };
        this.toggleGroup = this.toggleGroup.bind(this);
        this.handleInputName =  this.handleInputName.bind(this);
        this.submitName =  this.submitName.bind(this);
        this.handleInputInit =  this.handleInputInit.bind(this);
        this.submitInit =  this.submitInit.bind(this);
    }
    toggleGroup() {

        if (this.state.toggleGroup == 'active') {
            this.setState({
                toggleGroup: 'inactive',
                toggleButtonText: 'Show Group'
            });

        }
        else {
            this.setState({
                toggleGroup: 'active',
                toggleButtonText: 'Hide Group'
            });
        }
    }
    toggleInitEdit() {
       
        if (this.state.InitEdit === 'hidden') {
            this.setState({
                InitEdit: 'displayed'               
            });
        }
        else {
            this.setState({
                InitEdit: 'hidden'    
            });
        }
    }
     toggleNameEdit() {
      
        if (this.state.NameEdit === 'hidden') {
            this.setState({
                NameEdit: 'displayed'               
            });
        }
        else {
            this.setState({
                NameEdit: 'hidden'    
            });
        }
    }
 

    handleInputName(e){
        const newName= e.target.value;
    
         this.setState({
             inputName:newName 
        });
          

    }
    submitName(){
        const arrIndex = this.props.target;
        const nameIndex = this.props.CharData.name.length-1;
        const newName= this.state.inputName;
        this.props.onEditName(arrIndex, nameIndex, newName);
        this.setState({
             NameEdit: 'hidden' 
        });
    }


     handleInputInit(e){
        const newInit= parseInt(e.target.value);    
         this.setState({
             inputInit:newInit
        });
          

    }
    submitInit(){
        const arrIndex = this.props.target;
        const newInit= this.state.inputInit;
        this.props.onEditInit(arrIndex, newInit);
        this.setState({
             InitEdit: 'hidden' 
        });
    }


  

    render() { 
        const amountArr = [0];
        const amountInt = parseInt(this.props.CharData.amount);
        amountArr.length = amountInt;   
        amountArr.fill(0); 
        //To Be Cleaned Up: Joe, Passing arrays as props kept wiping their length or their content and keeping them as a blank array, and the map function wasn't picking up on the blank arrays, so I just fill it here    
        const Characters = amountArr.map((amountArr, index)=>           
                <li key={index} >

                 <Character
                    //char data
                    hpTarget={index}
                    target = {this.props.target}
                    CharData={this.props.CharData}       
                    onAddHp= {this.props.onAddHp} 
                    onEditName = {this.props.onEditName}
                    onToggleNameEdit = {() => this.toggleNameEdit()}  
                       
                                        
                                     
                />
                </li>
        );
       
        return (
            <ul id={this.props.key} className={'character' + ' ' + this.state.toggleGroup + ' ' + this.props.CharData.type}> 
                <div className="group-name-bar">
                        <div className="char-name">
                            <h1>{this.props.CharData.name[this.props.CharData.name.length-1]}s<span class="edit-pen" onClick={() => this.toggleNameEdit()}>{String.fromCharCode(9999)}</span></h1>
                        </div>
                        <div className="button-container">
                            <Button text={this.state.toggleButtonText} id="expand" onClick={() => this.toggleGroup()} />
                        </div>                 
                </div>
                <h3 className="init-number">Init: {this.props.CharData.init}<span class="edit-pen" onClick={() => this.toggleInitEdit()}>{String.fromCharCode(9999)}</span></h3>                           
                {Characters}
                <div className={"name-edit " + this.state.NameEdit}>
                     
                        <div className="choice-container">
                            <Button id="closer" text="&#10006;" onClick={() => this.toggleNameEdit()} />
                            <h3>Enter new name</h3>
                            <input onChange={this.handleInputName} type="text" />
                            <Button onClick={this.submitName} text="Change Name" />
                        </div>
                </div>
                 <div className={"init-edit " + this.state.InitEdit}>
                     
                        <div className="choice-container">
                            <Button id="closer" text="&#10006;" onClick={() => this.toggleInitEdit()} />
                            <h3>Enter new initiative</h3>
                            <input onChange={this.handleInputInit} type="number" placeholder="0" />
                            <Button onClick={this.submitInit} text="Change Initiative" />
                        </div>
                </div>
            </ul>
        )

    };
}


