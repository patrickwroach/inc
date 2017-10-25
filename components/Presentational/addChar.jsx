import React from 'react';
import { Button } from './button.jsx';
export class AddChar extends React.Component {
     constructor(props) {
    super(props);
    
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewPC = this.handleNewPC.bind(this);
        this.handleNewGroup= this.handleNewGroup.bind(this);
        this.handleNewNPC = this.handleNewNPC.bind(this);
        this.handleNewHp= this.handleNewHp.bind(this);
        this.handleNewAmount = this.handleNewAmount.bind(this);
        this.handleNewInit = this.handleNewInit.bind(this);
             
             
     }

    handleNewName(e) {
        const name = e.target.value;
        this.props.onChangeName(name);
    }

    handleNewInit(e) {
    const init = e.target.value;
    this.props.onChangeInit(init)
    }
    
    handleNewPC() {
        const type='PC';
        this.props.onChangeType(type);
        this.props.toggleHideAmount();
        this.props.toggleHideHp();
        //Todo -reset here is clumsy
        document.getElementById("NPC-entries").reset();
        document.getElementById("Group-entries").reset();
    
    }
    handleNewNPC() {
        const type='NPC';
        this.props.onChangeType(type);
        this.props.toggleHideAmount();
        this.props.toggleShowHp();
        //Todo -reset here is clumsy
        document.getElementById("Group-entries").reset();
      
    }
    handleNewGroup() {
        const type='Group';
        this.props.onChangeType(type);
        this.props.toggleShowAmount();
        this.props.toggleShowHp();
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
                <form id="char-wiz-form" className="input-container">
                    <h1>{this.props.nameT}</h1>
                    <p>Name:<input onChange={this.handleNewName}  type="text" /></p>
                    <p>Initiative <input onChange={this.handleNewInit} type="number" /></p>
                </form>
                <Button addClass={this.props.selectedType +' '+"PCbox"} text="PC" onClick={() => 
                    this.handleNewPC()} />
                <Button addClass={this.props.selectedType +' '+"NPCbox"} text="NPC" onClick={() => this.handleNewNPC()} />
                <Button addClass={this.props.selectedType +' '+"Groupbox"}  text="Group" onClick={() => this.handleNewGroup()} />
                <form id="NPC-entries">
                     <p id="hp-entry" className={this.props.hpVis}>Hit Points <input onChange={this.handleNewHp} type="number"  /></p>
                </form>
                <form id="Group-entries">
                     <p id="amount-entry" className={this.props.amountVis}>How many? <input onChange={this.handleNewAmount} type="number"  min="1"/></p>
                </form>
                <br />
                <Button text="Add" onClick={() => this.props.onAddCharClick()} />
                 
               
            </div>
        </div>  
     )
    };
}
