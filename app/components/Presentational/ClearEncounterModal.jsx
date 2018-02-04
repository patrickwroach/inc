import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class ClearEncounterModal extends React.Component {
	render() {
		if (!this.props.isOpen) {
			return null;
		}
		return (
			<div className="modal">
				<div className="choice-container">
					<Button id="closer" text="&#10006;" onClick={this.props.toggle} />
					<h3>{this.props.labelText}</h3>
					<Button onClick={this.props.onClearAll} text={this.props.clearAllButtonText} />
					<Button onClick={this.props.onClearNpcs} text={this.props.clearNpcsButtonText} />
				</div>
			</div>
		);
	}
}