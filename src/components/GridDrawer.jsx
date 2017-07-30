import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'

import GridEditor from './GridEditor'

class GridDrawer extends Component {
  render() {
    return (
      <Paper
        zDepth={5}
        style={{height: '100%'}}
      >
        <div style={{height: 200, width: 300, position: 'fixed', bottom: 0}}>
          <GridEditor />
        </div>
      </Paper>
    );
  }
}

GridDrawer.propTypes = {

};

export default GridDrawer;