import * as React from "react";
import {SectraCheckButtonProps} from "../index";


interface SectraCheckButtonState {
    checked: boolean,
    focused: boolean
}

export class SectraCheckButton extends React.Component<SectraCheckButtonProps, SectraCheckButtonState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {checked: !!this.props.checked, focused: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.onStateChange) {	
            this.props.onStateChange(!this.state.checked);
        }
        if (this.props.onChange) {
            this.props.onChange(event);
        }
        this.setState(state => { return {checked: !state.checked}});
    }

    handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: true})
    }

    handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: false})
    }

    componentDidUpdate(prevProps: SectraCheckButtonProps) {
        if (prevProps.checked !== this.props.checked || prevProps.value !== this.props.value) {
            this.setState({checked: this.props.checked});
        }
    }

    render() {
        const {
            name,
            onStateChange,
            checked,
            value,
            partOfGroup,
            ...htmlProps
        } = this.props;
        let labelClass = "btn-default btn btn-secondary";
        if(this.state.checked) labelClass += " active";
        if (this.state.focused) labelClass += " focus";
        else labelClass = labelClass.replace(" focus", "");

        const element = (
            <label className={labelClass}>
                <input type="checkbox" onBlur={this.handleBlur} onFocus={this.handleFocus} name={name} data-field-type="checkbox" autoComplete="off" value={value} checked={this.state.checked} {...htmlProps} onChange={this.handleChange}/>{value}
            </label>);

        return (
                !!partOfGroup ? element
                : <div className="btn-group" data-toggle="buttons" style={htmlProps.style}>{element}</div>
                
        );
    }
}

