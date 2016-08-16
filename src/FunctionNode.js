import React, { Component, PropTypes } from 'react';

export default class FunctionNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        return (
            <div {...getStyles('functionNode')}>
                <div {...getStyles('nodeDesc')}>
                    <span {...getStyles('functionNodeLabel')}>
                        f
                    </span>
                    <span {...getStyles('functionNodeName')}>
                        {mirror.serializedRepresentation.name || "(anonymous)"}
                    </span>
                </div>
            </div>
        );
    }

}
