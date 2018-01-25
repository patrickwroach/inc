import React from 'react';
import { InitGroup } from './initgroup.jsx';

export class InitGroupList extends React.Component {

  handleGetCharacters
  render() {
    return this.props.initGroups.map((ig, index) =>
      <li key={ig.id}>
        <InitGroup
          id={ig.id}
          name={ig.name}
          init={ig.init}
          type={ig.type}
          initPosition={index}
          charArray={this.props.handleGetCharacters(ig.charIds)}
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