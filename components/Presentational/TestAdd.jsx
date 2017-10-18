import React from 'react';
import { Button } from './button.jsx';
export class TestAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:[1],
                   };
    this.addChild = this.addChild.bind(this);
  }
  addChild() {
    var newArray = this.state.id.slice();    
    newArray.push("new value");   
    this.setState({id:newArray});
    var ArrayTest = this.state.id;
    console.log(ArrayTest);
    }
    removeChild() {
    var newArray = this.state.id.slice();    
    newArray.pop();   
    this.setState({id:newArray});
    var ArrayTest = this.state.id;
    console.log(ArrayTest);
    }
 
    

    render() {  
      const numbers = this.state.id;
      const listItems = numbers.map((number)=><li><Button text={number} /></li>);
      return (
            <div>
                <h1>App main component! </h1>
              <button onClick={() => this.addChild()}>Add component</button>
               <button onClick={() => this.removeChild()}>take component</button>
              <ul>{listItems}</ul>
                
                
            </div>
        );
    }
}