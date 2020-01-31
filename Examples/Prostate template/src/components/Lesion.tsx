import * as React from "react";
import { Collapse, Glyphicon, Col, Grid, Row } from "react-bootstrap";

import { SectraRow } from "../sectra-components/SectraRow";
import { SectraInput } from "../sectra-components/SectraInput";
import { SectraSelect } from "../sectra-components/SectraSelect";
import { SectraButtonGroup } from "../sectra-components/SectraButtonGroup";
import { Size } from "./Size";
import { LesionTexts } from "./LesionTexts";
import { IPixelData } from "../interfaces/PixelData";


interface LesionProps {
    idExtension: number;
    keyId: number;
    removeFunction: (id: number) => void;
    pixelData?: IPixelData;
}

interface LesionState {
    open: boolean;
    zone: string;
    t2Val: string;
    t2Text: string;
    dwiText: string;
    dwiVal: string;
    piradsVal: string;
    dceVal: string;
    epeVal: string;
    sviVal: string;
}

interface T2Texts {
    peripheral: string[];
    transition: string[];
}

export class Lesion extends React.Component<LesionProps, LesionState> {
    private collapseDiv: React.Ref<HTMLDivElement>
    private oneToFive = ["1", "2", "3", "4", "5"];
    private piradsId = "pirads" + this.props.idExtension;
    private piradsElement : JSX.Element;
    constructor(props: LesionProps) {
        super(props);
        this.state = {open: false, zone: "", t2Text: "", t2Val: "", dwiText: "", dwiVal: "", piradsVal: "", dceVal: "", epeVal: "", sviVal: ""};
        this.collapse = this.collapse.bind(this);
        this.remove = this.remove.bind(this);
        this.updateT2Text = this.updateT2Text.bind(this);
        this.updateDwiText = this.updateDwiText.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.updateDce = this.updateDce.bind(this);
        this.updatePirads = this.updatePirads.bind(this);
        this.collapseDiv = React.createRef();

        this.piradsElement = <SectraButtonGroup name={this.piradsId + "s"} buttonValues={this.oneToFive} checkedButton={""} key={"pirad" + this.props.keyId} onStateChange={this.updatePirads} templateFieldOnly={true}></SectraButtonGroup>
    }

    calculatePiradsVal(zone: string, dwi: string, t2: string, dce: string, currentVal: string) {
        if (zone === "Peripheral" ) {
            if (dce.toLowerCase() === "early enhancement" && dwi === "3") {
                return "4";
            }
            return dwi ? dwi : currentVal;
        }
        else if (zone === "Transition") {
            if(dwi === "5" && t2 === "3") {
                return "4";
            }
            return t2 ? t2 : currentVal; 
        }
        else {
            return currentVal;
        }
    }

    collapse(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({open: !this.state.open})
    }

    remove(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.removeFunction(this.props.keyId);
    }

