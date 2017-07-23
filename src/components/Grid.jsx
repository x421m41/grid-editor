import React from 'react';
import { propTypes } from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.colors = [styles.red, styles.green, styles.white, styles.blue];
    this.state = {color: styles[this.props.color], size: this.createSize(20, 20)};
    this.handleClick = this.handleClick.bind(this);
  }



  createSize(width, height) {
    if (width <= 0) {
      this.width = width;
      this.height = height;
    }
    return StyleSheet.create({size: {width: width, height: height}}).size;
  }

  handleClick(e) {
    e.preventDefault();
    const color = this.colors.shift();
    this.colors.push(color);
    this.setState({color: color});
  }

  render () {
    return (
      <div className={css(styles.base, this.state.size, this.state.color)}
           onClick={this.handleClick}
           onWheel={this.handleWheel}>
      </div>
    )
  }
}

Grid.propTypes = {

}

const styles = StyleSheet.create({
  base: {
    boxSizing: 'border-box',
    display: 'table',
    textAlign: 'center',
    display: 'inline-block',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.5s ease',
    ':hover': {
      border: '1px solid #555'
    }
  },
  size: {
    width: 20,
    minWidth: 20,
    height: 20,
    minHeight: 20
  },
  white: {
    backgroundColor: 'white'
  },
  red: {
    backgroundColor: 'red'
  },
  blue: {
    backgroundColor: 'blue',
  },
  green: {
    backgroundColor: 'green',
  }
});

export default Grid