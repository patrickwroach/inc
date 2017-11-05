import React from 'react';
import { Button } from './button.jsx';


export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NameEdit: 'hidden',        
            inputHp:5,
            inputName:'',
         
        };
     
        this.handleClickAddHp =  this.handleClickAddHp.bind(this);
        this.handleInputHp =  this.handleInputHp.bind(this);
        this.handleInputName =  this.handleInputName.bind(this);
        this.submitName =  this.submitName.bind(this);
    }
  
   
    handleInputHp(e){
        const newInputHp = e.target.value;
      
       this.setState({
            inputHp:newInputHp
        });

    }

    handleInputName(e){
        const newName= e.target.value;
    
         this.setState({
             inputName:newName 
        });
          

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
 
    submitName(){
        const arrIndex = this.props.target;
        const nameIndex = this.props.hpTarget;
        const newName= this.state.inputName;
        this.props.onEditName(arrIndex, nameIndex, newName);
        console.log ( arrIndex, nameIndex, newName);
        this.setState({
             NameEdit: 'hidden' 
        });
    }

	handleClickAddHp(amount) {
		const currentAmount = amount;
		this.props.handleAddHp(this.props.id, currentAmount);
	}
	
    render() {
        //To Be Cleaned Up: Joe, Passing arrays as props kept wiping their length or their content and keeping them as a blank array, and the map function wasn't picking up on the blank arrays, so I just fill it here
        return (
             
               <div className="char-bar">
                    <div className="char-name">
                        <h1 >{this.props.name} <span className="groupNumber">{this.props.hpTarget + 1}</span> 
                            <span className="edit-pen" onClick={() => this.toggleNameEdit()}>{String.fromCharCode(9999)}</span>
                            </h1>
                    </div>
                    
                    <div className="hp-count">
                        <div className="hp">
							<h2>{this.props.hp}/{this.props.hpMax}</h2>
                        </div>
                        <div className="hp-toggles">
                            <Button onClick={() => this.handleClickAddHp(1)} text="+1"  />
                            <Button onClick={() => this.handleClickAddHp(+this.state.inputHp)} text="+"  />
                            <input  onChange={this.handleInputHp} type="number" min="1" placeholder="5" className="inputToggle"/>
                            <Button onClick={() => this.handleClickAddHp(-this.state.inputHp)} text="-"  />
                            <Button onClick={() => this.handleClickAddHp(-1)} text="-1" />
                        </div>
                    </div>
                        <div className={"name-edit " + this.state.NameEdit}>
                     
                        <div className="choice-container">
                            <Button id="closer" text="&#10006;" onClick={() => this.toggleNameEdit()} />
                            <h3>Enter new name</h3>
                            <input onChange={this.handleInputName} type="text" />
                            <Button onClick={this.submitName} text="Change Name" />
                        </div>
                </div>
                    </div>
        )

    };
}


