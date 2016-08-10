export default function getStylingFromBase16(base16Theme) {
    return {
        root: {
            backgroundColor: base16Theme.base00,
            padding: 5,
        },
        stringNode: {
            color: base16Theme.base0B,
        },
        numberNode: {
            color: base16Theme.base09,
        },
        booleanNode: {
            color: base16Theme.base09,
        },
        nodeLabel: {
            padding: '0 0.5em 0 0.2em',
        },
        nodeItemCount: {
            fontWeight: 'normal',
            color: base16Theme.base0B,
        },
        functionNodeLabel: {
            fontStyle: 'italic',
            padding: '0 0.5em',
        },
        functionNodeName: {
            color: base16Theme.base0C,
            fontWeight: 'normal',
        },
        nullNode: {
            color: base16Theme.base09,
        },
        undefinedNode: {
            color: base16Theme.base09,
        },
        mapNode: {
        },
        mapNodeEntry: {
            display: 'flex',
        },
        mapNodeKey: {
        },
        mapNodeValue: {
            flex: 1,
        },
        objectProperty: {
            display: 'flex',
        },
        objectPropertyValue: {
            flex: 1,
        },
        objectRecursive: {
            color: base16Theme.base06,
            cursor: 'help',
        },
        symbolNode: {
            color: base16Theme.base0E,
        },
        nodeDesc: {
            color: base16Theme.base0D,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        },
        keyValueSeparator: {
            color: base16Theme.base05,
            padding: '0 0.2em',
        },
        listNodeKey: {
            color: base16Theme.base09,
        },
        moreButton: {
            color: base16Theme.base0F,
            fontWeight: 'bold',
            background: 'none',
            border: 'none',
            padding: 0,
        },
        arrow: {
            fontSize: '0.6em',
            display: 'inline-block',
            padding: '0 0.2em',
            transition: 'transform 0.1s',
        },
    };
}
