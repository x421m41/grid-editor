import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, css} from 'aphrodite';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeLoading} from '../actions/MainActions'
import {changeGridData, changeSelection, changeState} from '../actions/GridActions';

import GridView from '../components/GridView'
import GridDrawer from '../components/GridDrawer'

class Editor extends Component {

  static propTypes = {
    changeLoading: PropTypes.func.isRequired,
    changeGridData: PropTypes.func.isRequired,
    changeSelection: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
    selectionBound: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = StyleSheet.create({
    base: {
      display: 'inline-block'
    },
    editor: {
      position: 'fixed',
      right: 0,
      top: 64,
      width: 300,
      height: '100%'
    }
  });

  constructor(props) {
    super(props);
    this.gridId = props.match.params.id;
    this.gridData = {};
  }

  handleChangeState = (state) => {
    this.props.changeState(state);
  }

  handleSaveState = () => {

  }

  componentDidMount() {
    const {changeLoading, changeGridData} = this.props;
    changeLoading(true);
    fetch(`/griddata/grid${this.gridId}.json`)
      .then(res => res.json())
      .then(gridData => {
        changeGridData(gridData)
        changeLoading(false);
      });
  }

  render() {
    const {gridData, changeSelection, selectionBound} = this.props;

    return (
      <div>
        <div className={css(Editor.styles.base)}>
          <GridView
            gridData={gridData}
            onChangeSelectionBound={changeSelection}/>
        </div>
        <div className={css(Editor.styles.base, Editor.styles.editor)}>
          <GridDrawer
            gridInfo={gridData.info}
            selectionBound={selectionBound}
            handleChangeState={this.handleChangeState}
            onSaveClicked={this.handleSaveState}/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    changeLoading,
    changeGridData,
    changeSelection,
    changeState
  }, dispatch)
})

const mapStateToProps = (state) => {
  return {
    gridData: state.grid.gridData,
    selectionBound: state.grid.selectionBound
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
