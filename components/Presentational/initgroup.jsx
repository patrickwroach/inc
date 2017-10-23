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
        const Characters =  this.props.CharData.amount.map(()=>           
                <div className="char-bar">
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
                </div>
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


