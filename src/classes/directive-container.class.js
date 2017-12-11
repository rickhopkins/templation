/**
 * @class DirectiveContainer
 * Contains all the defined Directives and allows for managing them
 */
class DirectiveContainer {
	constructor() {
		/** public properties */

		/** @public {Directive[]} An array of Directive objects */
		this.directives = [];
	}

	/** public methods */

	/**
	 * Get the directives
	 * @return {Directive[]}
	 */
	getDirectives() {
		return this.directives;
	}

	/**
	 * Get a specific directive
	 * @return {Directive}
	 */
	getDirective(selector) {
		/** find the directive */
		let match = this.directives.find(dir => dir.selector === selector);
		return match;
	}

	/**
	 * Add a new directive
	 * @param {Directive} directive A directive to add to the configured directives container
	 * @return {DirectiveContainer}
	 */
	addDirective(directive) {
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
	removeDirective(selector) {
		/** find the index of the directive */
		let index = this.directives.findIndex(dir => dir.selector === selector);
		if (index >= 0) this.directives.splice(index, 1);

		/** return DirectiveContainer */
		return this;
	}

	/**
	 * Set the order of a directive
	 * @param {string} selector A name of a directive to reorder
	 * @return {DirectiveContainer}
	 */
	setDirectiveOrder(selector, order) {
		/** find the matching directives */
		let index = this.directives.findIndex(dir => dir.selector === selector);
		if (index >= 0) {
			/** set the order */
			this.directives[index].setOrder(order);

			/** add 1 to each directives over after this one */
			this.directives.forEach((dir, i) => {
				if (i > index) dir.setOrder(dir.getOrder() + 1);
			});

			/** sort the directives */
			dirs.sort(function(a, b) {
				return a.order - b.order;
			});
		}

		/** return DirectiveContainer */
		return this;
	}
}

/** export the DirectiveContainer */
export { DirectiveContainer };