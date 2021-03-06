import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';

import GridList from './GridList'
import Editor from './Editor'
import Main from './Main'

class App extends Component {

  render() {
    const { store } = this.props;
    return (
      <MuiThemeProvider>
        <Provider store={store}>
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
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
