import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';

export class MessageModal extends React.Component {
	render() {
		if (!this.props.isDisplayed) {
			return null;
		}
		return (
			<div className="modal">
				<div className="choice-container">
					<Button id="closer" text="&#10006;" onClick={this.props.toggle} />
					<h3>{this.props.text}</h3>
				</div>
			</div>
		);
	}
}