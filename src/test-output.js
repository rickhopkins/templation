/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Directive; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Directive
 * Defines a directive that Templation will search for in the template and parse
 * @param {string} selector The selector that will be used in the directive (ex: crFor)
 * @param {function} parser The function that will be executed for the directive. The parser receives a reference to the directive, the effected element, and the associated data
 */
var Directive = function () {
	function Directive(selector, parser) {
		var _this = this;

		_classCallCheck(this, Directive);

		/** public properties */

		/** @public {string} The selector name for the directive */
		this.selector = selector;

		/** @public {function} The function that is executed for the directive */
		this.parser = parser;

		/** @public {string[]} An array of sub selectors. Referenced by using a colon (:) after the main selector (ex: crOn:click) */
		this.subSelectors = [];

		/** private properties */

		/** @private {number} A number indicating the order in which the directive should be processed */
		var _order = 0;
		this.setOrder = function (order) {
			_order = order;
			return _this;
		};
		this.getOrder = function () {
			return _order;
		};

		/** @private {boolean} A boolean indicating if this directive should be processed before DOM insertion */
		var _pre = true;
		this.setPre = function (pre) {
			_pre = pre;
			return _this;
		};
		this.isPre = function () {
			return _pre;
		};

		/** @private {boolean} A boolean indicating if this directive should be processed after DOM insertion */
		var _post = true;
		this.setPost = function (post) {
			_post = post;
			return _this;
		};
		this.isPost = function () {
			return _post;
		};
	}

	/** public methods */

	/**
  * @method Set the sub selectors
  * @param {string[]} An array of strings to function as sub selectors
  * @returns {Directive}
  */


	_createClass(Directive, [{
		key: "setSubSelectors",
		value: function setSubSelectors(subSelectors) {
			this.subSelectors = subSelectors;
			return this;
		}
	}]);

	return Directive;
}();

/** export Directive */




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return using; });
/** user the passed object to execute the given code */
function using(obj, code, ref, refData) {
	/** replace html entities */
	var decodingMap = [{ entity: '&lt;', char: '<' }, { entity: '&gt;', char: '>' }, { entity: '&quot;', char: '"' }, { entity: '&amp;', char: '&' }, { entity: '&#10;', char: '\n' }, { entity: '&#9;', char: '\t' }];

	decodingMap.forEach(function (m) {
		code = code.replace(m.entity, m.char);
	});

	var withFunc = new Function('obj', ref, '\n\t\tlet { ' + Object.getOwnPropertyNames(obj).join(', ') + ' } = obj;\n\t\treturn (' + code + ');\n\t');

	return withFunc(obj, refData);
}

/** export the function */


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(13);



/** initialize templation */
var templation = new __WEBPACK_IMPORTED_MODULE_0____["a" /* Templation */]();
var component = templation.compile('app', 'user-template', __WEBPACK_IMPORTED_MODULE_1__data__["a" /* data */]);
component.render();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Templation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_container_class__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_compiler_class__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives__ = __webpack_require__(8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** import dependencies */





/**
 * @class Templation
 * Initializes and configures the Templation engine
 */

var Templation = function () {
	function Templation() {
		_classCallCheck(this, Templation);

		/** public properties */

		/** @public {DirectiveContainer} The directive container */
		this.directiveContainer = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_container_class__["a" /* DirectiveContainer */]();

		/** add the built-in directives */
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["b" /* crForDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["c" /* crIfDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["a" /* crClassDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["d" /* crOnDirective */]);
	}

	/** public methods */

	/** create new compiler */


	_createClass(Templation, [{
		key: 'compile',
		value: function compile(container, template, data) {
			/** create the compiler */
			var compiler = new __WEBPACK_IMPORTED_MODULE_2__classes_compiler_class__["a" /* Compiler */](container, template, data);
			compiler.setDirectiveContainer(this.directiveContainer);

			/** return the compiler */
			return compiler;
		}
	}]);

	return Templation;
}();

/** export Templation */




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectiveContainer; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class DirectiveContainer
 * Contains all the defined Directives and allows for managing them
 */
