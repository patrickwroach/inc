import React from 'react';
import { CharName } from './CharName.jsx';
import { HpCount } from './HpCount.jsx';

export class NPC extends React.Component {
  render() {
   return (
         <div id={this.props.name} className={this.props.dynamicClasses}>
          <CharName 
            name={this.props.CharData.name} 
          />
          <HpCount
            arrayTargeter={this.props.arrayTargeter}
            hp={this.props.CharData.hp} 
            hpmax={this.props.CharData.hpmax} 
            getInput={this.props.handleInput}  
            addHp={() => this.props.addHp()}
            minusHp={() => this.props.minusHp()} 
            addInputHp={() => this.props.addInputHp()}
            minusInputHp={() => this.props.minusInputHp()}                           
            />                      
          </div>					

      )
    };

  }
