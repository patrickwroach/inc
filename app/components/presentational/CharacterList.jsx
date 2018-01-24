import React from 'react';
import { CharacterContainer } from '../containers/CharacterContainer.jsx';

export class CharacterList extends React.Component {
  render() {
    return this.props.characters.map((c) =>
      <li key={c.id} >
        <CharacterContainer
          id={c.id}
          initGroupId={this.props.initGroupId}
          name={c.name}
          hp={c.hp}
          hpMax={c.hpMax}
          handleAddHp={this.props.handleAddHp}
          handleEditName={this.props.handleEditName}
          handleRemoveCharacter={this.props.handleRemoveCharacter}
          handleRemoveInitGroup={this.props.handleRemoveInitGroup}
          onToggleNameEdit={this.props.handleToggleNameEdit}
          handleStartRound={this.props.handleStartRound}
          initPosition={this.props.initPosition}
        />
      </li>
    );
  }
}