    updateT2Text(t2Val: string) {
        const t2Index = parseInt(t2Val) - 1;
        this.setState(state => {
            const textArr = state.zone === "Peripheral" ? LesionTexts.T2_TEXTS.peripheral : state.zone === "Transition" ? LesionTexts.T2_TEXTS.transition : "";
            const newPiradsVal = this.calculatePiradsVal(state.zone, state.dwiVal, t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {t2Text: textArr[t2Index], t2Val: t2Val, piradsVal: newPiradsVal};
        });
    }

    updateDwiText(dwiVal: string) {
        const dwiIndex = parseInt(dwiVal) - 1;
        this.setState(state => {
            const newPiradsVal = this.calculatePiradsVal(state.zone, dwiVal, state.t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {dwiText: LesionTexts.DWI_TEXTS[dwiIndex], dwiVal: dwiVal, piradsVal: newPiradsVal};
        });
    }

    updateDce(dceVal: string) {
        this.setState(state => {
            const newPiradsVal = this.calculatePiradsVal(state.zone, state.dwiVal, state.t2Val, dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {dceVal: dceVal, piradsVal: newPiradsVal};
        });
    }

    updateZone(zone: string) {
        this.setState(state => {
            const t2Index = parseInt(state.t2Val) - 1;
            const t2Arr = zone === "Peripheral" ? LesionTexts.T2_TEXTS.peripheral : LesionTexts.T2_TEXTS.transition;
            const newPiradsVal = this.calculatePiradsVal(zone, state.dwiVal, state.t2Val, state.dceVal, state.piradsVal);
            this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: newPiradsVal});
            return {t2Text: t2Arr[t2Index], zone: zone, piradsVal: newPiradsVal};
        });
    } 

    updatePirads(piradsVal: string) {
        this.piradsElement = React.cloneElement(this.piradsElement, {checkedButton: piradsVal});
        this.setState({piradsVal: piradsVal});
    }

    private getMaxIndex(arr: Array<number>) {
        return arr.reduce((maxIndex, x, i, arr) => x > arr[maxIndex] ? i : maxIndex, 0);
    }

    render() {
        const locationId = "location" + this.props.idExtension;
        const zoneId = "zone" + this.props.idExtension;
        const sizeId = "size" + this.props.idExtension;
        const t2Id = "t2" + this.props.idExtension;
        const dwiId = "dwi" + this.props.idExtension;
        const dceId = "dce" + this.props.idExtension;
        const epeId = "epe" + this.props.idExtension;
        const sviId = "svi" + this.props.idExtension;
        const sectorId = "sector" + this.props.idExtension;
        const yesNoEq = ["Yes", "No", "Equivalent"];
        const indentLevel = 1;
        const piradsVal = this.state.piradsVal;
        let defaultZone = null;
        let sector = null;
        if (this.props.pixelData) {
            defaultZone = this.props.pixelData.transRatio > 0 ? "Transition" : "Peripheral";
            let maxiA = this.getMaxIndex(this.props.pixelData.pixelsA.slice(0, 4));
            let maxiB = this.getMaxIndex(this.props.pixelData.pixelsB.slice(0, 4));
            let maxiC = this.getMaxIndex(this.props.pixelData.pixelsC.slice(0, 4));
            let maxA = this.props.pixelData.pixelsA[maxiA], maxB = this.props.pixelData.pixelsB[maxiB], maxC = this.props.pixelData.pixelsC[maxiC];
            if (maxA > maxB && maxA > maxC) {
                sector = "A" + (this.props.pixelData.pixelsA[4] > 0 ? "v" : "d") + (maxiA + 1);
            } else if (maxB > maxC) {
                sector = "B" + (this.props.pixelData.pixelsB[4] > 0 ? "v" : "d") + (maxiB + 1);
            } else {
                sector = "C" + (this.props.pixelData.pixelsC[4] > 0 ? "v" : "d") + (maxiC + 1);
            }
            let empty = true;
            for (let i = 0; i < 5; i++) {
                if (this.props.pixelData.pixelsA[i] !== 0 || this.props.pixelData.pixelsB[i] !== 0 || this.props.pixelData.pixelsC[i] !== 0 || this.props.pixelData.transRatio !== 0) {
                    empty = false;
                    break;
                }
            } 
            if (empty) {
                defaultZone = null;
                sector = null;
            }
        }
        return (
            <div>
                <label htmlFor={"a" + this.props.idExtension}></label>
                <input type="hidden" data-field-type="text" id={"a" + this.props.idExtension} name={"a" + this.props.idExtension} value=" "></input>
                <input type="hidden" name={"Lesion " + this.props.idExtension} data-field-type="text" value=" "></input>
                <Grid><Row className="show-grid"><Col xs={4} style={{paddingLeft: 0}}>
                <button className="btn btn-link chevron" onClick={this.collapse}>Lesion {this.props.idExtension} <img src={this.state.open ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwAAADsABataJCQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNzNun2MAAACcSURBVDhPYxhC4PmLV2qPnzxrOXb85MHbd+71gfhQKTjAqgZI1APxfxi+/+DRBrAEFIDYT5+9WIys5sHDxx0giQZkQRCGaQZhdE0gfPnKtdlgE2/cvH0aXRKkGZsmoNonQBriIhADm2Z0jKIJBkACQIkzyAqRMVZNMACSwKYZryYYAClA1kyUJhgAKbx0+erc02fOrSZaE40BAwMA5cYxOfvW6lgAAAAASUVORK5CYII=" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvwAADr8BOAVTJAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNzNun2MAAACVSURBVDhPY0AGz1+8Unvw8HHH5SvXZoPYUGHC4Pade31ADf9B+MbN20+I1nzs+MmDMI0kaX785FkLskaiNYMUPH32YjGyRhAeOM2nz5xbDVWCHYA03n/waAO6xkuXr86FKsEEuDQBnXoGJAdVhgpAEiRrAgHkBEC0JhDAkgBOE9QEAsgJgGhNIABSCMT1QNyAXxMDAwCUfDE5J6RWDwAAAABJRU5ErkJggg=="}></img></button>
                </Col><Col xs={7}>
                <Collapse in={!this.state.open}>
                    <div>
                        {this.piradsElement}
                    </div>
                </Collapse></Col>
                <Col xs={1}>
                    <button className="btn btn-link chevron pull-right" onClick={this.remove}>X</button>
                </Col>
                </Row></Grid>
                <Collapse in={this.state.open}>
                <div>
                    <div className="">
                        <SectraRow labelFor={zoneId} labelText="Zone" indentLevel={indentLevel}>
                            <SectraInput inputType="text" bsSize="xl" id={zoneId} name={zoneId} value={this.state.zone} hidden></SectraInput>
                            <SectraButtonGroup name={zoneId + "s"} buttonValues={["Peripheral", "Transition"]} checkedButton={defaultZone} onStateChange={this.updateZone} templateFieldOnly={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={sectorId} labelText="Largest part in sector" indentLevel={indentLevel}>
                            <p id={sectorId}>{sector}</p>
                        </SectraRow>
                        <Size idExtension={this.props.idExtension} id={sizeId} />
                        <SectraRow labelFor={epeId} labelText="EPE" indentLevel={indentLevel}>
                            <SectraInput inputType="text" id={epeId} name={epeId} value={this.state.epeVal} bsSize="xl" hidden></SectraInput>
                            <SectraButtonGroup name={epeId + "s"} buttonValues={yesNoEq} onStateChange={(s: string) => this.setState({epeVal: s})} templateFieldOnly={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={sviId} labelText="SVI" indentLevel={indentLevel}>
                            <SectraInput inputType="text" id={sviId} name={sviId} value={this.state.sviVal} bsSize="xl" hidden></SectraInput>
                            <SectraButtonGroup name={sviId + "s"} buttonValues={yesNoEq} onStateChange={(s: string) => this.setState({sviVal: s})} templateFieldOnly={true}></SectraButtonGroup>
                        </SectraRow>
                    </div>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4}></Col>
                            <Col xs={8}><div className="template-group"></div></Col>
                        </Row>
                    </Grid>
                    <div className="">
                        <SectraRow labelFor={t2Id} labelText="T2" indentLevel={indentLevel}>
                            <SectraButtonGroup id={t2Id} name={t2Id} buttonValues={this.oneToFive} onStateChange={this.updateT2Text} templateFieldOnly={true}></SectraButtonGroup>
                            <p>{this.state.t2Text}</p>
                        </SectraRow>
                        <SectraRow labelFor={dwiId} labelText="DWI" indentLevel={indentLevel}>
                            <SectraButtonGroup id={dwiId} name={dwiId} buttonValues={this.oneToFive} onStateChange={this.updateDwiText} templateFieldOnly={true}></SectraButtonGroup>
                            <p>{this.state.dwiText}</p>
                        </SectraRow>
                        <SectraRow labelFor={dceId} labelText="DCE" indentLevel={indentLevel}>
                            <SectraButtonGroup id={dceId} name={dceId} buttonValues={["Absent", "Early enhancement", "No enhancement"]} onStateChange={this.updateDce} defaultButton="abcent" templateFieldOnly={true}></SectraButtonGroup>
                        </SectraRow>
                        <SectraRow labelFor={this.piradsId} labelText="PIRADS" indentLevel={indentLevel}>
                            <SectraInput inputType="text" bsSize="xl" value={this.state.piradsVal} name={this.piradsId} id={this.piradsId} hidden></SectraInput>
                            {this.piradsElement}
                        </SectraRow>
                    </div>
                </div>
                </Collapse>
            </div>
        );
    }
}