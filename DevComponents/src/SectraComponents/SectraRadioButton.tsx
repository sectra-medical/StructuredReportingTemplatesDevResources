import * as React from "react";

interface SectraToggleButtonProps extends React.HTMLProps<HTMLInputElement> {
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean,
}

interface SectraToggleButtonState {
    focused: boolean
}

export class SectraRadioButton extends React.Component<SectraToggleButtonProps, SectraToggleButtonState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {focused: false};
    }

    handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: true})
    }

    handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        this.setState({focused: false})
    }

    render() {
        const {
            name,
            checked,
            ...htmlProps
        } = this.props;
        let labelClass = "btn-default btn btn-secondary";
        if(checked) labelClass += " active";
        if (this.state.focused) labelClass += " focus";
        else labelClass = labelClass.replace(" focus", "");
        return (
            <label className={labelClass}>
                <input type="radio" onBlur={this.handleBlur} onFocus={this.handleFocus} name={name} data-field-type="radio button" autoComplete="off" checked={!!checked} {...htmlProps} onChange={this.props.onChange}/>{htmlProps.value}
            </label>
        )
    }
}
