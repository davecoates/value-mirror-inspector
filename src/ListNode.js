import React, { Component, PropTypes } from 'react';
import Node from './Node';
import ExpandableNode from './ExpandableNode';

export default class ListNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        const label = `[] ${mirror.serializedRepresentation.className || 'iterable'}`;
        return (
            <ExpandableNode
                label={label}
                singularItemLabel="item"
                pluralItemLabel="items"
                mirror={mirror}
            >
                {() => (
                    mirror.value.map((value, i) => (
                        <div key={i} {...getStyles('listNodeEntry')}>
                            <span {...getStyles('listNodeKey')}>{i}</span>
                            <span {...getStyles('keyValueSeparator')}>: </span>
                            <Node {...getStyles('listNodeValue')}mirror={value} />
                        </div>
                    ))
                )}
            </ExpandableNode>
        );
    }

}
