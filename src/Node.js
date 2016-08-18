import React, { Component, PropTypes } from 'react';
import { Mirror } from 'value-mirror/lib/mirror';
import MapNode from './MapNode';
import SetNode from './SetNode';
import ListNode from './ListNode';
import PrimitiveNode from './PrimitiveNode';
import ObjectNode from './ObjectNode';
import FunctionNode from './FunctionNode';
import SymbolNode from './SymbolNode';
import DateNode from './DateNode';
import RegExpNode from './RegExpNode';

const componentMap = new Map([
    ['object.map', MapNode],
    ['object.set', SetNode],
    ['object.list', ListNode],
    ['object.iterable', ListNode],
    ['object.date', DateNode],
    ['object.regexp', RegExpNode],
    ['object', ObjectNode],
    ['function', FunctionNode],
    ['symbol', SymbolNode],
]);

export default class Node extends Component {

    static propTypes = {
        propTypes: PropTypes.instanceOf(Mirror),
    };

    render() {
        let NodeComponent = PrimitiveNode;
        if (typeof this.props.mirror == 'object' && this.props.mirror) {
            const { type, subType } = this.props.mirror.serializedRepresentation;
            const typeString = [type, subType].filter(a => a).join('.');
            if (componentMap.has(typeString)) {
                NodeComponent = componentMap.get(typeString);
            }
        }
        return <NodeComponent {...this.props} />;
    }

}
