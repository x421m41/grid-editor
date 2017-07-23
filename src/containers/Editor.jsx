import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridView from '../components/GridView'
import { StyleSheet, css } from 'aphrodite';

class Editor extends Component {

  constructor({match}) {
    super();
    this.id = match.params.id;
  }

  render () {
    return (
      <div>
        <GridView gridid={this.id}/>
      </div>
    )
  }
}

Editor.propTypes = {

}

const gridDataList = ['grid1.json', 'grid2.json']

const styles = StyleSheet.create({
  base: {
    width: 400,
    height: 400,
    overflowX: 'scroll'
  }
});

export default Editor