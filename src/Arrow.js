import React, { PropTypes } from 'react';

export default function Arrow({ className, style, open, onClick, children }) {
    let styles = style;
    if (open) {
        styles.transform = 'rotateZ(90deg)';
    }
    return (
        <div onClick={onClick}>
            <span style={styles} className={className}>►</span> {children}
        </div>
    );
}

Arrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
};
