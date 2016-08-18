import React, { Component, PropTypes } from 'react';
import Arrow from './Arrow';

export default class FunctionNode extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
    };

    static contextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    state = {
        isExpanded: false,
    };

    toggleVisibility = () => this.setState({ isExpanded: !this.state.isExpanded });

    render() {
        const { mirror } = this.props;
        const { getStyles } = this.context;
        return (
            <div {...getStyles('functionNode')}>
                <div {...getStyles('nodeDesc')}>
                    <Arrow
                        {...getStyles('arrow')}
                        open={this.state.isExpanded}
                        onClick={this.toggleVisibility}
                    >
                        <span {...getStyles('functionNodeLabel')}>
                            f
                        </span>
                        <span {...getStyles('functionNodeName')}>
                            {mirror.serializedRepresentation.name || '(anonymous)'}
                        </span>
                    </Arrow>
                </div>
                {this.state.isExpanded &&
                    <pre {...getStyles('functionBody')}>
                        {mirror.serializedRepresentation.value}
                    </pre>
                }
            </div>
        );
    }

}
