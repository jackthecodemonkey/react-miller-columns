import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MillerColumns, Column } from './MillerColumns';

class Row extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const style = {
      transition: 'background 200ms',
      background: this.props.peekColumn && !this.props.transitioning
        ? '#bae6f9'
        : '',
      height: '500px',
      border: '1px solid salmon',
      borderRadius: '5px',
      display: 'flex',
      fontSize: '14px',
      flexDirection: 'column',
      justifyContent: 'center',
    }
    return (
      <div
        onClick={this.props.peekColumn
          ? this.props.onRemove
          : this.props.onAdd}
        style={style}>
        Column {this.props.currentIndex}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
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
      <div style={{marginTop: '50px'}} className="App">
          <MillerColumns
            maxColumn={5}
            minColumnWidth={200}
            columnMagin={30}
            peekWidth={30}
          >
            {
              this.getColumns()
            }
          </MillerColumns>
      </div>
    );
  }
}

export default App;
