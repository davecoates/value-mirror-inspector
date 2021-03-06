import React, { Component, PropTypes } from 'react';
import InfinityIcon from 'react-icons/lib/ti/infinity';
import MoreButton from './MoreButton';
import Arrow from './Arrow';

export default class ExpandableNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        singularItemLabel: PropTypes.string,
        pluralItemLabel: PropTypes.string,
        children: PropTypes.func.isRequired,
        expandTarget: PropTypes.oneOf(['properties', 'entries']).isRequired,
    };

    static defaultProps = {
        expandTarget: 'entries',
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
        flashElement: PropTypes.func.isRequired,
    };

    state = { expanded: false };

    limit = 20;

    more = () => {
        const promise = this.props.expandTarget === 'entries'
            ? this.props.mirror.getEntries({ limit: this.limit })
            : this.props.mirror.getProperties();
        return promise.then(() => {
            this.forceUpdate();
        });
    }

    toggleVisibility = () => {
        const { mirror, expandTarget } = this.props;
        let fetchedCount;
        let hasFetched;
        if (expandTarget === 'entries') {
            fetchedCount = mirror.fetchedCount();
            hasFetched = mirror.allEntriesFetched || fetchedCount;
        } else {
            hasFetched = mirror.properties;
        }
        let promise;
        if (!this.state.expanded && !hasFetched) {
            // Initial show fetch some items
            promise = this.more();
        } else {
            promise = Promise.resolve();
        }
        promise.then(() => {
            this.setState({ expanded: !this.state.expanded });
        });
    };

    setRef = ref => {
        this.ref = ref;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.mirror.objectId !== this.props.mirror.objectId &&
            this.context) {
            this.context.flashElement(this.ref);
        }
    }

    render() {
        const { mirror, label, singularItemLabel, pluralItemLabel, children } = this.props;
        let { size: sizeLabel } = mirror;
        if (mirror.size === Infinity) {
            sizeLabel = <InfinityIcon />;
        }
        const { getStyles } = this.context;
        const { expanded } = this.state;
        return (
            <div ref={this.setRef}>
                <div {...getStyles('nodeDesc')}>
                    <Arrow
                        {...getStyles('arrow')}
                        open={expanded}
                        onClick={this.toggleVisibility}
                    >
                        <span {...getStyles('nodeLabel')}>
                            {label}
                        </span>
                        {this.props.expandTarget === 'entries' &&
                            <span {...getStyles('nodeItemCount')}>
                                {sizeLabel}&nbsp;
                                {mirror.size !== 1 ? pluralItemLabel : singularItemLabel}
                            </span>
                        }
                    </Arrow>
                </div>
                {expanded && (
                    <div>
                        {children(mirror)}
                        {this.props.expandTarget === 'entries' && !mirror.allEntriesFetched &&
                            <MoreButton
                                onClick={this.more}
                                remaining={mirror.size - mirror.fetchedCount()}
                            />
                        }
                    </div>
                )}
            </div>
        );
    }

}
