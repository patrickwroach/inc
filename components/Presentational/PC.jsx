import React from 'react';
import { CharName } from './CharName.jsx';

export class PC extends React.Component {
  render() {
   return (
      <div id={this.props.arrayTargeter} className="character pc" >
     	<CharName name={this.props.name} />	
      </div>
      )
    };

  }
