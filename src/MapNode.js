import React, { Component, PropTypes } from 'react';
import Node from './Node';
import ExpandableNode from './ExpandableNode';

export default class MapNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        const label = `{} ${mirror.serializedRepresentation.className}`;
        return (
            <ExpandableNode
                label={label}
                singularItemLabel="entry"
                pluralItemLabel="entries"
                mirror={mirror}
            >
                {() => (
                    [...mirror.value.entries()].map(([key, value]) => (
                        <div key={key} {...getStyles('mapNodeEntry')}>
                            <Node {...getStyles('mapNodeKey')} mirror={key} />
                            <span {...getStyles('keyValueSeparator')}>:</span>
                            <Node {...getStyles('mapNodeValue')} mirror={value} />
                        </div>
                    ))
                )}
            </ExpandableNode>
        );
    }

}
