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

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

  export default Main;
