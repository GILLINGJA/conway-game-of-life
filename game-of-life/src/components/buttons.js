import React, { Component } from 'react';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

class Buttons extends Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.seedButton}>
            Seed
          </button>
          <button className="btn btn-default" onClick={this.props.slowButton} alt="Slow">
            <i className="fa fa-backward"></i>
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton} alt="Pause">
            <i className="fa fa-pause"></i>
          </button>
          <button className="btn btn-default" onClick={this.props.playButton} alt="Play">
            <i className="fa fa-play"></i>
          </button>
          <button className="btn btn-default" onClick={this.props.fastButton} alt="Fast">
            <i className="fa fa-forward"></i>
          </button>
          <button className="btn btn-default" onClick={this.props.clearButton}>
            Clear
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">20x10</MenuItem>
            <MenuItem eventKey="2">50x30</MenuItem>
            <MenuItem eventKey="3">80x50</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
