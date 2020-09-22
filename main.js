const codeBlock = document.querySelector("code");
const unitSelectBox = document.querySelector("#unit");
const hightlightBox = document.querySelector('pre code');
const inputControls = document.querySelectorAll(".FormInput");
const previewBox = document.querySelector(".PreviewWrapper__Box");

let radiusValues = {
	topLeft: 0,
	topRight: 0,
	bottomLeft: 0,
	bottomRight: 0,
	unit: ''
};

hljs.initHighlightingOnLoad();

unitSelectBox.addEventListener('change', handleUnitChange);
radiusValues.unit = unitSelectBox.value;
renderStyle();

inputControls.forEach(control => {
	control.value = 0;
	control.addEventListener('input', handleRangeChange);
});
/**
 *
 * handles change in unit
 *
 * @param {Object} evt - native change event object
 */
function handleUnitChange(evt){
	radiusValues.unit = evt.target.value;
	renderStyle();
}
/**
 *
 * handlesChange in range inputs
 *
 * @param {Object} evt - native input event object
 */
function handleRangeChange(evt){
	let targetElement = evt.target;
	radiusValues[targetElement.name] = targetElement.value;
	renderStyle();
}
/**
 *
 * renders updated border radius values
 *
 */
function renderStyle(){
	let { topLeft, topRight, bottomRight, bottomLeft, unit } = radiusValues;
	let styleString = '';

	switch(true){
		case(topLeft == topRight && topRight == bottomRight && bottomRight == bottomLeft):
			styleString = `${topLeft + unit}`;break;
		case(topLeft == bottomRight && topRight == bottomLeft):
			styleString = `${topLeft + unit} ${topRight + unit}`;break;
		default:
			styleString = `${topLeft + unit} ${topRight + unit} ${bottomRight + unit} ${bottomLeft + unit}`;
	}

	previewBox.style.borderRadius = styleString;
	codeBlock.textContent = ".selector{ " + styleString + "; }";
}