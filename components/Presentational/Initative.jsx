import React from 'react';
import { PC } from './PC.jsx';
import { NPCdisplay } from './NPCdisplay.jsx';

import { NPCGroup } from './NPCGroup.jsx';
import { Button } from './button.jsx';

export class Initative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numberOfPC:[], 
                  numberOfNPC:[], 
                  numberOfGroup:[]};
                    
    this.addPC = this.addPC.bind(this);
    this.removePC = this.removePC.bind(this);
  }
 
  addPC() {
    var newArray = this.state.numberOfPC.slice();    
    newArray.push("Character Name");   
    this.setState({numberOfPC:newArray});
    }
  removePC() {
    var newArray = this.state.numberOfPC.slice();    
    newArray.pop();   
    this.setState({numberOfPC:newArray});    
    }
     addNPC() {
    var newArray = this.state.numberOfNPC.slice();    
    newArray.push("Character Name");   
    this.setState({numberOfNPC:newArray});
    }
  removeNPC() {
    var newArray = this.state.numberOfNPC.slice();    
    newArray.pop();   
    this.setState({numberOfNPC:newArray});    
    }
   addGroup() {
    var newArray = this.state.numberOfGroup.slice();    
    newArray.push("Character Name");   
    this.setState({numberOfGroup:newArray});
    }
  removeGroup() {
    var newArray = this.state.numberOfGroup.slice();    
    newArray.pop();   
    this.setState({numberOfGroup:newArray});    
    }
 
    

render() {
    const PCsArray = this.state.numberOfPC;
    const PCs = PCsArray.map((number)=><li><PC /></li>);
    const NPCsArray = this.state.numberOfNPC;
    const NPCs = NPCsArray.map((number)=><li><NPCdisplay /></li>);
    const GroupArray = this.state.numberOfGroup;
    const Groups = GroupArray.map((number)=><li><NPCGroup /></li>);
    return (        
      <ul>
       <button onClick={() => this.addPC()}>+PC</button>
       <button onClick={() => this.removePC()}>-PC</button>
       <button onClick={() => this.addNPC()}>+NPC</button>
       <button onClick={() => this.removeNPC()}>-NPC</button>
       <button onClick={() => this.addGroup()}>Group</button>
       <button onClick={() => this.removeGroup()}>Group</button>
          {PCs} 
          {NPCs}  
          {Groups}       
           <li><Button text="Round End" id="roundEndButton" /></li>
           
            {/* <Button text="Add Char" id="addCharButton" /> */}
     </ul>	 
      
    );
  }
}