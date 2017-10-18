import React from 'react';
import { Button } from './button.jsx';
import { CharName } from './CharName.jsx';


export class GroupNameAndExpander extends React.Component {
  render() {
   return (
    <div id={this.props.name} class="group-name-bar character">
      <CharName name={this.props.name}  />
      <div class="button-container">	             
        <Button text="Show Group" id="expand" onClick={this.props.onToggle} /> 
      </div>
    </div>   	
      )
    };

  }
