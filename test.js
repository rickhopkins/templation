(function() {
	/** create an array of events to search for */
	const eventTypes = [ // https://www.w3schools.com/jsref/dom_obj_event.asp
		/** mouse events */
		'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',

		/** keyboard events */
		'keydown', 'keypress', 'keyup',

		/** frame / object events */
		'abort', 'beforeunload', 'error', 'hashchange', 'load', 'pageshow', 'pagehide', 'resize', 'scroll', 'unload',

		/** form events */
		'blur', 'change', 'focus', 'focusin', 'focusout', 'input', 'invalid', 'reset', 'search', 'select', 'submit',

		/** drag events */
		'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',

		/** clipboard events */
		'copy', 'cut', 'paste',

		/** print events */
		'afterprint', 'beforeprint',

		/** media events */
		'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting',

		/** misc events */
		'online', 'offline', 'wheel',

		/** touch events */
		'touchcancel', 'touchend', 'touchmove', 'touchstart'
	];

	/** initialize directives */
	let directives = [
		{ 'selector': 'crFor', 'subSelectors': [], 'parser': forIterator, 'order': 1, 'pre': true, 'post': false },
		{ 'selector': 'crIf', 'subSelectors': [], 'parser': ifCheck, 'order': 2, 'pre': true, 'post': false },
		{ 'selector': 'crOn', 'subSelectors': eventTypes, 'parser': eventAttach, 'order': 3, 'pre': false, 'post': true }
	];

	/** make the data observable */
	observable(data);

	function observable(obj) {
		if (Array.isArray(obj) && !obj.hasOwnProperty('push')) observableArray(obj);
		for (let prop in obj) {
			observableProp(obj, prop);
			if (typeof obj[prop] === 'object') {
				observable(obj[prop]);
			}
		}
	}

	function observableProp(obj, prop) {
		let value = obj[prop]
		Object.defineProperty(obj, prop, {
			get () {
				return value;
			},
			set (newValue) {
				value = newValue;
				if (typeof value === 'object') observable(value);
				
				console.log('Rebuild');
				buildInterface(false);
			}
		});
	}

	function observableArray(arrayObj) {
		const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];
		arrayMethods.forEach(m => {
			const _method = Array.prototype[m];
			Object.defineProperty(arrayObj, m, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: function () {
					let result = _method.apply(this, arguments);
					observable(this);
					buildInterface(false);
					return result;
				}
			});
		});
	}

	function buildInterface(initial) {
		/** get a reference to the app container */
		const app = document.getElementById('app');

		/** get the template and inner html */
		const originalTemplate = document.getElementById('user-template');
		const virtualDOM = createVirtualDOM(originalTemplate);

		/** set the app */
		updateDOM(app, virtualizeDOM(virtualDOM.content.children[0]), !initial ? virtualizeDOM(app.children[0]) : undefined);

		/** cycle through post directives */
		directives.filter(dir => dir.post).forEach(dir => {
			/** initialize the directive elements */
			let directiveElements;

			/** does the directive have sub selectors */
			if (dir.subSelectors.length > 0) {
				/** find all matches and process each */
				const joinedSubSelectors = dir.subSelectors.join(`], [${dir.selector}\\:`);
				const subSelectors = `[${dir.selector}\\:${joinedSubSelectors}]`;

				/** find all elements that match and parse */
				directiveElements = app.querySelectorAll(subSelectors);
				directiveElements.forEach(el => dir.parser(dir, el, app, data));
			} else {
				/** find in order and parse */
				while ((directiveElements = app.querySelector(`[${dir.selector}]`)) !== null) {
					dir.parser(dir, directiveElements, app, data);
				}
			}
		});
	}

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

	function createVirtualDOM(template) {
		/** create new template */
		let virtualDOM = template.cloneNode(true);

		/** sort the directives */
		directives.sort(function(a, b) {
			return a.order - b.order;
		});

		/** cycle through pre directives */
		directives.filter(dir => dir.pre).forEach(dir => {
			/** initialize the directive elements */
			let directiveElements;

			/** does the directive have sub selectors */
			if (dir.subSelectors.length > 0) {
				/** find all matches and process each */
				const joinedSubSelectors = dir.subSelectors.join(`], [${dir.selector}\\:`);
				const subSelectors = `[${dir.selector}\\:${joinedSubSelectors}]`;

				/** find all elements that match and parse */
				directiveElements = element.querySelectorAll(subSelectors);
				directiveElements.forEach(el => dir.parser(dir, el, virtualDOM, data));
			} else {
				/** find in order and parse */
				while ((directiveElements = virtualDOM.content.querySelector(`[${dir.selector}]`)) !== null) {
					dir.parser(dir, directiveElements, virtualDOM, data);
				}
			}
		});

		/** replace simple template values */
		templater(virtualDOM, data);

		/** return the virtual DOM */
		return virtualDOM;
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

	function updateDOM(parent, newNode, oldNode, index) {
		if (!index) index = 0;

		if (!oldNode) {
			if (newNode) {
				let newDOMNode = createElement(newNode);
				parent.appendChild(newDOMNode);
			}
		} else if (!newNode) {
			parent.removeChild(parent.childNodes[index]);
		} else if (changed(newNode, oldNode)) {
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

	function changed(node1, node2) {
		return (typeof node1 !== typeof node2) || (node1.type !== node2.type) || (['#text', '#comment'].includes(node1.type) && node1.value !== node2.value);
	}

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

	function isEventProp(prop) {
		return /^cron:/.test(prop.name);
	}

	function setProp(target, prop) {
		target.setAttribute(prop.name, prop.value);
	}

	function setProps(target, props) {
		props.forEach(prop => {
			setProp(target, prop);
		});
	}

	function removeProp(target, prop) {
		target.removeAttribute(prop.name);
	}

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

	function emptyElement(element) {
		while (element.firstChild) element.removeChild(element.firstChild);
	}

	function using(obj, code, ref, refData) {
		/** replace html entities */
		const decodingMap = [
			{ entity: '&lt;', char: '<' },
			{ entity: '&gt;', char: '>' },
			{ entity: '&quot;', char: '"' },
			{ entity: '&amp;', char: '&' },
			{ entity: '&#10;', char: '\n' },
			{ entity: '&#9;', char: '\t' }
		];

		decodingMap.forEach(m => {
			code = code.replace(m.entity, m.char);
		});

		let withFunc = new Function('obj', ref, `
			let { ${Object.getOwnPropertyNames(obj).join(', ') } } = obj;
			return (${code});
		`);

		return withFunc(obj, refData);
	}

	/** directive parser functions */

	function forIterator(directive, forElement, template, data) {
		/** get the for attribute value expression */
		var forAttrVal = forElement.getAttribute(directive.selector).split(' ');
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
				rowEl.removeAttribute(directive.selector);
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

		/** replace the crFor element with the rows */
		let html = template.innerHTML;
		html = html.replace(forElement.outerHTML, forHTML);
		template.innerHTML = html;
	}

	function ifCheck(directive, ifElement, template, data) {
		/** get the for attribute value expression, and remove the attribute */
		var ifAttrVal = ifElement.getAttribute(directive.selector);
		ifElement.removeAttribute(directive.selector);

		/** evaluate the expression */
		if (using(data, ifAttrVal) === false) {
			ifElement.parentNode.removeChild(ifElement);
		}
	}

	function eventAttach(directive, element, template, data) {
		/** initialize the selector */
		let selector = `${directive.selector.toLowerCase()}`;
		if (directive.subSelectors.length > 0) selector += ':';

		/** get all attributes */
		let eventAttr = '';
		let eventName = '';
		for (let a = 0; a < element.attributes.length; a++) {
			if (element.attributes[a].name.substr(0, selector.length) === selector) {
				eventAttr = element.attributes[a].name;
				eventName = element.attributes[a].name.substr(selector.length);
				break;
			}
		}

		/** get the event attribute */
		if (eventAttr.length > 0) {
			/** get the attribute value */
			var elementAttrVal = element.getAttribute(eventAttr);

			/** create the event function */
			let eventFunc = function() {
				return using(data, elementAttrVal);
			};

			/** remove and re-add the event listener */
			element.removeEventListener(eventName, eventFunc);
			element.addEventListener(eventName, eventFunc);

			/** remove the attribute */
			element.removeAttribute(eventAttr);
		}
	}

	/** build the interface */
	buildInterface(true);
})();