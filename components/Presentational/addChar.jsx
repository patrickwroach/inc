import React from 'react';
import { Button } from './button.jsx';
export class AddChar extends React.Component {
     constructor(props) {
    super(props);
        this.state={                   
                        name:"",
                        type:"",
                        hp:0,
                        hpmax:0,
                        init:0,
                        amount:2,
                    
                    }
     
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewPC = this.handleNewPC.bind(this);
        this.handleNewGroup= this.handleNewGroup.bind(this);
        this.handleNewNPC = this.handleNewNPC.bind(this);
        this.handleNewHp= this.handleNewHp.bind(this);
        this.handleNewAmount = this.handleNewAmount.bind(this);
             
             
     }

    handleNewName(e) {
        const name = e.target.value;
        this.props.onChangeName(name);
    }
    
    handleNewPC() {
        const type='PC';
        this.props.onChangeType(type);
    }
    handleNewNPC() {
        const type='NPC';
        this.props.onChangeType(type);
    }
    handleNewGroup() {
        const type='Group';
        this.props.onChangeType(type);
    }

    handleNewHp(e) {
    const hp= e.target.value;
    this.props.onChangeHp(hp)
    }

    handleNewAmount(e) {
    const amount = e.target.value;
    this.props.onChangeAmount(amount)
    }

    render() {
       return (
        <div id="add-char-wizard" className={this.props.toggleWizard}>
            <div className="choice-container">
            <Button id="closer" text="&#10006;" onClick={() => this.props.closeWizard()} />
                <h2> Add a character to the Encoutner </h2>
                <div className="input-container">
                    <h1>{this.props.nameT}</h1>
                    <p>Name:<input onChange={this.handleNewName}  type="text" /></p>
                    <p>Hit Points <input onChange={this.handleNewHp} type="number" /></p>
                    <Button text="PC" onClick={() => this.handleNewPC()} />
                    <Button  text="NPC" onClick={() => this.handleNewNPC()} />
                    <Button  text="Group" onClick={() => this.handleNewGroup()} />
                     <p>How many? <input onChange={this.handleNewAmount} type="number" min="1"/></p>
                    <Button text="Add" onClick={() => this.props.onAddCharClick()} />
                  
                </div>
            </div>
        </div>  
     )
    };
}
