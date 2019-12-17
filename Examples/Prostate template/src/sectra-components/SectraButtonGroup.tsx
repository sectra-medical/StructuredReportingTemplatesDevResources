import * as React from "react";
import {ToggleButtonGroup} from "react-bootstrap";
import {SectraRadioButton} from "./SectraRadioButton";


interface SectraButtonGroupState {
    value: string;
}

interface SectraButtonGroupProps {
    id?: string;
    name: string;
    buttonValues: string[];
    defaultButton?: string;
    checkedButton?: string;
    templateFieldOnly?: boolean;
    onStateChange?: (buttonText: string) => void;
}

export class SectraButtonGroup extends React.Component<SectraButtonGroupProps, SectraButtonGroupState> {
    private stateChangedInternaly: boolean;

    constructor(props: SectraButtonGroupProps, context: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: this.props.defaultButton
        };
        this.stateChangedInternaly = false;
    }

    handleChange(e: string) {
        this.stateChangedInternaly = true;
        this.setState({value: e});
        if (this.props.onStateChange) {
            this.props.onStateChange(e);
        }
    }

    componentDidUpdate(prevProps: SectraButtonGroupProps) {
        if (this.props.checkedButton && this.props.checkedButton !== this.state.value && !this.stateChangedInternaly) {
            this.setState({value: this.props.checkedButton});
            if (this.props.onStateChange) {
                this.props.onStateChange(this.props.checkedButton);
            }
            this.stateChangedInternaly = false;
        } else {
            this.stateChangedInternaly = false;
        }
    }    

    render() {
        const stateValue = this.state.value;
        const defaultButton = this.props.defaultButton;
        const templateFieldOnly = this.props.templateFieldOnly;
        return (
            <ToggleButtonGroup id={this.props.id} type="radio" name={this.props.name} value={this.state.value} onChange={this.handleChange} className="btn-group-justified" bsSize="xsmall">
                {this.props.buttonValues.map(function(value) {
                    return <SectraRadioButton id={defaultButton} name={name} value={value} checked={stateValue === value} templateFieldOnly={templateFieldOnly}></SectraRadioButton>
                })}
            </ToggleButtonGroup>
        );
    }
}