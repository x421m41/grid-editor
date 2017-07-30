import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

class GridEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 'good'};
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Good" value="good">
        </Tab>
        <Tab label="Bad" value="bad">
        </Tab>
      </Tabs>
    );
  }
}

GridEditor.propTypes = {

};

export default GridEditor;