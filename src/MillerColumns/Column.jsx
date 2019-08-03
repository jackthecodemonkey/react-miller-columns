import React, { Component } from 'react';

class Column extends Component {
    constructor(props) {
        super(props);
        this.getChildren = this.getChildren.bind(this);
    }

    getChildren() {
        return React.Children.map(this.props.children, (child) => {
            const { style, ...otherProps } = child.props;
            return React.cloneElement(child, { ...otherProps, ...this.props })
        })
    }

    render() {
        return (
            <div style={this.props.style} className="column">
                {this.getChildren()}
            </div>
        )
    }
}

export default Column;