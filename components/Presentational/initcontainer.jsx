import React from 'react';
import { Initative } from './Initative.jsx';
import { Button } from './button.jsx';


export class InitContainer extends React.Component {
  // componentDidMount() {
  //   window.prompt("This will eventually be intial enter character prompt","Name will go Here");
  // }

  render() {  
      return (
      <div id="init-container" class="content-container">
        <div id="init-container-content" class="content">
         <Initative />      
           
        </div>    
      </div>
    )
  };
}
