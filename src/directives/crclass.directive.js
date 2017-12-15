/** import dependencies */
import { Directive } from '../classes/directive.class';
import { using } from '../functions/using.function';

/** create the directive */
const crClassDirective = new Directive('crClass', classCheck);

/** export the directive */
export { crClassDirective };

/** define the directive parser function */
function classCheck(details, classElement, data) {
	/** get the current class list */
	let classList = [];
	for (var i = 0; i < classElement.classList.length; i++) {
		classList.push(classElement.classList[i]);
	}

	/** evaluate the expression */
	let classObj = using(data, details.value);
	
	/** create internal class check function */
	const hasClass = (className) => {
		return classList.includes(className);
	};

	/** add/remove classes */
	Object.keys(classObj).forEach(key => {
		/** check if the class is true */
		if (classObj[key] === true) {
			if (!hasClass(key)) classList.push(key);
		} else {
			if (hasClass(key)) classList.splice(classList.indexOf(key), 1);
		}
	});

	/** reset the class list */
	classElement.classList = classList.join(' ');
}