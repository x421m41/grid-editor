import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'

import GridInfo from './GridInfo'
import StateEditor from './StateEditor'

class GridDrawer extends Component {

  static propTypes = {
    handleChangeState: PropTypes.func.isRequired,
    onSaveClicked: PropTypes.func.isRequired,
    selectionBound: PropTypes.object.isRequired,
    gridInfo: PropTypes.object
  };

  render() {
    return (
      <Paper
        zDepth={4}
        style={{height: '100%'}}
      >
        <GridInfo selectionBound={this.props.selectionBound}/>
        <div style={styles.editor}>
          <StateEditor
            cellStates={this.props.gridInfo.state}
            onSaveClicked={this.props.onSaveClicked}
            handleChangeState={this.props.handleChangeState} />
        </div>
      </Paper>
    );
  }
}

const styles = {
  editor: {
    height: 250,
    width: 300,
    position:
    'fixed',
    bottom: 0
  }
}

export default GridDrawer;