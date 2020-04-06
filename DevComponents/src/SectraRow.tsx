import * as React from "react";

import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Grid} from "react-bootstrap";
import {SectraRowProps} from "../index";

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
            abbrTitle,
            ...props
        } = this.props;

        let className = "show-grid";
        let topMargin = "1rem";
        if (typeof(marginTop) !== "undefined") {
            topMargin = this.props.marginTop + "rem";
        }

        const label = labelText ? <label htmlFor={labelFor} {...props}>{labelText}:</label> : <React.Fragment />;
        const abbrLabel = <abbr title={abbrTitle}>{label}</abbr>

        return (
            <Grid>
                <Row className={className} style={{marginTop: topMargin}}>
                    <Col xs={4}>
                        {abbrTitle ? abbrLabel : label}
                    </Col>
                    <Col xs={8}>
                        {children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
