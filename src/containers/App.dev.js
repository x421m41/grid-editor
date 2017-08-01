import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';

import reducer from '../reducers'
import GridList from './GridList'
import Editor from './Editor'
import Main from './Main'
import DevTools from './DevTools';

class App extends Component {

  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <Router>
              <div className="App">
                <Main>
                  <Redirect from="/" to="/list" />
                  <Route path="/list" render={props =>
                    <GridList {...props} />
                  } />
                  <Route path="/editor/:id" component={Editor}/>
                </Main>
              </div>
            </Router>
            <DevTools />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
