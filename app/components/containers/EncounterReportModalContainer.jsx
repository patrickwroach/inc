import React from 'react';
import { EncounterReportModal } from '../presentational/EncounterReportModal.jsx';
import { Constants } from '../../other/Constants.js';

export class EncounterReportModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     };
     
    this.convertRoundsToTime =  this.convertRoundsToTime.bind(this);    
  }  
  
  convertRoundsToTime() {    
    var roundCount = this.props.encounterRoundCount;   
    var secondsGross = roundCount*6;  
    var minutes =  Math.floor(secondsGross/ 60);
    var seconds = secondsGross % 60;
    return minutes.toString() + " " + Constants.minutesString + ", and "  + seconds.toString() + " " + Constants.secondsString + ".";   
  }


  

  calculateRealLifeTime(){
    var startTime = this.props.encounterStartTime;
    var milliseconds = Date.now() - startTime;   
    var secondsGross =  Math.floor(milliseconds/1000); 
    var minutes =  Math.floor(secondsGross/ 60);
    var seconds = secondsGross % 60;
    return minutes.toString() + " " + Constants.minutesString + ", and "  + seconds.toString() + " " + Constants.secondsString + ".";   
  }
 

  render() {
    return (
      <EncounterReportModal
      isDisplayed= {this.props.isDisplayed}
      toggle={this.props.toggle}    
      encounterRoundCount={this.props.encounterRoundCount}
      encounterTurnCount={this.props.encounterTurnCount}
      encounterSecondsCount={this.convertRoundsToTime()}
      realLifeTime={this.calculateRealLifeTime()}
            
      />
    );
  }
}