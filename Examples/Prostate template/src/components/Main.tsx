import * as React from "react";

import { SectraRow, SectraSelect, SectraInput } from "@sectra/srt-components";
import { Size } from "./Size";
import { Lesion } from "./Lesion";
import { SectorMap } from "./SectorMap";
import { Col, Grid, Row } from "react-bootstrap";
import { IPixelData } from "../interfaces/PixelData";


interface MainState {
	lesions: JSX.Element[],
	nextKey: number,
	pixelData: Array<IPixelData>
}

export class Main extends React.Component<{}, MainState> {
	constructor(props: any) {
		super(props);
		this.addLesion = this.addLesion.bind(this);
		this.removeLesion = this.removeLesion.bind(this);
		this.onPixelDataChange = this.onPixelDataChange.bind(this);
		const pixelData = {transRatio: 0, pixelsA: [0, 0, 0, 0, 0], pixelsB: [0, 0, 0, 0, 0], pixelsC: [0, 0, 0, 0, 0]};
		this.state = {
			lesions: [<Lesion idExtension={1} removeFunction={this.removeLesion} key={1} keyId={1}/>],
			nextKey: 2,
			pixelData: [pixelData]
		}
	}

	addLesion() {
		this.setState((state) => {
			const key = state.lesions.length + 1;
			const newLesion = <Lesion idExtension={key} removeFunction={this.removeLesion} key={state.nextKey} keyId={state.nextKey} />;
			const lesions = state.lesions.splice(0);
			lesions.push(newLesion);
			return {lesions: lesions, nextKey: state.nextKey + 1}
		});
	}

	removeLesion(keyId: number) {
		this.setState((state) => {
			return {lesions: state.lesions.filter(elem => elem.key !== keyId.toString())};
		});
	}

	onPixelDataChange(pixelData: Array<IPixelData>) {
		this.setState({pixelData: pixelData});
	}

	render() {
		const indentLevel = 1;
		let idExtension = 0;
		return (<div>
			<input type="text" data-custom-field-type="add/remove html" name="Number of lesions" value={this.state.lesions.length} hidden></input>
			<SectorMap onPixelDataChange={this.onPixelDataChange} nrLesions={this.state.lesions.length}></SectorMap>
			<Grid>
				<Row className="show-grid form-row">
					<Col xs={12}>
						<Size idExtension={0} id="lr" includePsa={true} />
						<SectraRow labelFor="blood-artefacts" labelText="Blood artefacts">
							<SectraSelect id="blood-artefacts" name="Blood artefacts" optionValues={["Absent", "Slightly marked", "Important"]}></SectraSelect>
						</SectraRow>
						<SectraRow labelFor="adc" labelText="ADC">
							<SectraInput type="number" id="adc" name="ADC" bsSize="sm" step={0.001}></SectraInput> mm²/s
						</SectraRow>
					</Col>
				</Row>
			</Grid>
			{this.state.lesions.map((elem: JSX.Element) => {
				idExtension += 1
				return <Grid key={"grid" + elem.key}><Row className="show-grid form-row"><Col xs={12}>{React.cloneElement(elem, {idExtension: idExtension, pixelData: this.state.pixelData[idExtension-1]})}</Col></Row></Grid>;
			})}
			<Grid>
				<Row className="show-grid form-row">
					<Col xs={12}>
						<button id="add-lesion" className="btn btn-link chevron" onClick={this.addLesion}>+ Lesion</button>
					</Col>
				</Row>
			</Grid>
			<br></br>
		</div>);
	}
}
