import * as React from "react";
import * as ReactDOM from "react-dom";
import {HTMLProps} from "react";

import {SectraRow} from "./SectraRow";


interface SectraInputProps extends HTMLProps<HTMLInputElement> {
    name: string;
    inputType: string;
    bsSize: string;
    templateFieldOnly?: boolean;
    onInputChange?: (val: string) => void;
    onInputBlur?: (val: string) => void;
}


export class SectraInput extends React.Component<SectraInputProps, {}> {
    constructor(props: any, context: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(val);
        }
    }

    handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
        const val = event.target.value;
        if (this.props.onInputBlur) {
            this.props.onInputBlur(val);
        }
    }

    render() {
        const {
            name,
            inputType,
            bsSize,
            onChange,
            ...props
        } = this.props;
        const className = "form-control input-xs" + (bsSize == "xl" ? "" : " inline-input-" + bsSize);
        return (
                <input onBlur={this.handleBlur} onChange={this.handleChange} type={this.props.inputType} name={this.props.name}
                    data-field-type={this.props.templateFieldOnly ? null : this.props.inputType} className={className} {...props}></input>
        );
    }
}

