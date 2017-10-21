import React from 'react';

export class Hp extends React.Component {
  render() {
   return (
      <div className="hp">
				<h2>{this.props.hp}/{this.props.hpmax}</h2>
			</div>
      )
    };

  }
  