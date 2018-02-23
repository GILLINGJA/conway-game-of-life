import React, { Component } from 'react';

import Box from './box.js';

class Grid extends Component {

  render() {
    const width = (this.props.cols * 16) + 1;
    var boxClass = "";
    var rowsArr = [];

    rowsArr = this.props.gridFull.map((rows, rowId) =>
      rows.map((box, colId) => {
        let boxId = `${rowId}_${colId}`;
        boxClass = this.props.gridFull[rowId][colId] ? "box on" : "box off";

        return <Box
          boxClass={boxClass}
          key={boxId}
          row={rowId}
          col={colId}
        />;
      }) // end of column map
    ); // end of row map

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
