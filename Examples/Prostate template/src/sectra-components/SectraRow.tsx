import * as React from "react";

import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Grid} from "react-bootstrap";

interface SectraRowProps {
    children?: React.ReactNode;
    labelText?: string;
    labelFor?: string;
    newGroup?: boolean;
    indentLevel?: number;
}

export class SectraRow extends React.Component<SectraRowProps, {}> {

    private indentLevel: number;
    constructor(props: any, context: any) {
        super(props, context);
        this.indentLevel = this.props.indentLevel ? this.props.indentLevel : 0;
    }

    render() {
		let className = "show-grid";
		className += !!this.props.newGroup ? " new-group" : " form-row";
        return (
            <Grid>
                <Row className={className}>
                    <Col xs={4}>
                        {this.props.labelText ? <label htmlFor={this.props.labelFor}>{this.props.labelText}:</label> : null}
                    </Col>
                    <Col xs={8}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
