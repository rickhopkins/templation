/** import functions */
import { using } from './using.function';

/** create a temporary DOM object based on the template */
function createTemporaryDOM(template, data, directives) {
	/** create new template */
	let tempDOM = template.cloneNode(true);

	/** cycle through pre directives */
	parseDirectives(directives.filter(dir => dir.isPre()), tempDOM.content, data);

	/** replace simple template values */
	templater(tempDOM, data);

	/** return the virtual DOM */
	return tempDOM;
}

/** return a function that can do template parsing */
function templater(template, data) {
	/** get the html */
	let html = template.innerHTML;

	/** set the pattern for replacement */
	const re = /{{\s?([\w\W]*?)\s?}}/gmi;

	/** cycle over matches */
	let match;
	while ((match = re.exec(html)) !== null) {
		/** catch exceptions */
		try {
			/** replace the values in the html and reset the lastIndex of the regex */
			html = html.replace(match[0], using(data, match[1]));
			re.lastIndex = 0;
		} catch (ex) {
			console.log(ex);
		}
	}

	/** reset the innerHTML */
	template.innerHTML = html;
}

/** virtualize the passed DOM element */
function virtualizeDOM(element) {
	let vElement = { type: element.nodeName, props: [], children: [], value: '' };
	if (['#text', '#comment'].includes(element.nodeName)) vElement.value = element.nodeValue;

	if (element.attributes) {
		for (let i = 0; i < element.attributes.length; i++) {
			let a = element.attributes[i];
			vElement.props.push({ 'name': a.name, 'value': a.value });
		}
	}

	if (element.childNodes) {
		element.childNodes.forEach(c => {
			vElement.children.push(virtualizeDOM(c));
		});
	}

	return vElement;
}

/** update the given parent with new virtual DOM nodes */
function updateDOM(parent, newNode, oldNode, index) {
	if (!index) index = 0;

	if (!oldNode) {
		if (newNode) {
			let newDOMNode = createElement(newNode);
			parent.appendChild(newDOMNode);
		}
	} else if (!newNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if (hasChanged(newNode, oldNode)) {
		let newDOMNode = createElement(newNode);
		parent.replaceChild(newDOMNode, parent.childNodes[index]);
	} else if (newNode.type) {
		updateProps(parent.childNodes[index], newNode.props, oldNode.props);

		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;
		
		/** check for less new than old */
		if (newLength < oldLength) {
			/** get all the old elements that are past the new */
			let children = [];
			for (let i = newLength; i < oldLength; i++) {
				children.push(parent.childNodes[index].childNodes[i]);
			}

			/** remove old elements */
			children.forEach(c => parent.childNodes[index].removeChild(c));
		}

		/** compare all new nodes */
		for (let i = 0; i < newLength; i++) {
			updateDOM(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
		}
	}
}

/** check to see if has changed */
function hasChanged(node1, node2) {
	return (typeof node1 !== typeof node2) || (node1.type !== node2.type) || (['#text', '#comment'].includes(node1.type) && node1.value !== node2.value);
}

/** find references to the given directives on the given element and parse */
function parseDirectives(dirs, element, data) {
	/** sort the directives */
	dirs.sort(function(a, b) {
		return a.order - b.order;
	});

	/** execute each directive */
	dirs.forEach(dir => {
		/** create an array of selectors */
		let selectors = [];

		/** check for sub selectors */
		if (dir.subSelectors.length > 0) {
			/** cycle thru sub selectors */
			dir.subSelectors.forEach(ss => {
				/** add the selector with sub selector */
				selectors.push(`${dir.selector}\\:${ss}`);
			});
		} else {
			/** add the single selector */
			selectors.push(dir.selector);
		}

		/** cycle through selectors */
		selectors.forEach(selector => {
			/** initialize the directive elements */
			let directiveElement;
			while ((directiveElement = element.querySelector(`[${selector}]`)) !== null) {
				let details = getDirectiveDetails(directiveElement, dir, selector);
				dir.parser(details, directiveElement, data);
			}
		});
	});
}

/** get the attribute name (selector), sub selector, and value of a directive */
function getDirectiveDetails(element, directive, selector) {
	/** initialize the details */
	let details = { 'value': null, 'subSelector': null };

	/** get the selector */
	selector = selector.replace('\\', '');
	if (directive.isPost()) selector = selector.toLowerCase();

	/** get the attribute value expression, and remove the attribute */
	var attrVal = element.getAttribute(selector);
	element.removeAttribute(selector);

	/** set details */
	details.value = attrVal;

	/** check for sub selector */
	if (selector.includes(':')) details.subSelector = selector.split(':')[1];

	/** return the details */
	return details;
}

/** create a DOM element based on the virtual DOM node passed */
function createElement(node) {
	if (node.type === '#text') {
		return document.createTextNode(node.value);
	}
	if (node.type === '#comment') {
		return document.createComment(node.value);
	}
	const $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children.map(createElement).forEach($el.appendChild.bind($el));
	return $el;
}

/** check this property to see if it is an event property */
function isEventProp(prop) {
	return /^cron:/.test(prop.name);
}

/** set a target element's property value */
function setProp(target, prop) {
	target.setAttribute(prop.name, prop.value);
}

/** set multiple property values on a target element */
function setProps(target, props) {
	props.forEach(prop => {
		setProp(target, prop);
	});
}

/** remove a property from a target element */
function removeProp(target, prop) {
	target.removeAttribute(prop.name);
}

/** update the properties on a target element */
function updateProps(target, newProps, oldProps) {
	newProps.forEach(prop => {
		let match = oldProps.find(p => p.name === prop.name);
		if (match) {
			if (match.value !== prop.value) setProp(target, prop); // update
		} else {
			if (!isEventProp(prop)) {
				setProp(target, prop); // add new
			}
		}
	});
	oldProps.forEach(prop => {
		let match = newProps.find(p => p.name === prop.name);
		if (!match) {
			removeProp(target, prop);
		}
	});
}

/** empty an element of all children */
function emptyElement(element) {
	while (element.firstChild) element.removeChild(element.firstChild);
};

/** export the DOM related functions */
export {
	createTemporaryDOM,
	templater,
	virtualizeDOM,
	updateDOM,
	hasChanged,
	parseDirectives,
	createElement,
	isEventProp,
	setProp,
	setProps,
	removeProp,
	updateProps,
	emptyElement
};