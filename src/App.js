import React, { Component } from 'react';
import InputContainer from './components/InputContainer';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className = 'App-header'>
          <div className = 'inline'>
              <h1>Stay up to date with ecommerce trends with Shopify’s newsletter</h1>
              <div className = 'divider-line'></div>
          </div>
        </div>
        <InputContainer />
      </div>
    );
  }
}

export default App;
