(function(){
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
			this.users.push({
				id: this.users.length,
				name: name,
				age: age,
				selected: true,
				test: [1, 2, 3]
			});
		}
	};

	/** get a reference to the app container */
	const app = document.getElementById('app');
	
	/** get the template and inner html */
	const templateSource = document.getElementById('user-template');
	
	/** create a secondary template to store the modified DOM */
	const template = document.createElement('template');
	template.innerHTML = templateSource.innerHTML;

	/** search for iterator (for) attribute */
	var forAttrElement;
	while ((forAttrElement = template.content.querySelector('[for]')) !== null) {
		forIterator(forAttrElement, template, data);
	}

	/** search for if attribute */
	var ifAttrElement;
	while ((ifAttrElement = template.content.querySelector('[if]')) !== null) {
		ifCheck(ifAttrElement, data);
	}

	/** add the template to the app */
	let html = template.innerHTML;
	app.innerHTML = templater(html, data);

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

	/** create event selector */
	const eventSelector = `[on\\:${eventTypes.join('], [on\\:')}]`;

	/** search for click attribute (has to happen after inserted into DOM) */
	var eventAttrElement;
	while ((eventAttrElement = app.querySelector(eventSelector)) !== null) {
		eventAttach(eventAttrElement, data);
	}

	/** return a function that can do template parsing */
	function templater(html, data) {
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

		/** return the new html */
		return html;
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
				} else {
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
	
			/** create a new element */
			var newElement = element.cloneNode(true);
			newElement.removeAttribute(eventAttr);
	
			/** add the event */
			newElement.addEventListener(eventName, function() {
				return using(data, elementAttrVal);
			});
	
			/** replace the element */
			element.parentNode.replaceChild(newElement, element);
		}
	}
})();