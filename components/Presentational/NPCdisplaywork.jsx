import React from 'react';
import { CharName } from './CharName.jsx';

export class NPCdisplaywork extends React.Component {
    constructor(props){
    super(props);
    this.state = { name:'Mysterious Enemy', hp:10, hpmax:10, hpInput:3};
    this.addHp = this.addHp.bind(this);
    this.minusHp = this.minusHp.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.addInputHp = this.addInputHp.bind(this);
    this.minusInputHp = this.minusInputHp.bind(this);   
    }
  
//TODO ??? Strip functions and states and store them in container components? 
  addHp() {
       
    const newHp = this.state.hp + 1;
    this.setState({ hp: newHp });
    
  }
  minusHp() {
       
    const newHp = this.state.hp - 1;
    this.setState({ hp: newHp });
    
  }

  handleUserInput(e){
  this.setState ({ hpInput: e.target.value });
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
          
            <div class="hp-count">
							<div class="hp">
								<h2>{this.state.hp}/{this.state.hpmax}</h2>
							</div>
							<div class="hp-toggles">
                  <a  onClick={this.addHp}>+1</a>
                  <div class="inputToggle">
                    <a onClick={this.addInputHp}>+</a>
                    <input type="number" onChange={this.handleUserInput}  value={this.state.hpInput} />
                    <a onClick={this.minusInputHp}>-</a>
                  </div>
                  <a  onClick={this.minusHp}>-1</a>                
              </div>       
            </div>          
          </div>					

      )
    };

  }
