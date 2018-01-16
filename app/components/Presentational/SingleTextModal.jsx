import React from 'react';
import { Button } from './button.jsx';
import { Constants } from '../../other/Constants.js';
import { SingleTextModalContainer } from '../containers/SingleTextModalContainer.jsx';

export class SingleTextModal extends React.Component {
	render() {
		return (
			<div className="name-edit displayed">
				<div className="choice-container">
					<Button id="closer" text="&#10006;" onClick={this.props.toggle} />
					<h3>{this.props.labelText}</h3>
					<input  type="text"
							value={this.props.inputValue}
							onChange={this.props.handleChange}
							onKeyPress={this.props.handleKeyPress}
							autoFocus
					/>
					<Button onClick={this.props.handleSubmit} text={this.props.buttonText} />
				</div>
			</div>
		);
	}
}