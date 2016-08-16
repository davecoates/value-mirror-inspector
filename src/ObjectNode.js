import React, { Component, PropTypes } from 'react';
import Node from './Node';
import Arrow from './Arrow';
import ExpandableNode from './ExpandableNode';

export default class ObjectNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };


    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        const { properties = [] } = mirror;
        return (
            <div {...this.context.getStyles('objectNode')}>
                <ExpandableNode
                    label="Object"
                    mirror={mirror}
                    expandTarget="properties"
                >
                    {() => mirror.properties.map(({ key, value, isRecursive }) =>
                            <div key={key} {...getStyles('objectProperty')}>
                                <Node {...getStyles('objectPropertyKey')} mirror={key} />
                                {isRecursive &&
                                    <span
                                        title="Recursive object reference"
                                        {...getStyles('objectRecursive')}
                                    >↻</span>}
                                <span {...getStyles('keyValueSeparator')}>:</span>
                                <Node {...getStyles('objectPropertyValue')} mirror={value} />
                            </div>
                    )}
                </ExpandableNode>
            </div>
        );
    }

}
