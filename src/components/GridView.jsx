import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import _ from 'lodash';

class GridView extends Component {

  static propTypes = {
    gridData: PropTypes.object.isRequired,
    onChangeSelectionBound: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.cellWidth = 0;
    this.cellHeight = 0;
    this.selectionBound = {
      left: -1,
      right: -1,
      top: -1,
      bottom: -1
    };
    this.state = {scale: 1.0};
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const { gridData } = this.props;

    this.ctx.fillStyle = '#EEEEEE';
    this.ctx.fillRect(0, 0, 800, 800);

    if (_.isEmpty(gridData)) return;

    this.paintCell();
    this.paintGrid();
  }

  paintCell() {
    const { gridData } = this.props;
    const ctx = this.ctx;
    const cellWidth = gridData.info.cellWidth * this.state.scale;
    const cellHeight = gridData.info.cellHeight * this.state.scale;

    let x = 0;
    let y = 0;
    let columnCount = 0;
    let rowCount = 0;

    for (const row of gridData.map) {
      x = 0;
      columnCount = 0;
      for (const cell of row) {
        const color = gridData.info.state[cell.state];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        if (this.isSelected(columnCount, rowCount)) {
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = '#FFD600';
          ctx.fillRect(x, y, cellWidth, cellHeight);
          ctx.globalAlpha = 1;
        }
        x = x + cellWidth;
        ++columnCount;
      }
      y = y + cellHeight;
      ++rowCount;
    }
  }

  paintGrid() {
    const ctx = this.ctx;
    const cellWidth = this.props.gridData.info.cellWidth * this.state.scale;
    const cellHeight = this.props.gridData.info.cellHeight * this.state.scale;

    ctx.strokeStyle = '#9E9E9E';
    ctx.lineWidth = 1.0;
    for (let x = 0.5; x < 800; x += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = 0.5; y < 800; y += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(800, y);
      ctx.stroke();
    }
  }

  isSelected(column, row) {
    const {left, right, top, bottom} = this.selectionBound;
    return column >= left && column <= right &&
           row >= top && row <= bottom;
  }

  paintIfSelectionChanged(left, right, top, bottom) {
    const cellWidth = this.props.gridData.info.cellWidth * this.state.scale;
    const cellHeight = this.props.gridData.info.cellHeight * this.state.scale;

    if (cellWidth === 0 || cellHeight === 0)
      return;

    const current = {
      left: Math.floor(left / cellWidth),
      right: Math.floor(right / cellWidth),
      top: Math.floor(top / cellHeight),
      bottom: Math.floor(bottom / cellHeight)
    }

    if (!this.isSameBound(this.selectionBound, current)) {
      this.selectionBound = current;
      this.props.onChangeSelectionBound(current);
      this.paint();
    }
  }

  isSameBound(boundA, boundB) {
    return boundA.left === boundB.left &&
           boundA.right === boundB.right &&
           boundA.top === boundB.top &&
           boundA.bottom === boundB.bottom;
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
      this.paintIfSelectionChanged(left, right, top, bottom);
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
      this.paintIfSelectionChanged(left, right, top, bottom);
    }
  }

  getMousePos(e) {
      var rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
  }

  handleSliderValueChange = (e, val) => {
    this.setState({scale: val});
  }

  render() {
    return (
      <div>
        <Slider
          min={0.5}
          max={3.0}
          defaultValue={1.0}
          onChange={this.handleSliderValueChange}
          sliderStyle={styles.slider}
          step={0.01}/>
        <canvas
          ref={canvas => this.canvas = canvas}
          width={800}
          height={800}
          onMouseDown={ e => this.handleMouseDown(e) }
          onMouseMove={ e => this.handleMouseMove(e) }
          onMouseUp={ e => this.handleMouseUp(e) }
          style={{cursor: 'default'}}
        />
      </div>
    );
  }
}
const styles = {
  slider: {
    margin: 12,
    marginTop: 0
  }
}
export default GridView;
