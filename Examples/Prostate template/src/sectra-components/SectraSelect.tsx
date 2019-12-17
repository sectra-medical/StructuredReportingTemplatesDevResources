import * as React from "react";


interface SectraSelectState {
    value: string;
}

interface SectraSelectProps {
    id?: string;
    name: string;
    optionValues: string[];
	defaultOptionText?: string;
    onStateChange?: (x: string) => void;
}

export class SectraSelect extends React.Component<SectraSelectProps, SectraSelectState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
		if (this.props.onStateChange) {	
			this.props.onStateChange(event.target.value);
		}
    }

    render() {
        return (
            <select id={this.props.id} data-field-type="selection_list" name={this.props.name} className="form-control input-xs" onChange={this.handleChange}>
				{this.props.defaultOptionText ? <option hidden>{this.props.defaultOptionText}</option> : null}
                {this.props.optionValues.map(function(optionValue) {
                    return <option value={optionValue}>{optionValue}</option>})}
            </select>
        );
    }
}
