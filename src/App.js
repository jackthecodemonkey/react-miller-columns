import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MillerColumns, Column } from './MillerColumns';

const Row = (props) => {
  const style = {
    transition: 'background 200ms',
    background: props.peekColumn && !props.transitioning ? 'skyblue' : '',
    height: '500px',
    border: '1px solid salmon',
  }
  return (
    <div
      onClick={props.peekColumn
        ? props.onRemove
        : props.onAdd}
      style={style}>
      Hello {props.currentIndex}
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 7,
    }
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  inc() {
    this.setState({
      count: ++this.state.count,
    })
  }

  dec() {
    this.setState({
      count: --this.state.count,
    })
  }

  getColumns() {
    let arr = [];
    for (let i = 0; i < this.state.count; i++) {
      arr.push(<Column key={i}>
        <Row
          onAdd={this.inc}
          onRemove={this.dec}
          currentIndex={i} />
      </Column>)
    }
    return arr;
  }

  render() {
    return (
      <div className="App">
        <div>
          <MillerColumns
            maxColumn={5}
            minColumnWidth={150}
            columnMagin={20}
            peekWidth={30}
          >
            {
              this.getColumns()
            }
          </MillerColumns>
        </div>
      </div>
    );
  }
}

export default App;
