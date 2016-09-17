import React, { Component, PureComponent, PropTypes } from 'react';
import * as base16 from 'base16';
import { createStyling } from 'react-base16-styling';
import Node from './Node';
import getStylingFromBase16 from './styles';

function isObject(maybeObj) {
    return maybeObj && typeof maybeObj == 'object';
}

const $$flashSymbol = Symbol.for('value-mirror-inspector/flash');

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
        allowTimeTravel: PropTypes.bool,
        flashOnChange: PropTypes.bool,
        mirror: PropTypes.any.isRequired,
        themeName: PropTypes.string,
        getStylingFromBase16: PropTypes.func,
    };

    static childContextTypes = {
        getStyles: PropTypes.func.isRequired,
        flashElement: PropTypes.func.isRequired,
    };

    static defaultProps = {
        themeName: 'ocean',
        flashOnChange: true,
        allowTimeTravel: true,
        getStylingFromBase16,
    };

    getChildContext() {
        return {
            getStyles: this.getStyles,
            flashElement: this.flashElement,
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
        this.createStylingFromTheme = createStyling(props.getStylingFromBase16, {
            defaultBase16: base16.solarized,
            base16Themes: base16,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mirror !== this.props.mirror) {
            if (isObject(nextProps.mirror) && isObject(this.props.mirror)) {
                nextProps.mirror.synchronise(this.props.mirror).then(() => {
                    this.setState(currentState => ({
                        allMirrors: [...currentState.allMirrors, nextProps.mirror],
                        currentMirror: nextProps.mirror,
                    }));
                });
            } else {
                this.setState(currentState => ({
                    allMirrors: [...currentState.allMirrors, nextProps.mirror],
                    currentMirror: nextProps.mirror,
                }));
            }
        }
    }

    flashElement = ref => {
        if (!this.props.flashOnChange) {
            return;
        }
        const { className, style } = this.getStyles('flash');
        if (ref[$$flashSymbol]) {
            window.clearTimeout(ref[$$flashSymbol].revertStylesTimeout);
            ref[$$flashSymbol].revertStyles();
        }
        const revertStyle = {};
        for (const styleName in style) {
            if (!(styleName in revertStyle)) {
                revertStyle[styleName] = ref.style[styleName];
            }
            ref.style[styleName] = style[styleName]; // eslint-disable-line
        }
        if (className) {
            ref.classList.add(className);
        }
        const revertStyles = () => {
            for (const styleName in revertStyle) {
                if ({}.hasOwnProperty.call(revertStyle, styleName)) {
                    ref.style[styleName] = revertStyle[styleName]; // eslint-disable-line
                }
            }
            if (className) {
                ref.classList.remove(className);
            }
            delete ref[$$flashSymbol]; // eslint-disable-line
        };
        ref[$$flashSymbol] = { // eslint-disable-line
            revertStyles,
            revertStylesTimeout: setTimeout(revertStyles, 120),
        };
    }

    componentWillMount() {
        this.getStyles = this.createStylingFromTheme(this.props.themeName, false);
    }

    handleSelect = mirror => {
        if (isObject(mirror)) {
            mirror.synchronise(this.state.currentMirror).then(() => {
                this.setState({ currentMirror: mirror });
            });
        } else {
            this.setState({ currentMirror: mirror });
        }
    }

    renderForwardbackButtons = () => {
        const buttonStyles = this.getStyles('timeTravelButton');
        const buttonStylesDisabled = {
            style: { ...buttonStyles.style, ...this.getStyles('timeTravelButtonDisabled').style },
            className: [
                buttonStyles.className, ...this.getStyles('timeTravelButtonDisabled').className,
            ].filter(c => !!c).join(' '),
        };
        return (
            <ForwardBackButtons
                buttonStyles={buttonStyles}
                buttonStylesDisabled={buttonStylesDisabled}
                currentMirror={this.state.currentMirror}
                allMirrors={this.state.allMirrors}
                onSelect={this.handleSelect}
                {...this.getStyles('timeTravelButtons')}
            />
        );
    }

    render() {
        let fbButtons;
        let { style, className } = this.getStyles('root');
        if (this.state.allMirrors.length > 1 && this.props.allowTimeTravel) {
            fbButtons = this.renderForwardbackButtons();
            const extra = this.getStyles('rootWithTimeTravel') || {};
            if (extra.style) {
                style = { ...style, style };
            }
            if (extra.className) {
                className = [(className || ''), extra.className].filter(i => !!i).join(' ');
            }
        }
        return (
            <div style={style} className={className}>
                {fbButtons}
                <Node mirror={this.state.currentMirror} />
            </div>
        );
    }

}
