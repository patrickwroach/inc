import React from 'react';
import { NavBar } from './components/presentational/navbar.jsx';
import { InitContainer } from './components/presentational/initcontainer.jsx';
import { Footer } from './components/presentational/footer.jsx';
import './styles/template.less';
import Logo from './assets/incounter-logo.svg';
import { Analytics } from './data/Analytics.js';

export default class App extends React.Component {
  componentDidMount() {
    Analytics.initialize();
    Analytics.pageView('incounter-app-home');
  }
  render() {
    return (     
      <div>  
          <NavBar logo={Logo} />
            
          <InitContainer />
      
          <Footer />     
      </div>    
    );
  }
}




