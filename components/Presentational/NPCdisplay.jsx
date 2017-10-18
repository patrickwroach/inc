import React from 'react';
import { CharName } from './CharName.jsx';
import { HpCount } from './HpCount.jsx';

export class NPCdisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = { name:'Mysterious Enemy', hp:10, hpmax:10, hpInput:5};
    this.addHp = this.addHp.bind(this);
    this.minusHp = this.minusHp.bind(this);
    this.addInputHp = this.addInputHp.bind(this);
    this.minusInputHp = this.minusInputHp.bind(this);  
    this.handleInput=this.handleInput.bind(this);   
  } 
    
addHp() {       
    const newHp = this.state.hp + 1;
    this.setState({ hp: newHp });    
  }

minusHp() {      
  const newHp = this.state.hp - 1;
  this.setState({ hp: newHp });  
 
}

handleInput(x){
  this.setState({
    hpInput:x
  });
  
}

addInputHp() {
    const hpInput = this.state.hpInput;
    const parsedHPinput = parseInt(hpInput);
    //TODO: Input was getting passed as a string, don't know why 
    //parse is a hot fix
    const newHp = this.state.hp + parsedHPinput;
    this.setState({ hp: newHp });
}
  
 minusInputHp() {
    const hpInput = this.state.hpInput;
    const parsedHPinput = parseInt(hpInput);
    //TODO: Input was getting passed as a string, don't know why 
    //parse is a hot fix
    const newHp = this.state.hp - parsedHPinput;
    this.setState({ hp: newHp });
}

  
  render() {
   return (
         <div id={this.state.name} class="character npc">
           <CharName name={this.state.name} />
           <HpCount hp={this.state.hp} 
                    hpmax={this.state.hpmax}
                    getInput={this.handleInput}  
                    addHp={() => this.addHp()}
                    minusHp={() => this.minusHp()} 
                    addInputHp={() => this.addInputHp()}
                    minusInputHp={() => this.minusInputHp()}                               
            />                    
          </div>					

      )
    };

  }
