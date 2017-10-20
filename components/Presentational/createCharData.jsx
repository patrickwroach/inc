import React from 'react';
import { Button } from './button.jsx';
export class AddChar extends React.Component {
    render() {
       return (
        <div id="add-char-wizard" className={this.props.toggleWizard}>
            <div className="choice-container">
            <Button id="closer" text="&#10006;" onClick={() => this.props.closeWizard()} />
                <h2> What type of character are you adding? </h2>
                <div className="input-container">
                    <Button text="PC" onClick={() => this.props.addPC()} />
                    <Button  text="NPC" onClick={() => this.props.addNPC()} />
                    <Button  text="Group" onClick={() => this.props.addGroup()} />
                </div>
            </div>
        </div>  
     )
    };
}
