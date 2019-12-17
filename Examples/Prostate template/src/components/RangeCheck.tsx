import * as React from "react";
import { SectraRow } from "../sectra-components/SectraRow";
import { SectraInput } from "../sectra-components/SectraInput";
import { FormGroup } from "react-bootstrap";
import { Alert } from "react-bootstrap";

interface RangeCheckProps {
    minVal: number,
    maxVal: number
}

interface RangeCheckState {
    showError: boolean
}

export class RangeCheck extends React.Component<RangeCheckProps, RangeCheckState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {showError: false};
    }

    handleChange(value: string) {
        let showError = false;
        if (!!value) {
            const valInt = parseInt(value);
            showError = valInt < this.props.minVal || this.props.maxVal < valInt;
        }
        this.setState({showError: showError})
    }

    getValidationState() : "error" | null {
        if (this.state.showError) {
            return 'error';
        }
        return null;
    }

    render() {
        return (
            <SectraRow labelFor="range-input" labelText="Range demo">
                <FormGroup validationState={this.getValidationState()}>
                    <SectraInput id="range-input" inputType="text" bsSize="xl" name="Range check demo" onInputBlur={this.handleChange}></SectraInput>
                    {this.state.showError ? <Alert bsStyle="danger" >Value must be between {this.props.minVal} and {this.props.maxVal}.</Alert> : null}
                </FormGroup>
            </SectraRow>
        );
    }
}