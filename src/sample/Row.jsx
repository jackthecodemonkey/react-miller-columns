import React from 'react';

const getStyle = (showBg) => {
    return {
        transition: 'background 200ms',
        background: showBg
            ? '#bae6f9'
            : '',
        height: '500px',
        border: '1px solid salmon',
        borderRadius: '5px',
        display: 'flex',
        fontSize: '14px',
        flexDirection: 'column',
    }
}

const Row = (props) => {
    return (
        <div onClick={() => props.peekColumn && props.onRowClick(
            props.tree.selectedChild || props.tree.label,
        )}
            style={getStyle(props.peekColumn && !props.transitioning)}>
            {
                props.tree.children.length
                    ? props.tree.children.map(i => {
                        return <div
                            onClick={() => !props.peekColumn && props.onRowClick(i.label)}
                            className="clickable"
                            style={{
                                padding: '20px',
                                background: i.label === props.tree.selectedChild
                                    ? 'salmon'
                                    : ''
                            }} key={i.label}>{i.label}</div>
                    })
                    : <div style={{ marginTop: '20px' }}>Empty</div>
            }
        </div>
    );
}

export default Row;