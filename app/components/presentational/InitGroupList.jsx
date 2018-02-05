import React from 'react';
import { InitGroupContainer } from '../containers/InitGroupContainer.jsx';

export class InitGroupList extends React.Component {
  render() {
    return this.props.initGroups.map((ig, index) =>
      <li key={ig.id}>
        <InitGroupContainer
          id={ig.id}
          name={ig.name}
          init={ig.init}
          type={ig.type}
          initPosition={index}
          characters={this.props.handleGetCharacters(ig.charIds)}
          currentRound={this.props.currentRound}
          handleAddHp={this.props.handleAddHp}
          handleEditName={this.props.handleEditName}
          handleRemoveInitGroup={this.props.handleRemoveInitGroup}
          handleRemoveCharacter={this.props.handleRemoveCharacter}
          handleEditCharName={this.props.handleEditCharName}
          handleEditInit={this.props.handleEditInit}
          handleStartRound={this.props.handleStartRound}
        />
      </li>
    );
  }
}