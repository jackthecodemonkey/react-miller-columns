import React from 'react';
import './App.css';
import { MillerColumns, Column } from './MillerColumns';
import sampleTree from './sample/sampleTree';
import Model from './sample/model';
import Row from './sample/Row';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: new Model(sampleTree)
    }
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(label) {
    this.state.tree.FindAndSetSelected(label);
    this.setState({
      tree: this.state.tree,
    })
  }

  getColumn(tree, index) {
    return (
      <Column key={index}>
        <Row onRowClick={this.onRowClick} tree={tree} />
      </Column>
    )
  }

  getColumns(tree, columns = [], localIndex = 0) {
    let index = localIndex || 0;
    columns.push(this.getColumn(tree, index));
    if (!tree.selectedChild) return columns;
    return this.getColumns(tree.NextNode, columns, ++localIndex);
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }} className="App">
        <MillerColumns
          maxColumn={4}
          minColumnWidth={150}
          columnMagin={35}
          peekWidth={35}
        >
          {
            this.getColumns(this.state.tree)
          }
        </MillerColumns>
      </div>
    );
  }
}

export default App;
