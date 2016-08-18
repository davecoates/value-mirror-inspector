import React, { Component, PropTypes } from 'react';

export default class DateNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    handleClick = () => {
        window.$m = new Date(this.props.mirror.value);
        console.info('Date object available in $m'); // eslint-disable-line
        console.log($m); // eslint-disable-line
    };

    render() {
        const { mirror } = this.props;
        const date = new Date(mirror.value);
        return (
            <div
                {...this.context.getStyles('nodeDesc')}
                onClick={this.handleClick}
                title="Click to log"
            >
                <span {...this.context.getStyles('dateLabel')}>🕝</span>
                <span {...this.context.getStyles('dateValue')}>{date.toString()}</span>
            </div>
        );
    }

}
