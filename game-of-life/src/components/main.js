import React, { Component } from 'react';

import Grid from './grid.js';

class Main extends Component {
  constructor(props) {
    super(props);

    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);

    gridCopy[row][col] = !gridCopy[row][col];

    this.setState({
      gridFull: gridCopy
    });
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  let clonedArr = arr.map(innerArr => innerArr.slice());

  return clonedArr;
}

export default Main;
