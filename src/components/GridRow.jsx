import React from 'react';
import { propTypes } from 'prop-types';
import Grid from './Grid';
import { StyleSheet, css } from 'aphrodite';

class GridRow extends React.Component {

  render() {
    let key = 1;
    let gridList = [];
    for (let grid of this.props.gridList) {
      gridList.push(<Grid key={key++} color={grid.color} />)
    }

    return (
      <div className={css(styles.gridRowSize)}>
        {gridList}
      </div>
    );
  }
}

GridRow.propTypes = {

};

const styles = StyleSheet.create({
  gridRowSize: {
    display: 'flex'
  }
});


export default GridRow;