import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from './components/presentational/navbar.jsx';
import { InitContainer } from './components/presentational/initcontainer.jsx';
import { Footer } from './components/presentational/footer.jsx';
import './styles/template.less';
import Logo from './assets/incounter-logo.svg';

export default class App extends React.Component {
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

//export default App;
ReactDOM.render(
<App />,
document.getElementById('app')
)




