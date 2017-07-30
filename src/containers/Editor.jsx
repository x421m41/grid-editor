import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

import GridView from '../components/GridView'
import GridDrawer from '../components/GridDrawer'

class Editor extends Component {

  constructor({match}) {
    super();
    this.id = match.params.id;
  }

  render () {
    return (
      <div>
        <div className={css(styles.base)}>
          <GridView gridid={this.id} loading={this.props.loading}/>
        </div>
        <div className={css(styles.base, styles.editor)}>
          <GridDrawer />
        </div>
      </div>
    )
  }
}

Editor.propTypes = {

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

export default Editor
