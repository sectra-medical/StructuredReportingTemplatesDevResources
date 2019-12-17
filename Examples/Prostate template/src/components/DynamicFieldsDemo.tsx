import * as React from "react";

import {SectraButtonGroup} from "./../sectra-components/SectraButtonGroup";
import {SectraRow} from "./../sectra-components/SectraRow";
import {SectraSelect} from "./../sectra-components/SectraSelect";
import {SectraInput} from "./../sectra-components/SectraInput";


interface DynamicFieldsDemoState {
    buttonState?: string;
    selectState?: string;
};


export class DynamicFieldsDemo extends React.Component<{}, DynamicFieldsDemoState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            buttonState: null,
            selectState: null
        };

        this.onButtonChange = this.onButtonChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onButtonChange(buttonValue: string) {
        this.setState({buttonState: buttonValue});
    }

    onSelectChange(selectValue: string) {
        this.setState({selectState: selectValue});
    }

    render() {
        const values = ["Option 1", "Option 2"];
        console.log(this.state.buttonState);
        return (<div>
            <SectraRow labelText="Dynamic button group demo" labelFor="dynamic-button-group" newGroup>
                <SectraButtonGroup id="dynamic-button-group" name="Dynamic button group" buttonValues={values} onStateChange={this.onButtonChange} />
                <SectraInput name="Xs input" inputType="text" bsSize="xs" hidden={this.state.buttonState !== values[0]} />
            </SectraRow>
            <SectraRow labelText="Dynamic select demo" labelFor="dynamic-select">
                <SectraSelect id="dynamic-select" name="Dynamic select demo" optionValues={values} defaultOptionText="Select..." onStateChange={this.onSelectChange} />
                <SectraInput name="Md input" inputType="text" bsSize="sm" hidden={this.state.selectState !== values[0]} />
            </SectraRow>
        </div>);
    }
}
