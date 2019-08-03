import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MillerColumns, Column } from './MillerColumns';
// maxColumn, columnMagin, minColumnWidth, peekWidth,
function App() {
  const getColumns = () => {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<Column><div>Hello</div></Column>)
    }
    return arr;
  }
  return (
    <div className="App">
      <div>
        <MillerColumns
          maxColumn={3}
          minColumnWidth={150}
          columnMagin={20}
          peekWidth={15}
        >
          {
            getColumns()
          }
        </MillerColumns>
      </div>
    </div>
  );
}

export default App;
