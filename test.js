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

	/** setup data */
	var data = {
		count: 2,
		users: [
			{ 'id': 0, 'name': 'John Doe', age: 38, selected: true, test: [1, 2, 3] },
			{ 'id': 1, 'name': 'Jane Doe', age: 38, selected: true, test: [4, 5, 6] },
			{ 'id': 2, 'name': 'Billy Doe', age: 14, selected: true, test: [7, 8, 9] },
			{ 'id': 3, 'name': 'Samantha Doe', age: 12, selected: true, test: [10, 11, 12] },
			{ 'id': 4, 'name': 'Jeremiah Doe', age: 11, selected: true, test: [13, 14, 15] },
			{ 'id': 5, 'name': 'Susie Doe', age: 9, selected: false, test: [16, 17, 18] },
			{ 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
			{ 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }
		],
		testFunc: function(message) {
			return message;
		},
		testFunc2: function(num) {
			alert(num);
		},
		testFunc3: function(message) {
			alert(message);
		},
		addUser: function(name, age) {
			data.users.push({
				id: data.users.length,
				name: name,
				age: age,
				selected: true,
				test: [1, 2, 3]
			});
		},
		modifyUser: function(user) {
			let newName = prompt('What would you like the new name to be?');
			user.name = newName;
		},
		changeUsers: function() {
			data.users = [{ 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
			{ 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }];
		},
		toggleVisibility: function(user) {
			user.selected = !user.selected;
		}
	};

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

		/** search for iterator (for) attribute */
		var forAttrElement;
		while ((forAttrElement = virtualDOM.content.querySelector('[for]')) !== null) {
			forIterator(forAttrElement, virtualDOM, data);
		}

		/** search for if attribute */
		var ifAttrElements = virtualDOM.content.querySelectorAll('[if]');
		ifAttrElements.forEach(el => ifCheck(el, data));

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

	function attachEventListeners(element) {
		/** create event selector */
		const eventSelector = `[on\\:${eventTypes.join('], [on\\:')}]`;
		
		/** search for click attribute (has to happen after inserted into DOM) */
		var eventAttrElements = element.querySelectorAll(eventSelector);
		eventAttrElements.forEach(el => eventAttach(el, data));
	}

	function updateDOM(parent, newNode, oldNode, index) {
		if (!index) index = 0;

		if (!oldNode) {
			if (newNode) {
				let newDOMNode = createElement(newNode);
				parent.appendChild(newDOMNode);

				/** attach events */
				if (!['#text', '#comment'].includes(newNode.type)) attachEventListeners(newDOMNode);
			}
		} else if (!newNode) {
			parent.removeChild(parent.childNodes[index]);
		} else if (changed(newNode, oldNode)) {
			let newDOMNode = createElement(newNode);
			parent.replaceChild(newDOMNode, parent.childNodes[index]);

			/** attach events */
			if (!['#text', '#comment'].includes(newNode.type)) attachEventListeners(newDOMNode);
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
		return /^on:/.test(prop.name);
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

	/** iterate over items in for */
	function forIterator(forElement, template, data) {
		/** get the for attribute value expression */
		var forAttrVal = forElement.getAttribute('for').split(' ');
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
				rowEl.removeAttribute('for');
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

	/** check if elements should stay in the dom */
	function ifCheck(ifElement, data) {
		/** get the for attribute value expression, and remove the attribute */
		var ifAttrVal = ifElement.getAttribute('if');
		ifElement.removeAttribute('if');

		/** evaluate the expression */
		if (using(data, ifAttrVal) === false) {
			ifElement.parentNode.removeChild(ifElement);
		}
	}

	/** bind events to the correct object method */
	function eventAttach(element, data) {
		/** get all attributes */
		let eventAttr = '';
		let eventName = '';
		for (let a = 0; a < element.attributes.length; a++) {
			if (element.attributes[a].name.substr(0, 3) === 'on:') {
				eventAttr = element.attributes[a].name;
				eventName = element.attributes[a].name.substr(3);
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