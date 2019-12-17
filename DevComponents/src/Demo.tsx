import * as React from "react";

import { SectraButtonGroup } from "./SectraComponents/SectraButtonGroup";
import { SectraCheckButton } from "./SectraComponents/SectraCheckButton";
import { SectraInput } from "./SectraComponents/SectraInput";
import { SectraRow } from "./SectraComponents/SectraRow";
import { SectraSelect } from "./SectraComponents/SectraSelect";
import { SectraTextArea } from "./SectraComponents/SectraTextArea";
import { SectraCheckButtonGroup } from "./SectraComponents/SectraCheckButtonGroup";


interface DemoState {
    buttonState: string,
    selectState: string,
    checkState: boolean
}

export class Demo extends React.Component<{}, DemoState> {

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
        const values = ["Opt 1", "Opt 2"];
        return (
            <div>
                <SectraRow labelText="Dynamic button group demo" labelFor="dynamic-button-group">
                    <SectraButtonGroup id="dynamic-button-group" name="Dynamic button group" buttonValues={values} onStateChange={this.onButtonChange} />
                    <SectraInput name="Xs input" type="text" bsSize="xs" hidden={this.state.buttonState !== values[0]} />
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
            </div>
        );
    }
}

