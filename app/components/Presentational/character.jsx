import React from 'react';
import { Button } from './button.jsx';


export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			isNameEditModalOpen: false,
            inputHp:5,
            inputName: this.props.name
        };
     
        this.handleClickAddHp =  this.handleClickAddHp.bind(this);
        this.handleInputHp =  this.handleInputHp.bind(this);
		this.toggleNameEdit = this.toggleNameEdit.bind(this);
        this.handleInputName =  this.handleInputName.bind(this);
		this.handleNameKeyPress = this.handleNameKeyPress.bind(this);
        this.submitName =  this.submitName.bind(this);
        this.handleRemoveCharacter = this.handleRemoveCharacter.bind(this);
    }
  
   
    handleInputHp(e){
        const newInputHp = e.target.value;
      
       this.setState({
            inputHp:newInputHp
        });

    }
	
	toggleNameEdit() {
		this.setState({ isNameEditModalOpen: !this.state.isNameEditModalOpen });
    }
	
	handleInputName(e){
		const newName= e.target.value;
    
		this.setState({
			inputName: newName
        });
    }
	
	handleNameKeyPress(e) {
		if (e.key == 'Enter') {
			this.submitName();
		}
	}
	
	submitName() {
		const newName = this.state.inputName;
		this.props.handleEditName(this.props.id, newName);
		this.toggleNameEdit();
    }
	
    handleRemoveCharacter(){
         this.props.handleRemoveCharacter(this.props.id, this.props.igid);
    }
   
     toggleAliveDead() {
      
        if (this.props.hp >= 1) {
            const currentAmount = this.props.hp * -1;
            this.props.handleAddHp(this.props.id, currentAmount);          
           
        }
        else {
            const currentAmount = (this.props.hp * -1) + 1;
            this.props.handleAddHp(this.props.id, currentAmount);
        }
    }

	handleClickAddHp(amount) {
		const currentAmount = amount;
		this.props.handleAddHp(this.props.id, currentAmount);
	}
	
    render() {
		
		var nameEditModal = null;
		if (this.state.isNameEditModalOpen) {
			nameEditModal = (
				<div className="name-edit displayed">
					<div className="choice-container">
						<Button id="closer" text="&#10006;" onClick={this.toggleNameEdit} />
						<h3>Enter New Name</h3>
						<input  type="text"
								value={this.state.inputName}
								onChange={this.handleInputName}
								onKeyPress={this.handleNameKeyPress}
								autoFocus
						/>
						<Button onClick={this.submitName} text="Change Name" />
					</div>
                </div>
			);
		}
		
		return (
             
               <div className={`char-bar${this.props.hp <= 0 ? ' dead' : ' alive'}`}>
                
                    <div className="char-name">
                    <Button text="&#10006;" addClass="remove "  onClick={() => this.handleRemoveCharacter()} />
						<h1>
							{this.props.name}
							<span className="edit-pen" onClick={() => this.toggleNameEdit()}>{String.fromCharCode(9999)}</span>
						</h1>
                    </div>
                    <div className="aliveDead button-container ">
                     <Button onClick={() => this.toggleAliveDead()} text={this.props.hp <= 0 ? 'revive' : ' kill'} />
                 
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
                    {nameEditModal}
				</div>
        );
	}
}


