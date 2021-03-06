import * as React from "react";
import {SectraTextAreaProps} from "../index";


export class SectraTextArea extends React.Component<SectraTextAreaProps, {}> {
    constructor(props: any, context: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const val = event.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(val);
        }
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    handleBlur(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const val = event.target.value;
        if (this.props.onInputBlur) {
            this.props.onInputBlur(val);
        }
    }

    render() {
        const {
            name,
            onChange,
            onInputChange,
            onInputBlur,
            preventOutput,
            ...htmlProps
        } = this.props;
        const className = "form-control";
        let dataFieldType = preventOutput ? null : "textarea";
        return (
                <textarea onBlur={this.handleBlur} onChange={this.handleChange} name={name}
                    data-field-type={dataFieldType} className={className} {...htmlProps}></textarea>
        );
    }
}

