import React from 'react';

export class CharName extends React.Component {
  render() {
   return (
           <div>
             <h1 class="char-name">{this.props.name}</h1>
           </div>
      )
    };

  }
