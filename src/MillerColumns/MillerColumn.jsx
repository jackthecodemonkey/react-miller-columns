import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColumnMover from './ColumnMover';
import './index.css';

const defaultTranstion = 200;

const getStyleFromElement = (element, property) => {
    return element && property && Number(window.getComputedStyle(element)[property].replace('px', ''));
}

const debounce = (fn, context = null, dealy = defaultTranstion) => {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, dealy);
    }
}

class MillerColumn extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.innerWrapper = React.createRef();
        this.notifyTransition = debounce(this.notifyTransition, this, defaultTranstion);
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
            children: this.getChildren(
                nextProps,
                this.columnMover.ShouldMoveSlider(this.columnMover.shouldShowPeek) || false
            ),
        })
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            if (this.columnMover) {
                this.columnMover.UpdateTotalWidth(getStyleFromElement(this.wrapperRef.current, 'width'));
                this.updateChildrenAndMove(true);
            }
        })
        const { maxColumn, columnMagin, minColumnWidth, peekWidth, children } = this.props;
        const totalWidth = getStyleFromElement(this.wrapperRef.current, 'width');
        this.columnMover = new ColumnMover(totalWidth, children.length, maxColumn, columnMagin, minColumnWidth, peekWidth)
        this.updateChildrenAndMove();
    }

    updateChildrenAndMove(transitioning = false) {
        this.setState({
            children: this.getChildren(this.props, transitioning),
        }, () => {
            if (this.columnMover.shouldShowPeek) this.moveToEnd();
            else this.moveToFirst();
        })
    }

    moveTo(value) {
        if (this.innerWrapper.current) this.innerWrapper.current.style.transition = `transform ${defaultTranstion}ms ease`;
        if (this.innerWrapper.current) this.innerWrapper.current.style.transform = value;
        this.notifyTransition();
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

    notifyTransition() {
        this.setState({
            children: this.getChildren(this.props, false),
        })
    }

    getChildren(props = this.props, transitioning = false) {
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
                        transitioning,
                        peekColumn: index === this.columnMover.peekIndex,
                        column: this.columnMover,
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