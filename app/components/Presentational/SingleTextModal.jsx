import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class SingleTextModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: this.props.inputValue
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleKeyPress(e) {
		if (e.key == Constants.enterKey) {
			this.props.onSubmit(this.state.inputValue);
		}
	}
	
	handleChange(e) {
		this.setState({ inputValue: e.target.value });
	}
	
	handleSubmit(e) {
		this.props.onSubmit(this.state.inputValue);
	}
	
	render() {
		if (!this.props.isOpen) {
			return null;
		}
		
		return (
			<div className="name-edit displayed">
				<div className="choice-container">
					<Button id="closer" text="&#10006;" onClick={this.props.toggle} />
					<h3>{this.props.labelText}</h3>
					<input  type="text"
							value={this.state.inputValue}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							autoFocus
					/>
					<Button onClick={this.handleSubmit} text={this.props.buttonText} />
				</div>
			</div>
		);
	}
}