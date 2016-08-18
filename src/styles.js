export default function getStylingFromBase16(base16Theme) {
    return {
        root: {
            position: 'relative',
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
        dateLabel: {
            lineHeight: 0,
            padding: '0 0.5em 0 0.2em',
        },
        dateValue: {
            fontWeight: 'normal',
            color: base16Theme.base0E,
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
        listNodeEntry: {
            display: 'flex',
        },
        listNodeValue: {
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
        regExpNode: {
            cursor: 'pointer',
        },
        regExpDelim: {
            color: base16Theme.base08,
            fontWeight: 'bold',
        },
        regExpValue: {
            color: base16Theme.base0A,
        },
        regExpFlags: {
            color: base16Theme.base0F,
        },
        functionBody: {
            color: base16Theme.base04,
        },
        timeTravelButtons: {
            position: 'absolute',
            right: '5px',
            top: '5px',
        },
        timeTravelButton: {
            border: 0,
            backgroundColor: 'transparent',
            color: base16Theme.base04,
            cursor: 'pointer',
        },
        timeTravelButtonDisabled: {
            opacity: 0.5,
            cursor: 'auto',
        },
    };
}
