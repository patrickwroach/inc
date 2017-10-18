import React from 'react';

export class NavBar extends React.Component {
  render() {
    const currentRound = 0;
    
      return (
            <div id="navbar" className="content-container">
                <div class="content">
                    <div className="logo">
                        <img src="../assets/incounter-logo.svg" alt="logo" />
                    </div>
                    <p>Round <span>{currentRound}</span></p>
                </div>
            </div>
      )
    };

  }
