import React, { Component, PureComponent, PropTypes } from 'react';
import * as base16 from 'base16';
import { createStyling } from 'react-base16-styling';
import Node from './Node';
import getStylingFromBase16 from './styles';

const createStylingFromTheme = createStyling(getStylingFromBase16, {
    defaultBase16: base16.solarized,
    base16Themes: base16,
});

class ForwardBackButtons extends PureComponent {

    handlePrevious = () => {
        const index = this.props.allMirrors.indexOf(this.props.currentMirror) - 1;
        if (index >= 0) {
            this.props.onSelect(this.props.allMirrors[index]);
        }
    };

    handleNext = () => {
        const index = this.props.allMirrors.indexOf(this.props.currentMirror) + 1;
        if (index < this.props.allMirrors.length) {
            this.props.onSelect(this.props.allMirrors[index]);
        }
    };
    render() {
        const {
            currentMirror, allMirrors, buttonStyles, buttonStylesDisabled, ...rest,
        } = this.props;
        const isLast = allMirrors[allMirrors.length - 1] === currentMirror;
        const isFirst = allMirrors[0] === currentMirror;
        return (
            <div {...rest}>
                <button
                    {...(isFirst ? buttonStylesDisabled : buttonStyles)}
                    onClick={this.handlePrevious}
                    disabled={isFirst}
                    title={!isFirst && 'Previous state'}
                >
                    ←
                </button>
                <button
                    {...(isLast ? buttonStylesDisabled : buttonStyles)}
                    onClick={this.handleNext}
                    disabled={isLast}
                    title={!isLast && 'Next state'}
                >
                    →
                </button>
            </div>
        );
    }
}


export default class ValueMirrorInspector extends Component {

    static propTypes = {
        mirror: PropTypes.object.isRequired,
        themeName: PropTypes.string,
    };

    static childContextTypes = {
        getStyles: PropTypes.func.isRequired,
    };

    static defaultProps = {
        themeName: 'ocean',
    };

    getChildContext() {
        return {
            getStyles: this.getStyles,
        };
    }

    state = {
        currentMirror: null,
        allMirrors: [],
    };

    constructor(props) {
        super(props);
        this.state.currentMirror = props.mirror;
        this.state.allMirrors = [props.mirror];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mirror !== this.props.mirror) {
            nextProps.mirror.synchronise(this.props.mirror).then(() => {
                this.setState(currentState => ({
                    allMirrors: [...currentState.allMirrors, nextProps.mirror],
                    currentMirror: nextProps.mirror,
                }));
            });
        }
    }

    componentWillMount() {
        this.getStyles = createStylingFromTheme(this.props.themeName, false);
    }

    handleSelect = mirror => {
        mirror.synchronise(this.state.currentMirror).then(() => {
            this.setState({ currentMirror: mirror });
        });
    }

    render() {
        const buttonStyles = this.getStyles('timeTravelButton');
        const buttonStylesDisabled = {
            style: { ...buttonStyles.style, ...this.getStyles('timeTravelButtonDisabled').style },
            className: [
                buttonStyles.className, ...this.getStyles('timeTravelButtonDisabled').className,
            ].filter(c => !!c).join(' '),
        };
        return (
            <div {...this.getStyles('root')}>
                {this.state.allMirrors.length > 1 &&
                    <ForwardBackButtons
                        buttonStyles={buttonStyles}
                        buttonStylesDisabled={buttonStylesDisabled}
                        currentMirror={this.state.currentMirror}
                        allMirrors={this.state.allMirrors}
                        onSelect={this.handleSelect}
                        {...this.getStyles('timeTravelButtons')}
                    />
                }
                <Node mirror={this.state.currentMirror} />
            </div>
        );
    }

}
