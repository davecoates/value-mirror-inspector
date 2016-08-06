import React, { Component, PropTypes } from 'react';
import Node from './Node';
import ExpandableNode from './ExpandableNode';

export default class SetNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        const label = `#{} ${mirror.serializedRepresentation.className}`;
        return (
            <ExpandableNode
                label={label}
                singularItemLabel="item"
                pluralItemLabel="items"
                mirror={mirror}
            >
                {() => (
                    [...mirror.value.values()].map((value, key) => (
                        <div style={getStyles('setNodeValue')} key={key}>
                            <Node mirror={value} />
                        </div>
                    ))
                )}
            </ExpandableNode>
        );
    }

}
