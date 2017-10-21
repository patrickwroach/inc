import React from 'react';
import { CharName } from './CharName.jsx';
import { HpCount } from './HpCount.jsx';
import { Button } from './button.jsx';

export class NPC extends React.Component {
  constructor(props){
    super(props);
    this.state = { name:'Mysterious Enemy', hp:0, hpmax:0, hpInput:5};
    this.addHp = this.addHp.bind(this);
    this.minusHp = this.minusHp.bind(this);
    this.addInputHp = this.addInputHp.bind(this);
    this.minusInputHp = this.minusInputHp.bind(this);  
    this.handleInput=this.handleInput.bind(this);   
  }  

//Todo: Create Individual Classes for each of these functions? 
    
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
         <div id={this.props.name} className={this.props.dynamicClasses}>
           <CharName 
                    name={this.props.name} 
            />
           <HpCount hp={this.props.hp} 
                    hpmax={this.props.hpmax}
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
