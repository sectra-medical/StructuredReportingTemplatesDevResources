/**
 * Will be called from backplane when entering editmode on all fields that are marked as data-custom-field-type.
 * @param {Element} field The field that was marked with data-custom-field-type.
 * @param {*} value Value
 */
function setCustomFieldType(field, value) {
	switch(field.getAttribute("data-custom-field-type")) {
		case "canvas":
			setCanvas(field, value);
			break;
		case "add/remove html":
			setNrLesions(value);
			break;
		default:
			field.value = value;
	}
}

function readCustomFieldType(field) {
	return field.value;
}

function setNrLesions(value) {
	const nrLesions = parseInt(value);
	const addLesionDom = document.getElementById("add-lesion");
	for(let i = 0; i < nrLesions-1; i++) {
		addLesionDom.click();
	}
}

function setCanvas(inputField, value) {
	var ctx = document.getElementById(inputField.getAttribute("data-canvas-id")).getContext('2d');
	var img = new Image();
	
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		ctx.stroke();
	};
	img.src = value;
	inputField.value = value;
}