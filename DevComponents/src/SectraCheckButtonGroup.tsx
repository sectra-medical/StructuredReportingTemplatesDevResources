import * as React from "react";
import {SectraCheckButtonGroupProps} from "../index";


export class SectraCheckButtonGroup extends React.Component<SectraCheckButtonGroupProps, {}> {
    constructor(props: SectraCheckButtonGroupProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="btn-group-justified btn-group btn-group-xs" data-toggle="buttons">
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child as React.ReactElement<any>, {partOfGroup: true});
                })}
            </div>
        );
    }
}