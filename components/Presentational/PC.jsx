import React from 'react';
import { CharName } from './CharName.jsx';

export class PC extends React.Component {
    constructor(props){
    super(props);
    this.state = { name:'The Nameless One'};
  }
  render() {
   return (
      <div id={this.state.name} class="character pc" >
     	<CharName name={this.state.name} />	
      </div>
      )
    };

  }
