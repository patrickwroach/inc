import React from 'react';
import { EncounterReportModal } from '../presentational/EncounterReportModal.jsx';

export class EncounterReportModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        inGameSeconds: 0,
        inGameMinutes: 0
    
    };
     
    this.convertRoundsToSeconds =  this.convertRoundsToSeconds.bind(this);    
  }  

  convertRoundsToSeconds() {
    const currentAmount = amount;
    this.props.handleAddHp(this.props.id, currentAmount);
  }
  
  render() {
    return (
      <EncounterReportModal
      isDisplayed= {this.props.isDisplayed}
      toggle={this.props.toggle}    
      encounterRoundCount={this.props. encounterRoundCount}
      encounterTurnCount={this.props.encounterTurnCount}
            
      />
    );
  }
}