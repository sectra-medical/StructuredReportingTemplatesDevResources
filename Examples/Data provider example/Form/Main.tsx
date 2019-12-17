import * as React from "react";

export class Main extends React.Component<{}, {}> {
	updateProviderData() {
		(window as any).parent.getData(["SimpleProvider"]);
	}

	render() {
		return (
			<div>
				Cancer size:
				<input type="number" name="Cancer size" data-field-type="text" data-merge-identifier="SimpleProvider.cancerSize" />
				<br />
				Follow-up:
				<select name="Follow-up" data-field-type="select" data-merge-identifier="SimpleProvider.followUp">
					<option>No</option>
					<option>Exam 1</option>
					<option>Exam 2</option>
					<option>Exam 3</option>
				</select>
				<br />
				<br />
				<button className="btn btn-primary" onClick={this.updateProviderData}>Refresh data</button>
			</div>
		);
	}
}