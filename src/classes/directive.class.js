/**
 * @class Directive
 * Defines a directive that Templation will search for in the template and parse
 * @param {string} selector The selector that will be used in the directive (ex: crFor)
 * @param {function} parser The function that will be executed for the directive. The parser receives a reference to the directive, the effected element, and the associated data
 */
class Directive {
	constructor(selector, parser) {
		/** public properties */

		/** @public {string} The selector name for the directive */
		this.selector = selector;
		
		/** @public {function} The function that is executed for the directive */
		this.parser = parser;
	
		/** @public {string[]} An array of sub selectors. Referenced by using a colon (:) after the main selector (ex: crOn:click) */
		this.subSelectors = [];
	
		/** private properties */

		/** @private {number} A number indicating the order in which the directive should be processed */
		let _order = 0;
		this.setOrder = (order) => {
			_order = order;
			return this;
		};
		this.getOrder = () => { return _order; };
		
		/** @private {boolean} A boolean indicating if this directive should be processed before DOM insertion */
		let _pre = true;
		this.setPre = (pre) => {
			_pre = pre;
			return this;
		};
		this.isPre = () => { return _pre; };

		/** @private {boolean} A boolean indicating if this directive should be processed after DOM insertion */
		let _post = true;
		this.setPost = (post) => {
			_post = post;
			return this;
		};
		this.isPost = () => { return _post; };
	}

	/** public methods */

	/**
	 * @method Set the sub selectors
	 * @param {string[]} An array of strings to function as sub selectors
	 * @returns {Directive}
	 */
	setSubSelectors(subSelectors) {
		this.subSelectors = subSelectors;
		return this;
	}
}

/** export Directive */
export { Directive };