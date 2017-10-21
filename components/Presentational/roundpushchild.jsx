import React from 'react';
import { CharName } from './CharName.jsx';
import { HpCount } from './HpCount.jsx';
import { Button } from './button.jsx';


export class RoundPushChild extends React.Component {
  render() {
   return (
       
        <Button onClick={this.props.onClick}  />

      )
    };

  }
