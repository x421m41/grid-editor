import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GridList from './containers/GridList'
import Editor from './containers/Editor'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            <Route exact path="/" component={GridList}/>
            <Route path="/editor/:id" component={Editor}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