var DirectiveContainer = function () {
	function DirectiveContainer() {
		_classCallCheck(this, DirectiveContainer);

		/** public properties */

		/** @public {Directive[]} An array of Directive objects */
		this.directives = [];
	}

	/** public methods */

	/**
  * Get the directives
  * @return {Directive[]}
  */


	_createClass(DirectiveContainer, [{
		key: "getDirectives",
		value: function getDirectives() {
			return this.directives;
		}

		/**
   * Get a specific directive
   * @return {Directive}
   */

	}, {
		key: "getDirective",
		value: function getDirective(selector) {
			/** find the directive */
			var match = this.directives.find(function (dir) {
				return dir.selector === selector;
			});
			return match;
		}

		/**
   * Add a new directive
   * @param {Directive} directive A directive to add to the configured directives container
   * @return {DirectiveContainer}
   */

	}, {
		key: "addDirective",
		value: function addDirective(directive) {
			/** set the order and add to directives list */
			directive.setOrder(this.directives.length);
			this.directives.push(directive);

			/** return DirectiveContainer */
			return this;
		}

		/**
   * Remove a directive
   * @param {string} selector A name of a directive to remove
   * @return {DirectiveContainer}
   */

	}, {
		key: "removeDirective",
		value: function removeDirective(selector) {
			/** find the index of the directive */
			var index = this.directives.findIndex(function (dir) {
				return dir.selector === selector;
			});
			if (index >= 0) this.directives.splice(index, 1);

			/** return DirectiveContainer */
			return this;
		}

		/**
   * Set the order of a directive
   * @param {string} selector A name of a directive to reorder
   * @return {DirectiveContainer}
   */

	}, {
		key: "setDirectiveOrder",
		value: function setDirectiveOrder(selector, order) {
			/** find the matching directives */
			var index = this.directives.findIndex(function (dir) {
				return dir.selector === selector;
			});
			if (index >= 0) {
				/** set the order */
				this.directives[index].setOrder(order);

				/** add 1 to each directives over after this one */
				this.directives.forEach(function (dir, i) {
					if (i > index) dir.setOrder(dir.getOrder() + 1);
				});

				/** sort the directives */
				dirs.sort(function (a, b) {
					return a.order - b.order;
				});
			}

			/** return DirectiveContainer */
			return this;
		}
	}]);

	return DirectiveContainer;
}();

/** export the DirectiveContainer */




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Compiler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer_class__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__ = __webpack_require__(7);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** import dependencies */



/**
 * @class Compiler
 * Compile the given template and push into the container
 * @param {string | element} container The container for the compiled html
 * @param {string | element} template The template to use for compilation
 * @param {object} data The object used for binding data and methods
 */

var Compiler = function () {
	function Compiler(container, template, data) {
		var _this = this;

		_classCallCheck(this, Compiler);

		/** check container for string id, or element */
		if (typeof container === 'string') container = document.getElementById(container);

		/** check template for string id, or element */
		if (typeof template === 'string') template = document.getElementById(template);

		/** check the template for one and only one child */
		if (template.children.length > 1) throw 'The template must contain one root element.';

		/** public properties */

		/** @public {element} The container element */
		this.container = container;

		/** @public {element} The template element */
		this.template = template;

		/** @public {object} The data object that is used for binding data values and methods */
		this.data = data;

		/** private properties */

		/** @private {boolean} A boolean indicating whether compilation has been initiated once */
		var _initd = false;
		this.setInitd = function (initd) {
			_initd = initd;
			return _this;
		};
		this.initd = function () {
			return _initd;
		};

		/** @private {Observer} An instance of Observer that is watching data for us */
		var _observer = new __WEBPACK_IMPORTED_MODULE_0__observer_class__["a" /* Observer */](this.data, this.render, this);
		this.getObserver = function () {
			return _observer;
		};

		/** @private {DirectiveContainer} The DirectiveContainer object */
		var _directiveContainer = null;
		this.setDirectiveContainer = function (directiveContainer) {
			_directiveContainer = directiveContainer;
		};
		this.getDirectiveContainer = function () {
			return _directiveContainer;
		};

		/** empty the container */
		Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["b" /* emptyElement */])(this.container);
	}

	/** public methods */

	/** render out the processed template */


	_createClass(Compiler, [{
		key: 'render',
		value: function render() {
			/** get the template and inner html */
			var tempDOM = Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["a" /* createTemporaryDOM */])(this.template, this.data, this.getDirectiveContainer().getDirectives());

			/** set the app */
			Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["d" /* updateDOM */])(this.container, Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["e" /* virtualizeDOM */])(tempDOM.content.children[0]), this.initd() ? Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["e" /* virtualizeDOM */])(this.container.children[0]) : undefined);

			/** cycle through post directives */
			Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["c" /* parseDirectives */])(this.getDirectiveContainer().getDirectives().filter(function (dir) {
				return dir.isPost();
			}), this.container, this.data);

			/** set initd to true */
			this.setInitd(true);
		}
	}]);

	return Compiler;
}();

