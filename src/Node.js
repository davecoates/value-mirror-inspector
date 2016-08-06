import React, { Component, PropTypes } from 'react';
import {
    Mirror, SymbolMirror, FunctionMirror, ObjectMirror, ListMirror, MapMirror, SetMirror,
} from 'value-mirror/lib/mirror';
import MapNode from './MapNode';
import SetNode from './SetNode';
import ListNode from './ListNode';
import PrimitiveNode from './PrimitiveNode';
import ObjectNode from './ObjectNode';
import FunctionNode from './FunctionNode';
import SymbolNode from './SymbolNode';

const componentMap = new Map([
    [MapMirror, MapNode],
    [SetMirror, SetNode],
    [ListMirror, ListNode],
    [ObjectMirror, ObjectNode],
    [FunctionMirror, FunctionNode],
    [SymbolMirror, SymbolNode],
]);

export default class Node extends Component {

    static propTypes = {
        propTypes: PropTypes.instanceOf(Mirror),
    };

    render() {
        const NodeComponent = componentMap.get(
            this.props.mirror && this.props.mirror.constructor) || PrimitiveNode;
        return <NodeComponent {...this.props} />;
    }

}
