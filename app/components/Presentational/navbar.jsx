import React from 'react';

export class NavBar extends React.Component {
  render() {
    return (
      <div id="navbar" className="content-container">
        <div className="content">
          <div className="logo">
            <img src={this.props.logo} alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}
