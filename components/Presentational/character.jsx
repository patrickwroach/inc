import React from 'react';
import { NPC } from './NPC.jsx';
import { PC } from './PC.jsx';
import { NPCGroup } from './NPCGroup.jsx';


export class Character extends React.Component {
 
  
  render() {
  const type = this.props.type;
  
  if (type == 'NPC') {
   return (
       <NPC name={this.props.name} hp={this.props.hp} dynamicClasses={'character npc in-group'}/>                   
      )
    }else if (type == 'PC'){
       return (
       <PC id={this.props.key} name={this.props.name} />                   
      )
    }else {
       return (
       <NPCGroup  name={this.props.name} hp={this.props.hp} />                   
      )
    }
  }
}
