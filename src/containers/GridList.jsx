import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import { StyleSheet, css } from 'aphrodite';

class GridList extends Component {

  constructor(props) {
    super(props);
    const gridList = [];
    this.state = {redirect: false, gridList};
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch('/griddata/grid-list.json')
      .then(res => res.json())
      .then(json =>  this.setState({gridList: json}));
  }

  handleClick(id) {
    this.setState({redirect: true});
    this.id = id;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/editor/${this.id}`} />;
    }

    let gridList = [];
    for (const grid of this.state.gridList) {
      const listItem = <ListItem
          key={grid.id}
          primaryText={grid.name}
          secondaryText={
            <p>
              change time: {grid.ctime} <br />
              modify time: {grid.mtime}
            </p>
          }
          secondaryTextLines={2}
          onClick={this.handleClick.bind(this, grid.id)}
        />

      gridList.push(listItem);
    }

    return (
      <div className={css(styles.base)}>
        <List>
          <Subheader>Grid List</Subheader>
          {gridList}
        </List>
      </div>
    );
  }
}

GridList.propTypes = {

};

const styles = StyleSheet.create({
  base: {
    width: 480,
    height: 480,
    border: '1px solid #555'
  }
});


export default GridList;