import React from 'react';
import { Encounter } from './Encounter.jsx';
import { Button } from './button.jsx';


export class InitContainer extends React.Component {
  render() {  
      return (
      <div id="init-container" class="content-container">
        <div id="init-container-content" class="content">
         <Encounter />    
           
        </div>    
      </div>
    )
  };
}
