import React from 'react';
export class Character extends React.Component {
    constructor(props){
    super(props);
    this.state = { name:'The Nameless One', id:'X1'};
  }
  render() {
   return (
           <div id="{state.id} " class="init-group">
		          <h1 class="char-name">{this.state.name}</h1>               
        
            
			</div>
	
      )
    };

  }
