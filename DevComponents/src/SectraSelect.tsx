import * as React from "react";
import {SectraSelectProps} from "../index";


interface SectraSelectState {
    value: string;
}

export class SectraSelect extends React.Component<SectraSelectProps, SectraSelectState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({value: event.target.value});
		if (this.props.onStateChange) {	
			this.props.onStateChange(event.target.value);
        }
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    render() {
        const {
            name,
            optionValues,
            defaultOptionText,
            onStateChange,
            keys,
            bsSize,
            preventOutput,
            ...htmlProps
        } = this.props;
        let dataFieldType = preventOutput ? null : "selection_list";
        const className = "form-control input-xs" + (!bsSize || bsSize == "xl" ? "" : " inline-input-" + bsSize);
        return (
            <select id={this.props.id} data-field-type={dataFieldType} name={name} className={className} onChange={this.handleChange} {...htmlProps}>
				{defaultOptionText ? <option hidden>{defaultOptionText}</option> : null}
                {this.props.optionValues.map(function(optionValue, index) {
                    return <option value={optionValue} key={keys ? keys[index] : optionValue}>{optionValue}</option>})}
            </select>
        );
    }
}