import * as React from "react";
import { SectraRow } from "../sectra-components/SectraRow";
import { SectraInput } from "../sectra-components/SectraInput";

interface AddState {
    firstInput: number,
    secondInput: number,
    result: number
}

export class AdditionComponent extends React.Component<{}, AddState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {firstInput: 0, secondInput: 0, result: 0};
        this.firstInputCallback = this.firstInputCallback.bind(this);
        this.secondInputCallback = this.secondInputCallback.bind(this);
    }

    firstInputCallback(val: string) {
        let valInt = 0;
        if (!!val) {
            valInt = parseInt(val);
        }
        this.setState({firstInput: valInt, result: valInt + this.state.secondInput}); 
    }

    secondInputCallback(val: string) {
        let valInt = 0;
        if (!!val) {
            valInt = parseInt(val);
        }
        this.setState({secondInput: valInt, result: valInt + this.state.firstInput});
    }

    render() {
        return (
            <SectraRow labelText="Formula demo" labelFor="addition">
                <div id="addition">
                    <SectraInput id="x" inputType="number" name="Formula X" bsSize="xs" onInputChange={this.firstInputCallback}></SectraInput>+
                    <SectraInput id="y" inputType="number" name="Formula Y" bsSize="xs" onInputChange={this.secondInputCallback}></SectraInput>=
                    <label htmlFor="result" hidden={true}>X({this.state.firstInput}) + Y({this.state.secondInput}) = </label>
                    <SectraInput id="result" inputType="number" name="Formula Result" bsSize="xs" value={this.state.result.toString()} readOnly={true}></SectraInput>
                </div>
            </SectraRow>
        );
    }
}