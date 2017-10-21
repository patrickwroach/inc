import React from 'react';
import { NPC } from './NPC.jsx';
import { PC } from './PC.jsx';
import { NPCGroup } from './NPCGroup.jsx';


export class Character extends React.Component {
  
  render() {
  const type = this.props.CharData.type;
  
  if (type == 'NPC') {
   return (
        <NPC
          CharData={this.props.CharData}
          arrayTargeter={this.props.arrayTargeter}
          dynamicClasses={'character npc in-group'}      
          getTarget={() => this.props.getTarget()}  
          addHp={() => this.props.addHp()}
          minusHp={() => this.props.minusHp()} 
          addInputHp={() => this.props.addInputHp()}
          minusInputHp={() => this.props.minusInputHp()}       
        />                     
      )
    }else if (type == 'PC'){
       return (
        <PC 
          id={this.props.key} 
          name={this.props.CharData.name}
          arrayTargeter={this.props.arrayTargeter}
        />                   
      )
    }else {
       return (
        <NPCGroup   
          CharData={this.props.CharData}
          arrayTargeter={this.props.arrayTargeter}
          dynamicClasses={'character npc in-group'}      
          getInput={this.props.handleInput}  
          addHp={() => this.props.addHp()}
          minusHp={() => this.props.minusHp()} 
          addInputHp={() => this.props.addInputHp()}
          minusInputHp={() => this.props.minusInputHp()}    
        />                   
      )
    }
  }
}
