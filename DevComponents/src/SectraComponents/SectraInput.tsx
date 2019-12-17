import * as React from "react";
import {HTMLProps} from "react";


interface SectraInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    type: string;
    bsSize?: string;
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
        if (this.props.onChange) {
            this.props.onChange(event);
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
            type,
            bsSize,
            onChange,
            onInputChange,
            onInputBlur,
            ...htmlProps
        } = this.props;
        const dataFieldType = type == "datetime-local" ? "date" : type;
        const className = "form-control input-xs" + (!bsSize || bsSize == "xl" ? "" : " inline-input-" + bsSize);
        return (
                <input onBlur={this.handleBlur} onChange={this.handleChange} type={type} name={name}
                    data-field-type={dataFieldType} className={className} {...htmlProps}></input>
        );
    }
}

