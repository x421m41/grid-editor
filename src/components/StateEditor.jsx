import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SquareIcon from 'material-ui/svg-icons/av/stop'
import _ from 'lodash';

class StateEditor extends Component {

  static propTypes = {
    handleChangeState: PropTypes.func.isRequired,
    onSaveClicked: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {selectedTab: 'dark', selectedMenuItem: 0};
  }

  handleTabChange = (selectedTab) => this.setState({selectedTab});

  handleMenuItemChange = (event, index, selectedMenuItem) => this.setState({selectedMenuItem});

  handleChangeDarkClick = () => {
    this.props.handleChangeState('V')
  }

  handleChangeStateClick = () => {
    this.props.handleChangeState(this.currentState)
  }

  render() {
    let menuItemList = _.isEmpty(this.props.cellStates)
      ? []
      : Object.entries(this.props.cellStates)
        .map(([text, color], index) => {
          if (this.state.selectedMenuItem === index) {
            this.currentState = text;
          }
          return <MenuItem
                  key={index}
                  value={index}
                  primaryText={text}
                  leftIcon={
                    <SquareIcon color={color} style = {styles.icon} />
                  }
                />;
        });

    return (
      <Tabs
        value={this.state.selectedTab}
        onChange={this.handleTabChange}>
        <Tab label="Change Dark" value="dark">
          <RaisedButton
            label="Dark"
            onClick={this.handleChangeDarkClick}
            style={styles.innterTabButton} />
          <RaisedButton
            label="Save"
            onClick={this.props.onSaveClicked}
            style={styles.innterTabButton} />
        </Tab>
        <Tab label="Change State" value="color">
        <RaisedButton
          label="change"
          onClick={this.handleChangeStateClick}
          style={styles.innterTabButton} />
          <DropDownMenu
            value={this.state.selectedMenuItem}
            onChange={this.handleMenuItemChange}
            style={styles.innterTabMenu}
            selectionRenderer={(value, child) =>
              <span>{child.props.leftIcon} {child.props.primaryText}</span>}>
            {menuItemList}
          </DropDownMenu>
        </Tab>
      </Tabs>
    );
  }
}

const styles = {
  innterTabButton: {
    display: 'inline-block',
    margin: 12,
    marginRight: 0,
    verticalAlign: 'middle'
  },
  innterTabMenu: {
    display: 'inline-block',
    margin: 12,
    marginTop: 0,
    marginLeft: 0,
    verticalAlign: 'middle',
    width: 180,
    height: 48
  },
  icon: {
    verticalAlign: 'middle'
  }
};

export default StateEditor;