import React, { Component, PropTypes } from 'react';

export default class PrimitiveNode extends Component {

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    render() {
        const value = this.props.mirror;
        const { getStyles } = this.context;
        if (typeof value == 'string') {
            return <span {...getStyles('stringNode')}>"{value}"</span>;
        }
        if (value === null) {
            return <span {...getStyles('nullNode')}>null</span>;
        }
        if (value === undefined) {
            return <span {...getStyles('undefinedNode')}>undefined</span>;
        }
        if (typeof value == 'number') {
            return <span {...getStyles('numberNode')}>{value}</span>;
        }
        if (typeof value == 'boolean') {
            return <span {...getStyles('booleanNode')}>{value.toString()}</span>;
        }
        return <span>{value}</span>;
    }

}
