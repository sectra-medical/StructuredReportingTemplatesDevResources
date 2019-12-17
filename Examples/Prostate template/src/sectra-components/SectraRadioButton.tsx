import * as React from "react";

interface SectraToggleButtonProps {
    value: string,
    name: string,
    checked?: boolean,
    id?: string,
    templateFieldOnly?: boolean,
    onChange?: (val: string) => void
}

interface SectraToggleButtonState {
    focused: boolean
}

export class SectraRadioButton extends React.Component<SectraToggleButtonProps, SectraToggleButtonState> {
    constructor(props: SectraToggleButtonProps, context: any) {
        super(props, context);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {focused: false};
    }

    handleChange(value: string) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: true})
    }

    handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: false})
    }

    render() {
        const checked = !!this.props.checked;
        let labelClass = "btn-secondary btn btn-default";
        if(checked) labelClass += " active";
        if (this.state.focused) labelClass += " focus";
        else labelClass = labelClass.replace(" focus", "");
        return (
            <label className={labelClass}>
                <input type="radio" onBlur={this.handleBlur} onFocus={this.handleFocus} name={this.props.name} data-field-type={this.props.templateFieldOnly ? null : "radio button"} autoComplete="off" value={this.props.value} checked={!!this.props.checked} onChange={(e) => this.handleChange(this.props.value)}/>{this.props.value}
            </label>
        )
    }
}