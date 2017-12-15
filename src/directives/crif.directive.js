/** import dependencies */
import { Directive } from '../classes/directive.class';
import { using } from '../functions/using.function';

/** create the directive */
const crIfDirective = new Directive('crIf', ifCheck);

/** export the directive */
export { crIfDirective };

/** define the directive parser function */
function ifCheck(details, ifElement, data) {
	/** evaluate the expression */
	if (using(data, details.value) === false) {
		ifElement.parentNode.removeChild(ifElement);
	}
}