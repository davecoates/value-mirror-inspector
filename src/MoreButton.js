import React, { Component, PropTypes } from 'react';
import InfinityIcon from 'react-icons/lib/ti/infinity';

export default class MoreButton extends Component {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        remaining: PropTypes.number.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };


    render() {
        const { onClick, remaining } = this.props;
        let remainingFormatted = remaining;
        if (remaining === Number.POSITIVE_INFINITY) {
            remainingFormatted = <InfinityIcon />;
        }
        if (Number.isNaN(remaining)) {
            remainingFormatted = '?';
        }
        return (
            <button {...this.context.getStyles('moreButton')} onClick={onClick}>
                ... {remainingFormatted} more
            </button>
        );
    }

}
