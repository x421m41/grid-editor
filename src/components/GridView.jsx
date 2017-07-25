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
      .then(json =>  this.setState({griddata: json}));
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const cellWidth = 20;
    const cellHeight = 20;

    const ctx = this.canvas.getContext('2d');

    let x = 0;
    let y = 0;

    for (const row of this.state.griddata) {
      for (const cell of row) {
        this.paintCell(ctx, x, y, cellWidth, cellHeight, this.colors[cell.color]);
        x = x + cellWidth;
      }
      y = y + cellHeight;
      x = 0;
    }
  }

  paintCell(ctx, x, y, width, height, color) {
    const range = {left: x, right: x + width, top: y, bottom: y + height};
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    if (this.isSelected(range, this.state.selectedRange)) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(x, y, width, height);
    }
  }

  isSelected(rectA, rectB) {
    return rectA.left < rectB.right && rectA.right > rectB.left &&
           rectA.top < rectB.bottom && rectA.bottom > rectB.top ;
  }

  handleMouseDown(e) {
    if (e.button === 0) {
      this.mouseDown = true;
      this.mouseMove = false;
      const x = e.clientX;
      const y = e.clientY;
      this.mouseDownPos = {x, y};
      console.log('left button down');
    }
  }

  handleMouseMove(e) {
    if (this.mouseDown) {
      this.mouseMove = true;
      const left = Math.min(this.mouseDownPos.x, e.clientX);
      const right = Math.max(this.mouseDownPos.x, e.clientX);
      const top = Math.min(this.mouseDownPos.y, e.clientY);
      const bottom = Math.max(this.mouseDownPos.y, e.clientY);
      this.setState({selectedRange: {left, right, top, bottom}})
    }
  }

  handleMouseUp(e) {
    this.mouseDown = false;
    if (!this.mouseMove) {
      const left = e.clientX;
      const right = e.clientX;
      const top = e.clientY;
      const bottom = e.clientY;
      this.setState({selectedRange: {left, right, top, bottom}})
    }
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
        />
    );
  }
}

GridView.propTypes = {

};

export default GridView;