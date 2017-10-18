import React from 'react';
import { Button } from './button.jsx';
import { NPCInGroup} from './NPCInGroup.jsx';
import { CharName } from './CharName.jsx';


export class NPCGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = { name:'Anonymous Minion',
                   toggleGroup: 'inactive', 
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
   let groupName = `${this.state.name}s`;
   return (
    <div class="group">
      <div class={this.state.toggleGroup}>
        <div id={this.state.name} class="group-name-bar character">
           <CharName name={groupName}    />
            <div class="button-container">	             
             <Button text={this.state.toggleButtonText} id="expand" onClick={() => this.toggleGroup()} /> 
          </div>
       </div> 
       <NPCInGroup name={this.state.name} />
       <NPCInGroup name={this.state.name} />
      </div>  
    </div>  
    )
  };
}
