import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import { StyleSheet, css } from 'aphrodite';

import * as MainActions from '../actions/MainActions'
import * as GridActions from '../actions/GridActions'

class GridList extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    const gridList = [];
    this.state = {redirect: false, gridList};
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {
    fetch('/griddata/grid-list.json')
      .then(res => res.json())
      .then(json => {
        this.setState({gridList: json});
        this.props.changeLoading(false);
    });
  }

  handleClick(id) {
    this.context.router.history.push(`/editor/${id}`);
  }

  render() {
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
          onClick={() => this.handleClick(grid.id)}
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

GridList.contextTypes = {
  router: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  base: {
    width: 480,
    height: 480,
    border: '1px solid #555'
  }
});

function mapState(state) {
  return {
    todos: state.todos
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(MainActions, dispatch)
  };
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(MainActions, dispatch),
})

export default connect(mapState, mapDispatchToProps)(GridList);
