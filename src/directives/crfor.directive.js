/** import dependencies */
import { Directive } from '../classes/directive.class';

/** create the directive */
const crForDirective = new Directive('crFor', forIterator);

/** export the directive */
export { crForDirective };

/** define the directive parser function */
function forIterator(details, forElement, data) {
	/** get the for attribute value expression */
	var forAttrVal = details.value.split(' ');
	var entityRef = forAttrVal[0];
	var entityProp = forAttrVal[2];

	/** cycle over the property */
	var forHTML = '';

	let getDataProperty = new Function('obj', `
		return (obj.${entityProp});
	`);

	/** check the entityProperty type */
	let dataProperty = getDataProperty(data);
	if (Array.isArray(dataProperty)) {
		dataProperty.forEach((row, i) => {
			/** add html for the iteration */
			var rowEl = forElement.cloneNode(true);
			var rowHTML = rowEl.outerHTML;

			/** get the row properties */
			let rowProps = Object.getOwnPropertyNames(row);
			if (rowProps.length > 0) {
				rowProps.forEach(p => {
					rowHTML = rowHTML.replace(`${entityRef}.`, `${entityProp}[${i}].`);
				});
			}
			
			/** create regular expression to match the entityRef */
			let re = new RegExp(`([^\\w])(${entityRef}\\b)([^\\w])`, 'gmi'); // /([^\w])(n\b)([^/w])/gmi
			let match;
			while ((match = re.exec(rowHTML)) !== null) {
				try {
					let replacement = `${match[1]}${entityProp}[${i}]${match[3]}`;
					rowHTML = rowHTML.replace(match[0], replacement);
				} catch (ex) {
					console.log(ex);
				}
			}
			
			/** add the html to the crForHtml */
			forHTML += rowHTML;
		});
	}

	/** replace the forElements html */
	forElement.outerHTML = forHTML;
}