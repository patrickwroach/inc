import React from 'react';

export class CharName extends React.Component {
  render() {
   return (
           <div class="char-name">
             <h1 >{this.props.name}</h1>
           </div>
      )
    };

  }
