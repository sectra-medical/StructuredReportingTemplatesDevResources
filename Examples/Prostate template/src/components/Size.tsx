import * as React from "react";

import { SectraRow, SectraInput } from "@sectramedical/srt-components";


interface SizeProps {
	id: string;
	idExtension: number;
	includePsa?: boolean;
}

interface SizeState {
	lr: number;
	ap: number;
	cc: number;
	volume: string;
	psa: number;
	psad: string;
	sizeValue: string;
}

export class Size extends React.Component<SizeProps, SizeState> {
	constructor(props: SizeProps) {
		super(props);
		this.state = {lr: null, ap: null, cc: null, volume: "", psa: null, psad: "", sizeValue: ""};
		this.lrChanged = this.lrChanged.bind(this);
		this.apChanged = this.apChanged.bind(this);
		this.ccChanged = this.ccChanged.bind(this);
		this.psaChanged = this.psaChanged.bind(this);
	}

	calculateVolume(lr: number, ap: number, cc: number) {
		if (!lr || !ap || !cc) {
			return "";
		}
		return (Math.round(lr * ap * cc * Math.PI/6 / 1000 * 10) / 10).toString();
	}

	calculatePsad(psa: number, volume: number) {
		if (!psa || !volume || volume === 0) {
			return "";
		}
		return (Math.round(psa / volume * 100) / 100).toString();
	}

	generateSizeValue(lr: number, ap: number, cc: number) {
		const lrStr = lr ? (lr.toString() + " ") : "";
		const apStr = ap ? (ap.toString() + " ") : "";
		const ccStr = cc ? cc.toString() : "";
		if (!lr && !ap && !cc) {
			return "";
		} else if (this.props.includePsa) {
			return lrStr + "x " + apStr + "x " + ccStr;
		} else {
			return ccStr;
		}
	}

	lrChanged(lrStr: string) {
		const lr = parseInt(lrStr);
		this.setState(state => {
			const volume = this.calculateVolume(lr, state.ap, state.cc);
			const psad = this.calculatePsad(state.psa, parseInt(volume));
			return {lr: lr, volume: volume, psad: psad, sizeValue: this.generateSizeValue(lr, state.ap, state.cc)};
		});
	}

	apChanged(apStr: string) {
		const ap = parseInt(apStr);
		this.setState(state => {
			const volume = this.calculateVolume(state.lr, ap, state.cc);
			const psad = this.calculatePsad(state.psa, parseInt(volume));
			return {ap: ap, volume: volume, psad: psad, sizeValue: this.generateSizeValue(state.lr, ap, state.cc)};
		});
	}

	ccChanged(ccStr: string) {
		const cc = parseInt(ccStr);
		this.setState(state => {
			const volume = this.calculateVolume(state.lr, state.ap, cc);
			const psad = this.calculatePsad(state.psa, parseInt(volume));
			return {cc: cc, volume: volume, psad: psad, sizeValue: this.generateSizeValue(state.lr, state.ap, cc)};
		});
	}

	psaChanged(psaStr: string) {
		const psa = parseInt(psaStr);
		this.setState(state => {
			const psad = this.calculatePsad(psa, parseInt(state.volume));
			return {psa: psa, psad: psad};
		});
	}

	render() {
		const psaId = "psa" + this.props.idExtension;
		const sizeId = "lr" + this.props.idExtension;
		const volumeId = "volume" + this.props.idExtension;
		const psadId = "psad" + this.props.idExtension;
		const apName = "AP" + this.props.idExtension;
		const ccName = "CC" + this.props.idExtension;
        return (
			<div>
				{this.props.includePsa ? 
				<SectraRow labelFor={psaId} labelText="PSA">
					<SectraInput id={psaId} bsSize="sm" name="PSA" type="number" onInputChange={this.psaChanged} />
					ng/mL
				</SectraRow> : null}
				<SectraRow labelFor={sizeId} labelText="Size">
					<SectraInput type="text" name={sizeId} id={sizeId} bsSize="xl" value={this.state.sizeValue} hidden></SectraInput>
					{this.props.includePsa ?
						<div>
							<SectraInput name={sizeId + "s"} type="number" bsSize="xs" placeholder="LR" onInputChange={this.lrChanged} preventOutput={true} />
							<span className="inline-text">x</span>
							<SectraInput name={apName} type="number" bsSize="xs" placeholder="AP" onInputChange={this.apChanged} preventOutput={true} />
							<span className="inline-text">x</span>
							<SectraInput name={ccName} type="number" bsSize="xs" placeholder="CC" onInputChange={this.ccChanged} preventOutput={true} />
						</div>
					: <SectraInput name={ccName} type="number" bsSize="sm" placeholder="CC" onInputChange={this.ccChanged} preventOutput={true} />
					}
					mm
				</SectraRow>
				{this.props.includePsa ?
				<SectraRow labelFor={volumeId} labelText="Volume">
					<SectraInput id={volumeId} name={volumeId} type="text" bsSize="sm" value={this.state.volume} readOnly={true}/>
					cm³
				</SectraRow>
				: null}
				{this.props.includePsa ?
				<SectraRow labelFor={psadId} labelText="PSAD">
					<SectraInput type="number" id={psadId} name={psadId} bsSize="sm" value={this.state.psad} readOnly={true}></SectraInput>
					ng/ml/cc
				</SectraRow>
				: null}
			</div>
        );
    }
}
