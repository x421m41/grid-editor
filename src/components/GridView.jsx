import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {changeGridData, changeSelection} from '../actions/GridActions';

class GridView extends PureComponent {

  static propTypes = {
    gridId: PropTypes.string.isRequired,
    changeLoading: PropTypes.func.isRequired,
    changeGridData: PropTypes.func.isRequired,
    changeSelection: PropTypes.func.isRequired,
    selectionBound: PropTypes.object,
    gridData: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.changeLoading = props.changeLoading;
    this.changeGridData = props.changeGridData;
    this.changeSelection = props.changeSelection;
    this.gridId = props.gridId;
    this.gridInfo = {};
  }

  componentDidMount() {
    this.changeLoading(true);
    this.ctx = this.canvas.getContext('2d');
    fetch(`/griddata/grid${this.gridId}.json`)
      .then(res => res.json())
      .then(json => {
        this.gridInfo = json.gridInfo;
        this.changeGridData(json.gridData)
        this.changeLoading(false);
      });
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    if (_.isEmpty(this.props.gridData)) return;

    const cellWidth = this.gridInfo.cellWidth;
    const cellHeight = this.gridInfo.cellHeight;
    let x = 0;
    let y = 0;
    let columnCount = 0;
    let rowCount = 0;

    this.ctx.fillStyle = '#DDDDDD';
    this.ctx.fillRect(0, 0, 800, 800);

    for (const row of this.props.gridData) {
      for (const cell of row) {
        const color = this.gridInfo.state[cell.state];
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, cellWidth, cellHeight);
        if (this.isSelected(columnCount, rowCount)) {
          this.ctx.globalAlpha = 0.5;
          this.ctx.fillStyle = '#ffff00';
          this.ctx.fillRect(x, y, cellWidth, cellHeight);
          this.ctx.globalAlpha = 1;
        }
        x = x + cellWidth;
        ++columnCount;
      }
      y = y + cellHeight;
      x = 0;
      ++rowCount;
      columnCount = 0;
    }
  }

  isSelected(column, row) {
    const {left, right, top, bottom} = this.props.selectionBound;
    return column >= left && column <= right &&
           row >= top && row <= bottom;
  }

  dispatchIfSelectionChanged(left, right, top, bottom) {
    const current = {
      left: Math.floor(left / this.gridInfo.cellWidth),
      right: Math.floor(right / this.gridInfo.cellWidth),
      top: Math.floor(top / this.gridInfo.cellHeight),
      bottom: Math.floor(bottom / this.gridInfo.cellHeight)
    }

    if (!this.isSameBound(this.props.selectionBound, current)) {
      this.props.changeSelection(current)
    }
  }

  isSameBound(boundA, boundB) {
    return boundA.left == boundB.left &&
           boundA.right == boundB.right &&
           boundA.top == boundB.top &&
           boundA.bottom == boundB.bottom;
  }

  handleMouseDown(e) {
    if (e.button === 0) {
      this.mouseDown = true;
      this.mouseMove = false;
      const {x, y} = this.getMousePos(e);
      this.mouseDownPos = {x, y};
    }
  }

  handleMouseMove(e) {
    if (this.mouseDown) {
      this.mouseMove = true;
      const {x, y} = this.getMousePos(e);
      const left = Math.min(this.mouseDownPos.x, x);
      const right = Math.max(this.mouseDownPos.x, x);
      const top = Math.min(this.mouseDownPos.y, y);
      const bottom = Math.max(this.mouseDownPos.y, y);
      this.dispatchIfSelectionChanged(left, right, top, bottom);
    }
  }

  handleMouseUp(e) {
    this.mouseDown = false;
    if (!this.mouseMove) {
      const {x, y} = this.getMousePos(e);
      const left = x;
      const right = x;
      const top = y;
      const bottom = y;
      this.dispatchIfSelectionChanged(left, right, top, bottom);
    }
  }

  getMousePos(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
  }

  render() {
    return (
      <canvas
        ref={canvas => this.canvas = canvas}
        width={800}
        height={800}
        onMouseDown={ e => this.handleMouseDown(e) }
        onMouseMove={ e => this.handleMouseMove(e) }
        onMouseUp={ e => this.handleMouseUp(e) }
        style={{cursor: 'default'}}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectionBound: state.gridEditor.selectionBound,
    gridData: state.gridEditor.gridData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeGridData, changeSelection}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
