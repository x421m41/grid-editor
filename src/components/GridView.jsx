import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridRow from './GridRow'

class GridView extends Component {

  constructor() {
    super();
    this.state = {griddata: []};
  }

  componentWillMount() {
    console.log(`/griddata/grid${this.props.gridid}.json`)
    fetch(`/griddata/grid${this.props.gridid}.json`)
      .then(res => res.json())
      .then(json =>  this.setState({griddata: json}));
  }

  render() {
    let gridRowList = [];
    for (const row of this.state.griddata) {
      gridRowList.push(<GridRow gridList={row}/>)
    }

    return (
      <div>
        {gridRowList}
      </div>
    );
  }
}

GridView.propTypes = {

};

export default GridView;