export default function getStylingFromBase16(base16Theme) {
    return {
        root: {
            padding: '0 0.2em',
            position: 'relative',
            backgroundColor: base16Theme.base00,
        },
        flash: {
            backgroundColor: base16Theme.base0C,
            transition: 'all 0.1s',
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
            padding: '0 0.5em 0 0',
        },
        nodeItemCount: {
            fontWeight: 'normal',
            color: base16Theme.base0B,
        },
        dateLabel: {
            lineHeight: 0,
            padding: '0 0.5em 0',
        },
        dateValue: {
            fontWeight: 'normal',
            color: base16Theme.base0E,
        },
        functionNodeLabel: {
            fontStyle: 'italic',
            padding: '0 0.5em 0 0',
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
            paddingLeft: '0.2em',
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
            cursor: 'pointer',
        },
        arrow: {
            display: 'inline-block',
            transition: 'transform 0.1s',
        },
        regExpNode: {
            cursor: 'pointer',
        },
        regExpDelim: {
            color: base16Theme.base08,
            fontWeight: 'bold',
            padding: '0 0.2em',
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
            top: '0px',
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