/** export Compiler */




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Observer
 * Recursively observes every property on an object
 * @param {object} obj The object to setup observance on
 * @param {function} callback The callback function to execute when the data has changed
 */
var Observer = function () {
	function Observer(obj, callback, compiler) {
		_classCallCheck(this, Observer);

		/** public properties */

		/** @public {object} The obj to observe */
		this.obj = obj;

		/** @public {function} The callback function to execute when the obj has changed */
		this.callback = callback.bind(compiler);

		/** start observing */
		this.observe(this.obj);
	}

	/**
  * @method Setup data observation on an object
  * @param {object} An object to observe
  * @returns {Directive}
  */


	_createClass(Observer, [{
		key: 'observe',
		value: function observe(obj) {
			/** check for array and observe */
			if (Array.isArray(obj) && !obj.hasOwnProperty('push')) this.observeArray(obj);

			/** for every property on the object setup observance */
			for (var prop in obj) {
				this.observeProp(obj, prop);
				if (_typeof(obj[prop]) === 'object') {
					this.observe(obj[prop]);
				}
			}
		}

		/** observe the value of a property on an object */

	}, {
		key: 'observeProp',
		value: function observeProp(obj, prop) {
			/** get a reference to this */
			var self = this;

			/** create getter / setter for firing callback on change */
			var value = obj[prop];
			Object.defineProperty(obj, prop, {
				get: function get() {
					return value;
				},
				set: function set(newValue) {
					/** set the value to the new value */
					value = newValue;

					/** setup observance */
					if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') self.observe(value);

					/** fire callback */
					self.callback();
				}
			});
		}

		/** observe an array for changes */

	}, {
		key: 'observeArray',
		value: function observeArray(arrayObj) {
			/** get a reference to this */
			var self = this;

			/** overwrite array methods */
			var arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];
			arrayMethods.forEach(function (m) {
				var _method = Array.prototype[m];
				Object.defineProperty(arrayObj, m, {
					configurable: false,
					enumerable: false,
					writable: false,
					value: function value() {
						/** get the result of the base array function */
						var result = _method.apply(this, arguments);

						/** setup observance on the new value */
						self.observe(this);

						/** fire callback */
						self.callback();

						/** return the result */
						return result;
					}
				});
			});
		}
	}]);

	return Observer;
}();

/** export the class */




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createTemporaryDOM; });
/* unused harmony export templater */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return virtualizeDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return updateDOM; });
/* unused harmony export hasChanged */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return parseDirectives; });
/* unused harmony export createElement */
/* unused harmony export isEventProp */
/* unused harmony export setProp */
/* unused harmony export setProps */
/* unused harmony export removeProp */
/* unused harmony export updateProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return emptyElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__using_function__ = __webpack_require__(1);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** import functions */


/** create a temporary DOM object based on the template */
function createTemporaryDOM(template, data, directives) {
	/** create new template */
	var tempDOM = template.cloneNode(true);

	/** cycle through pre directives */
	parseDirectives(directives.filter(function (dir) {
		return dir.isPre();
	}), tempDOM.content, data);

	/** replace simple template values */
	templater(tempDOM, data);

	/** return the virtual DOM */
	return tempDOM;
}

