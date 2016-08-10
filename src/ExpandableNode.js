import React, { Component, PropTypes } from 'react';
import MoreButton from './MoreButton';
import Arrow from './Arrow';

export default class ExpandableNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        singularItemLabel: PropTypes.string.isRequired,
        pluralItemLabel: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    state = {
        show: false,
    };

    more = () => {
        this.props.mirror.getEntries({ limit: 20 }).then(() => {
            this.forceUpdate();
        });
    }

    toggleVisibility = () => {
        if (!this.state.show && !this.props.mirror.allEntriesFetched
            && !this.props.mirror.fetchedCount()) {
            // Initial show fetch some items
            this.more();
        }
        this.setState({ show: !this.state.show });
    };

    render() {
        const { mirror, label, singularItemLabel, pluralItemLabel, children } = this.props;
        let { size } = mirror;
        const remaining = mirror.size - mirror.value.size;
        if (size === Infinity) {
            size = '∞';
        }
        const { getStyles } = this.context;

        return (
            <div>
                <div {...getStyles('nodeDesc')}>
                    <Arrow
                        {...getStyles('arrow')}
                        open={this.state.show}
                        onClick={this.toggleVisibility}
                    >
                        <span {...getStyles('nodeLabel')}>
                            {label}
                        </span>
                        <span {...getStyles('nodeItemCount')}>
                            {size} {mirror.size !== 1 ? pluralItemLabel : singularItemLabel}
                        </span>
                    </Arrow>
                </div>
                {this.state.show && (
                    <div>
                        {children(mirror)}
                        {!mirror.allEntriesFetched &&
                            <MoreButton onClick={this.more} remaining={remaining} />}
                    </div>)}
            </div>
        );
    }

}
