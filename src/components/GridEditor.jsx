import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

class GridEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 'dark'};
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
        <Tab label="ChangeDark" value="dark">
          <RaisedButton label="Dark" style={style} />
        </Tab>
        <Tab label="ChangeColor" value="color">
        </Tab>
      </Tabs>
    );
  }
}

GridEditor.propTypes = {

};

const style = {
  margin: 12,
};

export default GridEditor;