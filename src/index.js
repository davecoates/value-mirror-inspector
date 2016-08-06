import React, { Component, PropTypes } from 'react';
import * as base16 from 'base16';
import { createStyling } from 'react-base16-styling';
import { buildMirror } from 'value-mirror';
import Node from './Node';
import getStylingFromBase16 from './styles';

const createStylingFromTheme = createStyling(getStylingFromBase16, {
    defaultBase16: base16.solarized,
    base16Themes: base16,
});


export default class ValueMirrorInspector extends Component {

    static propTypes = {
        client: PropTypes.object.isRequired,
        getEntries: PropTypes.func.isRequired,
        fetchEntries: PropTypes.func,
        data: PropTypes.object.isRequired,
        serializer: PropTypes.object.isRequired,
        themeName: PropTypes.string,
    };

    static childContextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    static defaultProps = {
        themeName: 'ocean',
    };

    getChildContext() {
        return {
            getStyles: this.getStyles,
        };
    }

    componentWillMount() {
        this.getStyles = createStylingFromTheme(this.props.themeName, false);
        this.mirror = buildMirror(this.props.data, this.props.serializer);
    }

    render() {
        return (
            <div {...this.getStyles('root')}>
                <Node mirror={this.mirror} />
            </div>
        );
    }

}
