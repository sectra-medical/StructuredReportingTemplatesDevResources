import * as React from "react";

import { SectraButtonGroup } from "./SectraButtonGroup";
import { SectraCheckButton } from "./SectraCheckButton";
import { SectraInput } from "./SectraInput";
import { SectraRow } from "./SectraRow";
import { SectraSelect } from "./SectraSelect";
import { SectraTextArea } from "./SectraTextArea";
import { SectraCheckButtonGroup } from "./SectraCheckButtonGroup";


interface TestState {
    buttonState: string,
    selectState: string,
    checkState: boolean
}

export class Test extends React.Component<{}, TestState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.onButtonChange = this.onButtonChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.state = {buttonState: null, selectState: null, checkState: true};
    }

    onButtonChange(buttonValue: string) {
        this.setState({buttonState: buttonValue});
    }

    onSelectChange(selectValue: string) {
        this.setState({selectState: selectValue});
    }

    onCheckChange(checkValue: boolean) {
        this.setState({checkState: checkValue});
    }

    render() {
        const values = ["Opt 1", "Option 2"];
        return (
            <div>
                <SectraRow labelText="Dynamic button group demo" labelFor="dynamic-button-group">
                    <SectraButtonGroup id="dynamic-button-group" name="Dynamic button group" buttonValues={values} onStateChange={this.onButtonChange} />
                    <SectraInput name="Xs input" type="text" bsSize="xs" hidden={this.state.buttonState !== values[0]} />
                </SectraRow>
                <SectraRow labelText="Unjustified button group demo" labelFor="unjustified-button-group">
                    <SectraButtonGroup id="unjustified-button-group" name="unjustified button group" buttonValues={values} justify={false} />
                </SectraRow>
                <SectraRow labelText="Disabled button group demo" labelFor="disabled-button-group">
                    <SectraButtonGroup id="disabled-button-group" name="disabled button group" buttonValues={values} disable={[1]}/>
                </SectraRow>
                <SectraRow labelText="Dynamic select demo" labelFor="dynamic-select">
                    <SectraSelect id="dynamic-select" name="Dynamic select demo" optionValues={values} defaultOptionText="Select..." onStateChange={this.onSelectChange} />
                    <SectraInput name="Md input" type="text" bsSize="sm" hidden={this.state.selectState !== values[0]} />
                </SectraRow>
                <SectraRow labelFor="check" labelText="Single check button">
                    <SectraCheckButtonGroup>
                        <SectraCheckButton name="Checkbutton" id="check" value="Check" checked={this.state.checkState} onStateChange={this.onCheckChange} />
                    </SectraCheckButtonGroup>
                </SectraRow>
                {<SectraRow labelFor="checkgroup" labelText="Check group">
                    <SectraCheckButtonGroup>
                        <SectraCheckButton name="Checkbutton2" id="checkgroup" value="Check" />
                        <SectraCheckButton name="Checkbutton3" value="Check 2" />
                    </SectraCheckButtonGroup>
                </SectraRow>}
                <SectraRow labelFor="textarea" labelText="Text area">
                    <SectraTextArea name="Textarea" id="textarea" />
                </SectraRow>
                <SectraRow abbrTitle='Testing Abbr Title' labelText="TAT">
                    <SectraInput name={'Input'} type={'text'} />
                </SectraRow>
            </div>
        );
    }
}

