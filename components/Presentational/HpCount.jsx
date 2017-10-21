import React from 'react';
import { Hp } from './Hp.jsx';
import { Button } from './button.jsx';

export class HpCount extends React.Component {
 render() {
   return (
    <div className="hp-count">
      <Hp hp={this.props.hp} hpmax={this.props.hpmax} />
      <Button arrayTargeter={this.props.arrayTargeter} onClick={() => this.props.getTarget(this.props.arrayTargeter)} />
        {/* <div className="hp-toggles">
           <a onClick={() => this.props.addHp()}>+1</a>
           <div className="inputToggle">
                <a onClick={() => this.props.addInputHp()}>+</a>
                    <input type="number" onChange={this.passingProps} placeholder="5" />
                <a onClick={() => this.props.minusInputHp()}>-</a>
            </div> 
          <a onClick={() => this.props.minusHp()}>-1</a>
       </div>   */}
     </div>   
    )
  };
}
