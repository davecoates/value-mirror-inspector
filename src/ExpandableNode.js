import React, { Component, PropTypes } from 'react';
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
        if (!mirror.meta.expanded && !hasFetched) {
            // Initial show fetch some items
            promise = this.more();
        } else {
            promise = Promise.resolve();
        }
        promise.then(() => {
            mirror.setMetaData(({ expanded }) => ({ expanded: !expanded }));
            this.forceUpdate();
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
        let { size } = mirror;
        if (size === Infinity) {
            size = '∞';
        }
        const { getStyles } = this.context;
        const { expanded } = mirror.meta;

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
                                {size} {mirror.size !== 1 ? pluralItemLabel : singularItemLabel}
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
                                remaining={mirror.size - mirror.value.size}
                            />
                        }
                    </div>
                )}
            </div>
        );
    }

}
