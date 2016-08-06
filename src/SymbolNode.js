import React, { Component, PropTypes } from 'react';

export default class SymbolNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    render() {
        const { mirror } = this.props;
        return (
            <div {...this.context.getStyles('symbolNode')}>
                {mirror.serializedRepresentation.value}
            </div>
        );
    }

}
