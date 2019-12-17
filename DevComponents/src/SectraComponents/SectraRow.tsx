import * as React from "react";

import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Grid} from "react-bootstrap";


interface SectraRowProps extends React.HTMLProps<HTMLLabelElement> {
    children?: React.ReactNode;
    labelText?: string;
    labelFor?: string;
    marginTop?: number;
}

export class SectraRow extends React.Component<SectraRowProps, {}> {

    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        const {
            labelFor,
            labelText,
            children,
            marginTop,
            ...props
        } = this.props;

        let className = "show-grid";
        let topMargin = "1rem";
        if (typeof(marginTop) !== "undefined") {
            topMargin = this.props.marginTop + "rem";
        }
        return (
            <Grid>
                <Row className={className} style={{marginTop: topMargin}}>
                    <Col xs={4}>
                        {labelText ? <label htmlFor={labelFor} {...props}>{labelText}:</label> : null}
                    </Col>
                    <Col xs={8}>
                        {children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
