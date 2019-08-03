import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnCalculator from './ColumnCalculator';
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
            const previousPeek = this.columnCalculator.shouldShowPeek;
            const diff = nextProps.children.length - this.props.children.length;
            this.columnCalculator.Update(nextProps.children.length);
            const ShouldMoveSlider = this.columnCalculator.ShouldMoveSlider(previousPeek);
            if (ShouldMoveSlider) {
                const moveTo = this.columnCalculator.MoveTo(diff, previousPeek);
                this.moveTo(`translateX(-${this.columnCalculator.currentPosition + moveTo}px)`);
                this.columnCalculator.currentPosition = this.columnCalculator.currentPosition + moveTo;
            }
        }
        this.setState({
            children: this.getChildren(nextProps),
        })
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            if (this.columnCalculator) {
                this.columnCalculator.UpdateTotalWidth(getStyleFromElement(this.wrapperRef.current, 'width'));
                this.updateChildrenAndMove();
            }
        })
        const { maxColumn, columnMagin, minColumnWidth, peekWidth, children } = this.props;
        const totalWidth = getStyleFromElement(this.wrapperRef.current, 'width');
        this.columnCalculator = new ColumnCalculator(totalWidth, children.length, maxColumn, columnMagin, minColumnWidth, peekWidth)
        this.updateChildrenAndMove();
    }

    updateChildrenAndMove() {
        this.setState({
            children: this.getChildren(),
        }, () => {
            if (this.columnCalculator.shouldShowPeek) this.moveToEnd();
            else this.moveToFirst();
        })
    }

    moveTo(value) {
        this.innerWrapper.current.style.transition = 'transform 300ms ease';
        this.innerWrapper.current.style.transform = value;
    }

    moveToFirst() {
        this.moveTo(`translateX(0px)`);
        this.columnCalculator.currentPosition = 0;
    }

    moveToEnd() {
        const moveTo = this.columnCalculator.MoveToEnd();
        this.moveTo(`translateX(-${moveTo}px)`);
        this.columnCalculator.currentPosition = moveTo;
    }

    notifyColumn() {

    }

    getChildren(props = this.props) {
        return React.Children.map(props.children, (child, index) => {
            const baseStyle = {
                width: this.columnCalculator.maxColumnWidth,
                height: this.props.height,
                margin: index === 0
                    ? `0px ${this.columnCalculator.marginRight}px 0px ${this.columnCalculator.marginRight}px`
                    : `0px ${this.columnCalculator.marginRight}px 0px 0px`
            };
            return React.cloneElement(child,
                {
                    ...child.props,
                    ...{
                        style: {
                            ...baseStyle,
                        },
                        column: this.columnCalculator,
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