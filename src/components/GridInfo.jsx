import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';

class GridInfo extends Component {

  static propTypes = {
    selectionBound: PropTypes.object.isRequired,
  };

  render() {
    const {left, right, top, bottom} = this.props.selectionBound;

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Property</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>Left</TableRowColumn>
            <TableRowColumn>{left}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Right</TableRowColumn>
            <TableRowColumn>{right}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Top</TableRowColumn>
            <TableRowColumn>{top}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Bottom</TableRowColumn>
            <TableRowColumn>{bottom}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

GridInfo.propTypes = {

};

export default GridInfo;