import * as React from "react";
import {SectraRadioButton} from "./SectraRadioButton";


interface SectraButtonGroupProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    buttonValues: string[];
    checkedButton?: string;
    onStateChange?: (buttonText: string) => void;
}

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
        if (prevProps.checkedButton !== this.props.checkedButton) {
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
            ...htmlProps
        } = this.props;
        return (
            <div className="btn-group-justified btn-group btn-group-xs" data-toggle="buttons">
                {this.props.buttonValues.map(function(value) {
                    return <SectraRadioButton id={value === buttonValues[0] ? id : null} key={value} name={name} value={value} onChange={handleChange} checked={stateValue === value} {...htmlProps}></SectraRadioButton>
                })}
            </div>
        );
    }
}