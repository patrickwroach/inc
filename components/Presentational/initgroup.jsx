import React from 'react';
import { Button } from './button.jsx';


export class InitGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroup: 'inactive',
            toggleButtonText: 'Show Group',
            inputHp:5
        };
        this.toggleGroup = this.toggleGroup.bind(this);
        this.handleMathHp =  this.handleMathHp.bind(this);
        this.handleInputHp =  this.handleInputHp.bind(this);
    }
    toggleGroup() {

        if (this.state.toggleGroup == 'active') {
            this.setState({
                toggleGroup: 'inactive',
                toggleButtonText: 'Show Group'
            });

        }
        else {
            this.setState({
                toggleGroup: 'active',
                toggleButtonText: 'Hide Group'
            });
        }
    }
    handleInputHp(e){
        const newInputHp = e.target.value;
      
       this.setState({
            inputHp:newInputHp
        });

    }
    handleMathHp(toMath) {
     const amountToMath = toMath;
     const arrIndex = this.props.target;
     this.props.onAddHp(arrIndex, amountToMath);
    }
    

    render() { 
        const amountArr = [0];
        const amountInt = parseInt(this.props.CharData.amount);
        amountArr.length = amountInt;   
        amountArr.fill(0); 
        //To Be Cleaned Up: Joe, Passing arrays as props kept wiping their length or their content and keeping them as a blank array, and the map function wasn't picking up on the blank arrays, so I just fill it here    
        const Characters = amountArr.map((amountArr, index)=>           
                <li key={index} className="char-bar">
                    <div className="char-name">
                        <h1 >{this.props.CharData.name} <span class="groupNumber">{index + 1}</span></h1>
                    </div>
                    
                    <div className="hp-count">
                        <div className="hp">
                            <h2>{this.props.CharData.hp}/{this.props.CharData.hpmax}</h2>
                        </div>
                        <div className="hp-toggles">
                            <Button onClick={() => this.handleMathHp(1)} text="+1"  />
                            <Button onClick={() => this.handleMathHp(+this.state.inputHp)} text="+"  />
                            <input  onChange={this.handleInputHp} type="number" min="1" placeholder="5" className="inputToggle"/>
                            <Button onClick={() => this.handleMathHp(-this.state.inputHp)} text="-"  />
                            <Button onClick={() => this.handleMathHp(-1)} text="-1" />
                        </div>
                    </div>
                </li>
        );
       
        return (
            <ul id={this.props.key} className={'character' + ' ' + this.state.toggleGroup + ' ' + this.props.CharData.type}> 
                <div className="group-name-bar">
                        <div className="char-name">
                            <h1>{this.props.CharData.name}s</h1>
                        </div>
                        <div className="button-container">
                            <Button text={this.state.toggleButtonText} id="expand" onClick={() => this.toggleGroup()} />
                        </div>                 
                </div>
                <h3 className="init-number">Init: {this.props.CharData.init}</h3>                           
                {Characters}
            </ul>
        )

    };
}


