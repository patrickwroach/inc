import React from 'react';
import { HitPoints } from '../presentational/HitPoints.jsx';

export class HitPointsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHp: 5
    }
    this.handleInputHp = this.handleInputHp.bind(this);
  }

  handleInputHp(e) {
    const newInputHp = e.target.value;
    this.setState({
      inputHp: newInputHp
    });
  }

  render() {
    return (
      <HitPoints
        hp={this.props.hp}
        hpMax={this.props.hpMax}
        inputHp={this.state.inputHp}
        handleInputHp={this.handleInputHp}
        handleAddHp={this.props.handleAddHp}
      />
    );
  }
}