import React, { Component, PropTypes } from 'react';

export default class PrimitiveNode extends Component {

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
        flashElement: PropTypes.func.isRequired,
    };

    static propTypes = {
        mirror: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
        ]),
    };

    setRef = ref => {
        this.ref = ref;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.mirror !== this.props.mirror &&
            !(Number.isNaN(prevProps.mirror) && Number.isNaN(this.props.mirror)) &&
            this.context) {
            this.context.flashElement(this.ref);
        }
    }

    render() {
        let value = this.props.mirror;
        const { getStyles } = this.context;
        if (typeof value == 'string') {
            return <span ref={this.setRef} {...getStyles('stringNode')}>"{value}"</span>;
        }
        if (value === null) {
            return <span ref={this.setRef} {...getStyles('nullNode')}>null</span>;
        }
        if (value === undefined) {
            return <span ref={this.setRef} {...getStyles('undefinedNode')}>undefined</span>;
        }
        if (typeof value == 'number') {
            if (Number.isNaN(value)) {
                // Avoid warning from React due to bug
                // https://github.com/facebook/react/issues/7424
                value = 'NaN';
            }
            return <span ref={this.setRef} {...getStyles('numberNode')}>{value}</span>;
        }
        if (typeof value == 'boolean') {
            return <span ref={this.setRef} {...getStyles('booleanNode')}>{value.toString()}</span>;
        }
        return <span ref={this.setRef}>{value}</span>;
    }

}
