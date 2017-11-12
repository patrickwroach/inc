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
			isInitEditModalOpen: false,
            inputName:'',
            inputInit:0,
           
        };
        this.toggleGroup = this.toggleGroup.bind(this);
        this.handleInputName =  this.handleInputName.bind(this);
        this.submitName =  this.submitName.bind(this);
		this.toggleInitEdit = this.toggleInitEdit.bind(this);
        this.handleInputInit =  this.handleInputInit.bind(this);
		this.handleInitKeyPress = this.handleInitKeyPress.bind(this);
        this.submitInit =  this.submitInit.bind(this);
        this.handleRemoveInitGroup = this.handleRemoveInitGroup.bind(this);
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
 

	handleInputName(e) {
		const newName = e.target.value;
		this.setState({ inputName: newName });
    }
	
	submitName() {
		const newName = this.state.inputName;
		this.props.handleEditName(this.props.id, newName);
		this.setState({ NameEdit: 'hidden' });
    }
	
	toggleInitEdit() {
		this.setState({isInitEditModalOpen: !this.state.isInitEditModalOpen })
    }
	
	handleInputInit(e){
		const newInit = parseInt(e.target.value);
		this.setState({ inputInit: newInit });
    }
	
	handleInitKeyPress(e) {
		if (e.key == 'Enter') {
			this.submitInit();
		}
	}
	
    submitInit() {
        this.props.handleEditInit(this.props.id, this.state.inputInit);
        this.toggleInitEdit();
    }
    
    handleRemoveInitGroup(){
        this.props.handleRemoveInitGroup(this.props.id);
    }
	
    render() {
		const Characters = this.props.charArray.map((c) =>
			<li key={c.id} >
				<Character
                    id = {c.id}
                    igid = {this.props.id}
					name = {c.name}
					hp = {c.hp}
					hpMax = {c.hpMax}
					handleAddHp = {this.props.handleAddHp}
                    handleEditName = {this.props.handleEditCharName}
                    handleRemoveCharacter = {this.props.handleRemoveCharacter}
                    handleRemoveInitGroup = {this.props.handleRemoveInitGroup}
                    onToggleNameEdit = {() => this.toggleNameEdit()}
				/>
			</li>
		);
		
		var initEditModal = null;
		if (this.state.isInitEditModalOpen) {
			initEditModal = (
				<div className={"init-edit displayed"}>
					<div className="choice-container">
						<Button id="closer" text="&#10006;" onClick={this.toggleInitEdit} />
						<h3>Enter new initiative</h3>
						<input  onChange={this.handleInputInit}
								onKeyPress={this.handleInitKeyPress}						
								type="number" 
								placeholder="0" />
						<Button onClick={this.submitInit} text="Change Initiative" />
					</div>
				</div>
			);
		}
        
        return (
            <ul id={this.props.id} className={'character' + ' ' + this.state.toggleGroup + ' ' + this.props.type + ' index'+ this.props.initPostion}> 
                <div className="group-name-bar">
                <Button text="&#10006;" addClass="remove " onClick={() => this.handleRemoveInitGroup()} />
                        <div className="char-name">
                            <h1>{this.props.name}<span className="edit-pen" onClick={() => this.toggleNameEdit()}>{String.fromCharCode(9999)}</span></h1>
                        </div>
                        <div className="button-container">
                            <Button text={this.state.toggleButtonText} id="expand" onClick={() => this.toggleGroup()} />
                           
                        </div>     
                                   
                </div>
                <h3 className="init-number">Init: {this.props.init}<span className="edit-pen" onClick={() => this.toggleInitEdit()}>{String.fromCharCode(9999)}</span></h3>                           
                {Characters}
                <div className={"name-edit " + this.state.NameEdit}>
                     
                        <div className="choice-container">
                            <Button id="closer" text="&#10006;" onClick={() => this.toggleNameEdit()} />
                            <h3>Enter new name</h3>
                            <input onChange={this.handleInputName} type="text" />
                            <Button onClick={this.submitName} text="Change Name" />
                        </div>
                </div>
				{initEditModal}
            </ul>
        )

    };
}


