import React, { Component, PropTypes } from 'react';
import Node from './Node';
import Arrow from './Arrow';

export default class ObjectNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    state = {
        isExpanded: false,
    };

    toggleVisibility = async () => {
        if (!this.state.isExpanded) {
            await this.props.mirror.getProperties();
        }
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        return (
            <div {...this.context.getStyles('objectNode')}>
                <div {...getStyles('nodeDesc')}>
                    <Arrow
                        {...getStyles('arrow')}
                        open={this.state.show}
                        onClick={this.toggleVisibility}
                    >
                        <span {...getStyles('nodeLabel')}>
                            Object
                        </span>
                    </Arrow>
                </div>
                {this.state.isExpanded && (
                    <div>
                        {mirror.properties.map(({ key, value, isRecursive }) =>
                            <div key={key} {...getStyles('objectProperty')}>
                                <Node {...getStyles('objectPropertyKey')} mirror={key} />
                                {isRecursive && '(R)'}
                                <span {...getStyles('keyValueSeparator')}>:</span>
                                <Node {...getStyles('objectPropertyValue')} mirror={value} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

}
