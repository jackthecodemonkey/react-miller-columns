import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnMover from './ColumnMover';
import './index.css';

const getStyleFromElement = (element, property) => {
    return element && property && Number(window.getComputedStyle(element)[property].replace('px', ''));
}

class MillerColumn extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.innerWrapper = React.createRef();
        this.notifyColumn = this.notifyColumn.bind(this);
        this.state = {
            children: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length !== this.props.children.length) {
            const previousPeek = this.columnMover.shouldShowPeek;
            const diff = nextProps.children.length - this.props.children.length;
            this.columnMover.Update(nextProps.children.length);
            const ShouldMoveSlider = this.columnMover.ShouldMoveSlider(previousPeek);
            if (ShouldMoveSlider) {
                const moveTo = this.columnMover.MoveTo(diff, previousPeek);
                this.moveTo(`translateX(-${this.columnMover.currentPosition + moveTo}px)`);
                this.columnMover.currentPosition = this.columnMover.currentPosition + moveTo;
            }
        }
        this.setState({
            children: this.getChildren(nextProps),
        })
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            if (this.columnMover) {
                this.columnMover.UpdateTotalWidth(getStyleFromElement(this.wrapperRef.current, 'width'));
                this.updateChildrenAndMove();
            }
        })
        const { maxColumn, columnMagin, minColumnWidth, peekWidth, children } = this.props;
        const totalWidth = getStyleFromElement(this.wrapperRef.current, 'width');
        this.columnMover = new ColumnMover(totalWidth, children.length, maxColumn, columnMagin, minColumnWidth, peekWidth)
        this.updateChildrenAndMove();
    }

    updateChildrenAndMove() {
        this.setState({
            children: this.getChildren(),
        }, () => {
            if (this.columnMover.shouldShowPeek) this.moveToEnd();
            else this.moveToFirst();
        })
    }

    moveTo(value) {
        this.innerWrapper.current.style.transition = 'transform 300ms ease';
        this.innerWrapper.current.style.transform = value;
    }

    moveToFirst() {
        this.moveTo(`translateX(0px)`);
        this.columnMover.currentPosition = 0;
    }

    moveToEnd() {
        const moveTo = this.columnMover.MoveToEnd();
        this.moveTo(`translateX(-${moveTo}px)`);
        this.columnMover.currentPosition = moveTo;
    }

    notifyColumn() {

    }

    getChildren(props = this.props) {
        return React.Children.map(props.children, (child, index) => {
            const baseStyle = {
                width: this.columnMover.maxColumnWidth,
                height: this.props.height,
                margin: index === 0
                    ? `0px ${this.columnMover.marginRight}px 0px ${this.columnMover.marginRight}px`
                    : `0px ${this.columnMover.marginRight}px 0px 0px`
            };
            return React.cloneElement(child,
                {
                    ...child.props,
                    ...{
                        style: {
                            ...baseStyle,
                        },
                        peekColumn: index === this.columnMover.peekIndex,
                        column: this.columnMover,
                        notifyColumn: this.notifyColumn
                    },
                })
        })
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="miller">
                <div ref={this.innerWrapper} className="wrapper">
                    {this.state.children}
                </div>
            </div>
        )
    }
}

MillerColumn.propTypes = {
    maxColumn: PropTypes.number.isRequired,
    columnMagin: PropTypes.number.isRequired,
    minColumnWidth: PropTypes.number.isRequired,
    peekWidth: PropTypes.number.isRequired,
}

export default MillerColumn;