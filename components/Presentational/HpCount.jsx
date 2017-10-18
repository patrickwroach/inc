import React from 'react';
import { Hp } from './Hp.jsx';

export class HpCount extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        childHpInput:0
    }
    this.passingProps = this.passingProps.bind(this);
    
  }

  passingProps(e){
    var newInput=e.target.value;
    this.setState({
       childHpInput: newInput
    },()=>this.props.getInput(this.state.childHpInput));
  }

  handleUserInput(e){
   this.setState ({ childHpInput: e.target.value });
  }
  
  render() {
   return (
    <div class="hp-count">
      <Hp hp={this.props.hp} hpmax={this.props.hpmax} /> 
        <div class="hp-toggles">
          <a onClick={() => this.props.addHp()}>+1</a>
           <div class="inputToggle">
                <a onClick={() => this.props.addInputHp()}>+</a>
                    <input type="number" onChange={this.passingProps} placeholder="5" />
                <a onClick={() => this.props.minusInputHp()}>-</a>
            </div> 
          <a onClick={() => this.props.minusHp()}>-1</a>
       </div>  
     </div>   
    )
  };
}
