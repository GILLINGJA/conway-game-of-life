import React, { Component } from 'react';

import Grid from './grid.js';
import Buttons from './buttons.js';

class Main extends Component {
  constructor(props) {
    super(props);

    this.rows = 30;
    this.cols = 50;
    this.speed = 1000;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  // toggle box true ("alive") or false ("dead")
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);

    gridCopy[row][col] = !gridCopy[row][col];

    this.setState({
      gridFull: gridCopy
    });
  }

  // seed grid
  seed = () => {
      let gridFull = this.state.gridFull.map(rows =>
      rows.map(() => Math.floor(Math.random() * 4) === 1)
    );

      this.setState({ gridFull: gridFull,
                      generation: 0 });
  }

  // clear grid
  clear = () => {
    clearInterval(this.intervalId);

    this.setState({ gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
                    generation: 0 });
  }

  // start advancing through generations at set intervals
  play = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.advance, this.speed);
  }

  // pause the advancement through the generations
  pause = () => {
    clearInterval(this.intervalId);
  }

  // slow the advancement through the generations
  slow = () => {
    if(this.speed < 2000) this.speed += 100;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.advance, this.speed);
    console.log(this.speed);
  }

  // quicken the advancement through the generations
  fast = () => {
    if(this.speed > 100) this.speed -= 100;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.advance, this.speed);
    console.log(this.speed);
  }

  // change grid size
  gridSize = (evt) => {
    switch (evt) {
      case "1":
        this.rows = 10;
        this.cols = 20;
        break;
      case "2":
        this.rows = 30;
        this.cols = 50;
        break;
      default:
        this.rows = 50;
        this.cols = 80;

    }

    clearInterval(this.intervalId);
    this.setState({ gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
                    generation: 0 });
  }

  // advance to next generation
  advance = () => {
      let gridCopy = arrayClone(this.state.gridFull);
      gridCopy.map((rows, r) =>
      rows.map((box, c) => {
        let count = 0;
        if((c > 0) && gridCopy[r][c-1]) count++;
        if((c < this.cols-1) && gridCopy[r][c+1]) count++;
        if((r > 0) && gridCopy[r-1][c]) count++;
        if((r < this.rows-1) &&gridCopy[r+1][c]) count++;
        if((c > 0 && r > 0) && gridCopy[r-1][c-1]) count++;
        if((c > 0 && r < this.rows-1 ) && gridCopy[r+1][c-1]) count++;
        if((r > 0 && c < this.cols-1) && gridCopy[r-1][c+1]) count++;
        if((r < this.rows-1 && c < this.cols-1) && gridCopy[r+1][c+1]) count++;

        if(box && (count < 2 || count > 3)) gridCopy[r][c] = false; // deaths of old gen live boxes
        if(!box && (count === 3)) gridCopy[r][c] = true; // births of new gen live boxes
      }));

      this.setState({
        gridFull : gridCopy,
        generation : this.state.generation+1
      });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Buttons
          playButton={this.play}
          pauseButton={this.pause}
          clearButton={this.clear}
          slowButton={this.slow}
          fastButton={this.fast}
          seedButton={this.seed}
          gridSize={this.gridSize}
        />
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
