import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MainActions from '../actions/MainActions'
import GridView from '../components/GridView'
import GridDrawer from '../components/GridDrawer'

class Editor extends Component {

  static propTypes = {
    changeLoading: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.changeLoading = props.changeLoading;
  }

  render () {
    return (
      <div>
        <div className={css(styles.base)}>
          <GridView gridId={this.id} changeLoading={this.changeLoading}/>
        </div>
        <div className={css(styles.base, styles.editor)}>
          <GridDrawer />
        </div>
      </div>
    )
  }
}

const gridDataList = ['grid1.json', 'grid2.json']

const styles = StyleSheet.create({
  base: {
    display: 'inline-block'
  },
  editor: {
    position: 'fixed',
    right: 0,
    top: 60,
    width: 300,
    height: '100%'
  }
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(MainActions, dispatch),
})

export default connect(null, mapDispatchToProps)(Editor);
