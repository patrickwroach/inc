import React from 'react';
import { Button } from './button.jsx';
import { Character } from './character.jsx';
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';
import { Constants } from '../../other/Constants.js';

export class InitGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroup: 'inactive',
            toggleButtonText: 'Show Group',
			isNameEditModalOpen: false,
			isInitEditModalOpen: false,
            inputInit: this.props.init,
           
        };
        this.toggleGroup = this.toggleGroup.bind(this);
		this.toggleNameEdit = this.toggleNameEdit.bind(this);
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
		this.setState({ isNameEditModalOpen: !this.state.isNameEditModalOpen });
    }
	
	submitName(name) {
		this.props.handleEditName(this.props.id, name);
		this.toggleNameEdit();
    }
	
	toggleInitEdit() {
		this.setState({isInitEditModalOpen: !this.state.isInitEditModalOpen })
    }
	
	handleInputInit(e){
		const newInit = parseInt(e.target.value);
		this.setState({ inputInit: newInit });
    }
	
	handleInitKeyPress(e) {
		if (e.key == Constants.enterKey) {
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
                    initGroupId = {this.props.id}
					name = {c.name}
					hp = {c.hp}
					hpMax = {c.hpMax}
					handleAddHp = {this.props.handleAddHp}
                    handleEditName = {this.props.handleEditCharName}
                    handleRemoveCharacter = {this.props.handleRemoveCharacter}
                    handleRemoveInitGroup = {this.props.handleRemoveInitGroup}
                    onToggleNameEdit = {() => this.toggleNameEdit()}
					handleStartRound = {this.props.handleStartRound}
					initPosition = {this.props.initPosition}
				/>
			</li>
		);
		
		var initEditModal = null;
		if (this.state.isInitEditModalOpen) {
			initEditModal = (
				<div className="init-edit displayed">
					<div className="choice-container">
						<Button id="closer" text="&#10006;" onClick={this.toggleInitEdit} />
						<h3>Enter new initiative</h3>
						<input  type="number"
								value={this.state.inputInit}
								onChange={this.handleInputInit}
								onKeyPress={this.handleInitKeyPress}
								autoFocus
						/>
						<Button onClick={this.submitInit} text="Change Initiative" />
					</div>
				</div>
			);
		}
        
        return (
            <ul id={this.props.id} className={'character' + ' ' + this.state.toggleGroup + ' ' + this.props.type + ' index'+ this.props.initPosition}> 
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
				
				<SingleTextModalContainer
					isOpen = {this.state.isNameEditModalOpen}
					toggle = {this.toggleNameEdit}
					onSubmit = {this.submitName}
					labelText = {Constants.editNameLabelString}
					inputValue = {this.props.name}
					buttonText = {Constants.editNameButtonString}
				/>
				
				{initEditModal}
            </ul>
        )

    };
}


