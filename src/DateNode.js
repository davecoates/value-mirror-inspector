import React, { Component, PropTypes } from 'react';
import Clock from 'react-icons/lib/fa/clock-o';

export default class DateNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
        flashElement: PropTypes.func.isRequired,
    };

    handleClick = () => {
        window.$m = new Date(this.props.mirror.value);
        console.info('Date object available in $m'); // eslint-disable-line
        console.log($m); // eslint-disable-line
    };

    setRef = ref => {
        this.ref = ref;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.mirror !== this.props.mirror &&
            this.context) {
            this.context.flashElement(this.ref);
        }
    }

    render() {
        const { mirror } = this.props;
        const date = new Date(mirror.value);
        return (
            <div
                {...this.context.getStyles('nodeDesc')}
                ref={this.setRef}
                onClick={this.handleClick}
                title="Click to log"
            >
                <span {...this.context.getStyles('dateLabel')}><Clock /></span>
                <span {...this.context.getStyles('dateValue')}>{date.toString()}</span>
            </div>
        );
    }

}
