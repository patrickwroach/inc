import React from 'react';

export class Button extends React.Component {
  
  render() {
      return (
            <div id={this.props.id} class="button" onClick={this.props.onClick}>
                <p>{this.props.text}</p>
            </div>
      )
    };

  }
