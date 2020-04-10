import React, {Component} from 'react';
import './app.scss';
import MainHeader from './Components/Global/Header';
import {Content} from 'carbon-components-react/es/components/UIShell';
import {
  Route,
  Switch
} from 'react-router-dom';
import AddData from './Components/Content/AddData';
import ViewData from './Components/Content/ViewData';
import LandingPage from './Components/Content/LandingPage';

class App extends Component {
  render() {
    return(
      <>
        <MainHeader/>
        <Content>
          <Switch>
            <Route
              exact
              path = "/"
              component = {LandingPage}
            />
            <Route
              path = "/viewData"
              component = {ViewData}
            />
            <Route
              path = "/addData"
              component = {AddData}
            />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
