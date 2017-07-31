import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridRow from './GridRow'

class GridView extends Component {

  constructor() {
    super();
    this.state = {griddata: [], selectedRange: {}};
    this.colors = { 'white': '#ffffff', 'blue': '#0000ff', 'red': '#ff0000' }
  }

  componentDidMount() {
    console.log(`/griddata/grid${this.props.gridid}.json`)
    fetch(`/griddata/grid${this.props.gridid}.json`)
      .then(res => res.json())
      .then(json => {
        this.setState({griddata: json})
        this.paint();
      });
    this.ctx = this.canvas.getContext('2d');
    this.offscreen = document.createElement('canvas');
    this.offscreen.width = 600;
    this.offscreen.height = 600;
    this.offscreen_ctx = this.offscreen.getContext('2d');
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const cellWidth = 20;
    const cellHeight = 20;
    let x = 0;
    let y = 0;

    for (const row of this.state.griddata) {
      for (const cell of row) {
        this.paintCell(this.offscreen_ctx, x, y, cellWidth, cellHeight, this.colors[cell.color]);
        x = x + cellWidth;
      }
      y = y + cellHeight;
      x = 0;
    }
    this.ctx.drawImage(this.offscreen, 0, 0);
  }

  paintCell(ctx, x, y, width, height, color) {
    const range = {left: x, right: x + width, top: y, bottom: y + height};
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    if (this.isSelected(range, this.state.selectedRange)) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  }

  isSelected(rectA, rectB) {
    return rectA.left <= rectB.right && rectA.right >= rectB.left &&
           rectA.top <= rectB.bottom && rectA.bottom >= rectB.top ;
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
      this.setState({selectedRange: {left, right, top, bottom}})
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
      this.setState({selectedRange: {left, right, top, bottom}})
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
        width={600}
        height={600}
        onMouseDown={ e => this.handleMouseDown(e) }
        onMouseMove={ e => this.handleMouseMove(e) }
        onMouseUp={ e => this.handleMouseUp(e) }
        style={{cursor: 'default'}}
      />
    );
  }
}

GridView.propTypes = {

};

export default GridView;