/** return a function that can do template parsing */
function templater(template, data) {
	/** get the html */
	var html = template.innerHTML;

	/** set the pattern for replacement */
	var re = /{{\s?([\w\W]*?)\s?}}/gmi;

	/** cycle over matches */
	var match = void 0;
	while ((match = re.exec(html)) !== null) {
		/** catch exceptions */
		try {
			/** replace the values in the html and reset the lastIndex of the regex */
			html = html.replace(match[0], Object(__WEBPACK_IMPORTED_MODULE_0__using_function__["a" /* using */])(data, match[1]));
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
	var vElement = { type: element.nodeName, props: [], children: [], value: '' };
	if (['#text', '#comment'].includes(element.nodeName)) vElement.value = element.nodeValue;

	if (element.attributes) {
		for (var i = 0; i < element.attributes.length; i++) {
			var a = element.attributes[i];
			vElement.props.push({ 'name': a.name, 'value': a.value });
		}
	}

	if (element.childNodes) {
		element.childNodes.forEach(function (c) {
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
			var newDOMNode = createElement(newNode);
			parent.appendChild(newDOMNode);
		}
	} else if (!newNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if (hasChanged(newNode, oldNode)) {
		var _newDOMNode = createElement(newNode);
		parent.replaceChild(_newDOMNode, parent.childNodes[index]);
	} else if (newNode.type) {
		updateProps(parent.childNodes[index], newNode.props, oldNode.props);

		var newLength = newNode.children.length;
		var oldLength = oldNode.children.length;

		/** check for less new than old */
		if (newLength < oldLength) {
			/** get all the old elements that are past the new */
			var children = [];
			for (var i = newLength; i < oldLength; i++) {
				children.push(parent.childNodes[index].childNodes[i]);
			}

			/** remove old elements */
			children.forEach(function (c) {
				return parent.childNodes[index].removeChild(c);
			});
		}

		/** compare all new nodes */
		for (var _i = 0; _i < newLength; _i++) {
			updateDOM(parent.childNodes[index], newNode.children[_i], oldNode.children[_i], _i);
		}
	}
}

/** check to see if has changed */
function hasChanged(node1, node2) {
	return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || node1.type !== node2.type || ['#text', '#comment'].includes(node1.type) && node1.value !== node2.value;
}

/** find references to the given directives on the given element and parse */
function parseDirectives(dirs, element, data) {
	/** sort the directives */
	dirs.sort(function (a, b) {
		return a.order - b.order;
	});

	/** execute each directive */
	dirs.forEach(function (dir) {
		/** initialize the directive elements */
		var directiveElements = void 0;

		/** does the directive have sub selectors */
		if (dir.subSelectors.length > 0) {
			/** find all matches and process each */
			var joinedSubSelectors = dir.subSelectors.join('], [' + dir.selector + '\\:');
			var subSelectors = '[' + dir.selector + '\\:' + joinedSubSelectors + ']';

			/** find all elements that match and parse */
			directiveElements = element.querySelectorAll(subSelectors);
			directiveElements.forEach(function (el) {
				return dir.parser(dir, el, data);
			});
		} else {
			/** find in order and parse */
			while ((directiveElements = element.querySelector('[' + dir.selector + ']')) !== null) {
				dir.parser(dir, directiveElements, data);
			}
		}
	});
}

/** create a DOM element based on the virtual DOM node passed */
function createElement(node) {
	if (node.type === '#text') {
		return document.createTextNode(node.value);
	}
	if (node.type === '#comment') {
		return document.createComment(node.value);
	}
	var $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children.map(createElement).forEach($el.appendChild.bind($el));
	return $el;
}

/** check this property to see if it is an event property */
function isEventProp(prop) {
	return (/^cron:/.test(prop.name)
	);
}

/** set a target element's property value */
function setProp(target, prop) {
	target.setAttribute(prop.name, prop.value);
}

/** set multiple property values on a target element */
function setProps(target, props) {
	props.forEach(function (prop) {
		setProp(target, prop);
	});
}

/** remove a property from a target element */
function removeProp(target, prop) {
	target.removeAttribute(prop.name);
}

/** update the properties on a target element */
function updateProps(target, newProps, oldProps) {
	newProps.forEach(function (prop) {
		var match = oldProps.find(function (p) {
			return p.name === prop.name;
		});
		if (match) {
			if (match.value !== prop.value) setProp(target, prop); // update
		} else {
			if (!isEventProp(prop)) {
				setProp(target, prop); // add new
			}
		}
	});
	oldProps.forEach(function (prop) {
		var match = newProps.find(function (p) {
			return p.name === prop.name;
		});
		if (!match) {
			removeProp(target, prop);
		}
	});
}

/** empty an element of all children */
function emptyElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
};

/** export the DOM related functions */


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crfor_directive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crif_directive__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crclass_directive__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cron_directive__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__crfor_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__crif_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__crclass_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__cron_directive__["a"]; });
/** import directives */





/** re-export */


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crForDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/** import dependencies */


/** create the directive */
var crForDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crFor', forIterator);

/** export the directive */


/** define the directive parser function */
function forIterator(directive, forElement, data) {
	/** get the for attribute value expression */
	var forAttrVal = forElement.getAttribute(directive.selector).split(' ');
	var entityRef = forAttrVal[0];
	var entityProp = forAttrVal[2];

	/** cycle over the property */
	var forHTML = '';

	var getDataProperty = new Function('obj', '\n\t\treturn (obj.' + entityProp + ');\n\t');

	/** check the entityProperty type */
	var dataProperty = getDataProperty(data);
	if (Array.isArray(dataProperty)) {
		dataProperty.forEach(function (row, i) {
			/** add html for the iteration */
			var rowEl = forElement.cloneNode(true);
			rowEl.removeAttribute(directive.selector);
			var rowHTML = rowEl.outerHTML;

			/** get the row properties */
			var rowProps = Object.getOwnPropertyNames(row);
			if (rowProps.length > 0) {
				rowProps.forEach(function (p) {
					rowHTML = rowHTML.replace(entityRef + '.', entityProp + '[' + i + '].');
				});
			}

			/** create regular expression to match the entityRef */
			var re = new RegExp('([^\\w])(' + entityRef + '\\b)([^\\w])', 'gmi'); // /([^\w])(n\b)([^/w])/gmi
			var match = void 0;
			while ((match = re.exec(rowHTML)) !== null) {
				try {
					var replacement = '' + match[1] + entityProp + '[' + i + ']' + match[3];
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

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crIfDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** create the directive */
var crIfDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crIf', ifCheck);

/** export the directive */


/** define the directive parser function */
function ifCheck(directive, ifElement, data) {
	/** get the for attribute value expression, and remove the attribute */
	var ifAttrVal = ifElement.getAttribute(directive.selector);
	ifElement.removeAttribute(directive.selector);

	/** evaluate the expression */
	if (Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, ifAttrVal) === false) {
		ifElement.parentNode.removeChild(ifElement);
	}
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crClassDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** create the directive */
var crClassDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crClass', classCheck);

/** export the directive */


/** define the directive parser function */
function classCheck(directive, classElement, data) {
	/** get the attribute value expression, and remove the attribute */
	var classAttrVal = classElement.getAttribute(directive.selector);
	classElement.removeAttribute(directive.selector);

	/** get the current class list */
	var classList = [];
	for (var i = 0; i < classElement.classList.length; i++) {
		classList.push(classElement.classList[i]);
	}

	/** evaluate the expression */
	var classObj = Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, classAttrVal);

	/** create internal class check function */
	var hasClass = function hasClass(className) {
		return classList.includes(className);
	};

	/** add/remove classes */
	Object.keys(classObj).forEach(function (key) {
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

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crOnDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** an array of event names to look for in the crOn event directive */
var eventTypes = [
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
'touchcancel', 'touchend', 'touchmove', 'touchstart'];

/** create the directive */
var crOnDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crOn', eventAttach).setSubSelectors(eventTypes).setPre(false).setPost(true);

/** export the directive */


/** define the directive parser function */
function eventAttach(directive, element, data) {
	/** initialize the selector */
	var selector = '' + directive.selector.toLowerCase();
	if (directive.subSelectors.length > 0) selector += ':';

	/** get all attributes */
	var eventAttr = '';
	var eventName = '';
	for (var a = 0; a < element.attributes.length; a++) {
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
		var eventFunc = function eventFunc() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, elementAttrVal);
		};

		/** remove and re-add the event listener */
		element.removeEventListener(eventName, eventFunc);
		element.addEventListener(eventName, eventFunc);

		/** remove the attribute */
		element.removeAttribute(eventAttr);
	}
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return data; });
/** setup data */
var data = {
	count: 2,
	users: [{ 'id': 0, 'name': 'John Doe', age: 38, selected: true, test: [1, 2, 3] }, { 'id': 1, 'name': 'Jane Doe', age: 38, selected: true, test: [4, 5, 6] }, { 'id': 2, 'name': 'Billy Doe', age: 14, selected: true, test: [7, 8, 9] }, { 'id': 3, 'name': 'Samantha Doe', age: 12, selected: true, test: [10, 11, 12] }, { 'id': 4, 'name': 'Jeremiah Doe', age: 11, selected: true, test: [13, 14, 15] }, { 'id': 5, 'name': 'Susie Doe', age: 9, selected: false, test: [16, 17, 18] }, { 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21] }, { 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }],
	testFunc: function testFunc(message) {
		return message;
	},
	testFunc2: function testFunc2(num) {
		alert(num);
	},
	testFunc3: function testFunc3(message) {
		alert(message);
	},
	addUser: function addUser(name, age) {
		data.users.push({
			id: data.users.length,
			name: name,
			age: age,
			selected: true,
			test: [1, 2, 3]
		});
	},
	modifyUser: function modifyUser(user) {
		var newName = prompt('What would you like the new name to be?');
		user.name = newName;
	},
	changeUsers: function changeUsers() {
		data.users = [{ 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21] }, { 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }];
	},
	toggleVisibility: function toggleVisibility(user) {
		user.selected = !user.selected;
	}
};



/***/ })
/******/ ]);