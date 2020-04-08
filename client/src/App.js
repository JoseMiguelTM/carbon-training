import React, {Component} from 'react';
import './app.scss';
import MainHeader from './Components/Global/Header';
import {Content} from 'carbon-components-react/es/components/UIShell';

class App extends Component {
  render() {
    return(
      <>
        <MainHeader/>
        <Content></Content>
      </>
    );
  }
}

export default App;
