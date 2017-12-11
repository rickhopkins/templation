/** import dependencies */
import { Directive } from '../classes/directive.class';
import { using } from '../functions/using.function';

/** create the directive */
const crIfDirective = new Directive('crIf', ifCheck);

/** export the directive */
export { crIfDirective };

/** define the directive parser function */
function ifCheck(directive, ifElement, data) {
	/** get the for attribute value expression, and remove the attribute */
	var ifAttrVal = ifElement.getAttribute(directive.selector);
	ifElement.removeAttribute(directive.selector);

	/** evaluate the expression */
	if (using(data, ifAttrVal) === false) {
		ifElement.parentNode.removeChild(ifElement);
	}
}