import React from 'react';
import { Button } from './button.jsx';
import { CharName } from './CharName.jsx';
import { NPC } from './NPC.jsx';


export class NPCGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = { toggleGroup: 'inactive', 
                   toggleButtonText: 'Show Group'
                   };
    this.toggleGroup=this.toggleGroup.bind(this);                   
  }
  toggleGroup(){

    if ( this.state.toggleGroup == 'active'){
      this.setState({
        toggleGroup: 'inactive',
        toggleButtonText: 'Show Group'
      });
      
    }
    else {
      this.setState({
        toggleGroup: 'active',
         toggleButtonText: 'Hide Group'
      });
    } 
  }
  render() {
   let groupName = `${this.props.CharData.name}s`;
   return (
    <div class="group">
      <div class={this.state.toggleGroup}>
        <div id={this.props.CharData.name} class="group-name-bar character">
          <CharName 
            name={groupName} 
          />
          <div class="button-container">	             
            <Button text={this.state.toggleButtonText}
              id="expand" onClick={() => this.toggleGroup()} 
            /> 
          </div>
        </div> 
        <NPC 
          CharData={this.props.CharData}
          dynamicClasses={'character npc in-group'}
        />
        <NPC 
          CharData={this.props.CharData}
          dynamicClasses={'character npc in-group'}
        />
      </div>  
    </div>  
    )
  };
}
