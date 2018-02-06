import React from 'react';
import { Modal } from './Modal.jsx';
import { Constants } from '../../other/Constants.js';

export class EncounterReportModal extends React.Component  {

	render() {
	  return (
		<Modal
		  toggle={this.props.toggle}
		  isDisplayed={this.props.isDisplayed}>

		  <h3>{Constants.encounterReportTitleString}</h3>
		  <h4>{Constants.encounterReportTimeSectionIntroString}</h4>
		  <p>{this.props.encounterRoundCount + " " +Constants.inGameGroupTurnString}</p>
		  <p>{this.props.encounterRoundCount + " " + Constants.inGamePlayerTurnString}</p>
		  <p>{Constants.inGameString + this.props.encounterSecondsCount } </p>
		  <p>{Constants.inRealLifeString + this.props.realLifeTime}</p>
		 
		</Modal>
	  );
	}
  }