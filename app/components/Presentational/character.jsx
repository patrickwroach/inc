import React from 'react';
import { Button } from './button.jsx';
import { SingleTextModal } from './SingleTextModal.jsx';
import { Constants } from '../../other/Constants.js';

export class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			isNameEditModalOpen: false,
            inputHp:5
        };
     
        this.handleClickAddHp =  this.handleClickAddHp.bind(this);
        this.handleInputHp =  this.handleInputHp.bind(this);
		this.toggleNameEdit = this.toggleNameEdit.bind(this);
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
	
	submitName(name) {
		this.props.handleEditName(this.props.id, name);
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
                            <input  onChange={this.handleInputHp} type="number" min="1" placeholder="4" onFocus={(e) => e.target.placeholder = ""}   className="inputToggle"/>
                            <Button onClick={() => this.handleClickAddHp(-this.state.inputHp)} text="-"  />
                            <Button onClick={() => this.handleClickAddHp(-1)} text="-1" />
                        </div>
                    </div>
					
					<SingleTextModal
						isOpen = {this.state.isNameEditModalOpen}
						toggle = {this.toggleNameEdit}
						onSubmit = {this.submitName}
						labelText = {Constants.editNameLabelString}
						inputValue = {this.props.name}
						buttonText = {Constants.editNameButtonString}
					/>
				</div>
        );
	}
}


