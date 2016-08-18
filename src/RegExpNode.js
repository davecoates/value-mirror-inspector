import React, { Component, PropTypes } from 'react';

export default class RegExpNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    handleClick = () => {
        window.$m = new RegExp(this.props.mirror.source, this.props.mirror.flags.join(''));
        console.info('RegExp object available in $m'); // eslint-disable-line
        console.log($m); // eslint-disable-line
    };

    render() {
        const { mirror } = this.props;
        return (
            <div
                {...this.context.getStyles('regExpNode')}
                onClick={this.handleClick}
                title="Click to log"
            >
                <span {...this.context.getStyles('regExpDelim')}>/</span>
                <span {...this.context.getStyles('regExpValue')}>
                    {mirror.source}
                </span>
                <span {...this.context.getStyles('regExpDelim')}>/</span>
                <span {...this.context.getStyles('regExpFlags')}>
                    {mirror.flags.join('')}
                </span>
            </div>
        );
    }

}
