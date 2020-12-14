import * as React from "react";
import {SectraRadioButton} from "./SectraRadioButton";
import {SectraButtonGroupProps} from "../index";


interface SectraButtonGroupState {
    value: string;
}

export class SectraButtonGroup extends React.Component<SectraButtonGroupProps, SectraButtonGroupState> {
    constructor(props: SectraButtonGroupProps, context: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: this.props.checkedButton
        };
    }

    componentDidUpdate(prevProps: SectraButtonGroupProps) {
        if (typeof this.props.checkedButton !== "undefined" && this.props.checkedButton !== null && this.state.value !== this.props.checkedButton) {
            this.setState({value: this.props.checkedButton});
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({value: value});
        if (this.props.onStateChange) {
            this.props.onStateChange(value);
        }
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render() {
        const stateValue = this.state.value;
        const handleChange = this.handleChange;
        const {
            name,
            buttonValues,
            checkedButton,
            onStateChange,
            ref,
            id,
            justify,
            disable,
            preventOutput,
            ...htmlProps
        } = this.props;
        
        const classNames = (justify !== false ? "btn-group-justified " : "") + "btn-group btn-group-xs";
        return (
            <div className={classNames} data-toggle="buttons">
                {this.props.buttonValues.map(function(value, index) {
                    return <SectraRadioButton id={value === buttonValues[0] ? id : null} key={value} name={name}
                        disabled={disable !== undefined ? disable.indexOf(index) > - 1 : false} value={value}
                        onChange={handleChange} checked={stateValue === value} 
                        preventOutput={preventOutput} {...htmlProps}></SectraRadioButton>
                })}
            </div>
        );
    }
}