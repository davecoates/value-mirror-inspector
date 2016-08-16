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
        getPath: PropTypes.func,
        removePath: PropTypes.func,
        getPathState: PropTypes.func.isRequired,
        setPathState: PropTypes.func.isRequired,
    };

    static childContextTypes = {
        getPath: PropTypes.func,
        removePath: PropTypes.func,
    };

    siblingCount = 0;
    getChildContext() {
        return {
            getPath: () => [
                // Depth
                (Number(this.getPath().split('.')[0]) + 1),
                // Breadth
                this.siblingCount++,
            ].join('.'),
            removePath: () => this.siblingCount--,
        };
    }

    mounted = true;

    componentWillUnmount = () => {
        this.mounted = false;
        const fetchedCount = this.props.expandTarget === 'entries'
            && this.props.mirror.fetchedCount();
        this.context.setPathState(this.getPath(), this.state.show, fetchedCount);
        if (this.context.removePath) {
            this.context.removePath();
        }
    }

    componentDidMount = () => {
        const { show, entriesFetched } = this.context.getPathState(this.getPath());
        if (show) {
            const promise = this.props.expandTarget === 'entries'
                ? this.props.mirror.getEntries({ limit: entriesFetched })
                : this.props.mirror.getProperties();
            promise.then(() => {
                if (this.mounted) {
                    this.setState({ show: true });
                }
            });
        }
    }

    state = {
        show: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.mirror !== this.props.mirror) {
            const { show } = this.context.getPathState(this.getPath());
            if (show) {
                const promise = this.props.expandTarget === 'entries'
                    ? this.props.mirror.getEntries({ limit: this.props.mirror.fetchedCount() })
                    : this.props.mirror.getProperties();
                promise.then(() => {
                    if (this.mounted) {
                        this.forceUpdate();
                    }
                });
            }
        }
    }

    more = () => {
        const promise = this.props.expandTarget === 'entries'
            ? this.props.mirror.getEntries({ limit: 20 })
            : this.props.mirror.getProperties();
        return promise.then(() => {
            this.forceUpdate();
        });
    }

    toggleVisibility = () => {
        const { mirror, expandTarget } = this.props;
        let hasFetched;
        let fetchedCount;
        if (expandTarget === 'entries') {
            fetchedCount = mirror.fetchedCount();
            hasFetched = mirror.allEntriesFetched || fetchedCount;
        } else {
            hasFetched = mirror.properties;
        }
        let promise;
        if (!this.state.show && !hasFetched) {
            // Initial show fetch some items
            promise = this.more();
        } else {
            promise = Promise.resolve();
        }
        promise.then(() => {
            const show = !this.state.show;
            this.setState({ show });
            this.context.setPathState(this.getPath(), show, fetchedCount);
        });
    };

    path = null;
    getPath = () => {
        if (this.path !== null) {
            return this.path;
        }
        if (this.context.getPath) {
            this.path = this.context.getPath();
            return this.path;
        }
        this.path = '0.0';
        return this.path;
    };

    render() {
        const { mirror, label, singularItemLabel, pluralItemLabel, children } = this.props;
        let { size } = mirror;
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
                        {this.props.expandTarget === 'entries' &&
                            <span {...getStyles('nodeItemCount')}>
                                {size} {mirror.size !== 1 ? pluralItemLabel : singularItemLabel}
                            </span>
                        }
                    </Arrow>
                </div>
                {this.state.show && (
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
