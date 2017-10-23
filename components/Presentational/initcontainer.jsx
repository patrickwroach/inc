import React from 'react';
import { Encounter } from './encounter.jsx';
import { Button } from './button.jsx';


export class InitContainer extends React.Component {
  render() {  
      return (
      <div id="init-container" className="content-container">
        <div id="init-container-content" className="content">
         <Encounter />    
           
        </div>    
      </div>
    )
  };
}
