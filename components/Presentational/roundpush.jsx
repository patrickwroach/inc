import React from 'react';
import { CharName } from './CharName.jsx';
import { HpCount } from './HpCount.jsx';
import { Button } from './button.jsx';
import {RoundPushChild} from './roundpushchild.jsx';

export class RoundPush extends React.Component {
  render() {
   return (
       
        <RoundPushChild  onClick={this.props.onClick} text='fuuucckk' />

      )
    };

  }
