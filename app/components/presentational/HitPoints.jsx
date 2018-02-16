import React from 'react';
import { Button } from './button.jsx';

export class HitPoints extends React.Component {
  render() {
    return (
      <div className="hp-count">
        <div className="hp">
          <h2>{this.props.hp}/{this.props.hpMax}</h2>
        </div>
        <div className="hp-toggles">
          <Button onClick={() => this.props.handleAddHp(1)} text="+1" />
          <Button onClick={() => this.props.handleAddHp(+this.props.inputHp)} text="+" />
          <input
            onChange={this.props.handleInputHp}
            type="number"
            min="1"
            placeholder="5"
            onFocus={(e) => e.target.placeholder = ""}
            className="inputToggle"
          />
          <Button onClick={() => this.props.handleAddHp(-this.props.inputHp)} text="-" />
          <Button onClick={() => this.props.handleAddHp(-1)} text="-1" />
        </div>
      </div>
    );
  }
}