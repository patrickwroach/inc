import React from 'react';
import { Button } from './button.jsx';


export class InitGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroup: 'inactive',
            toggleButtonText: 'Show Group'
        };
        this.toggleGroup = this.toggleGroup.bind(this);
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
    render() { 
        const amountArr = [0];
        const amountInt = parseInt(this.props.CharData.amount);
        amountArr.length = amountInt;   
        amountArr.fill(0); 
        //To Be Cleaned Up: Joe, Passing arrays as props kept wiping their length or their content and keeping them as a blank array, and the map function wasn't picking up on the blank arrays, so I just fill it here    
        const Characters = amountArr.map((amountArr, index)=>           
                <li key={index} className="char-bar">
                    <div className="char-name">
                        <h1 >{this.props.CharData.name}</h1>
                    </div>
                    <div className="hp-count">
                        <div className="hp">
                            <h2>{this.props.CharData.hp}/{this.props.CharData.hpmax}</h2>
                        </div>
                        <div className="hp-toggles">
                            <Button onClick={() => this.props.addHp(this.props.target)} text="+" target={this.props.target} />
                            <Button onClick={() => this.props.minusHp()} text="-" target={this.props.target} />
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
                {Characters}
            </ul>
        )

    };
}


