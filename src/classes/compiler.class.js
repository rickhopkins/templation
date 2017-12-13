/** import dependencies */
import { Observer } from './observer.class';
import { emptyElement, createTemporaryDOM, virtualizeDOM, parseDirectives, updateDOM } from '../functions/dom.functions';

/**
 * @class Compiler
 * Compile the given template and push into the container
 * @param {string | element} container The container for the compiled html
 * @param {string | element} template The template to use for compilation
 * @param {object} data The object used for binding data and methods
 */
class Compiler {
	constructor(container, template, data) {
		/** check container for string id, or element */
		if (typeof container === 'string') container = document.getElementById(container);
	
		/** check template for string id, or element */
		if (typeof template === 'string') template = document.getElementById(template);
	
		/** check the template for one and only one child */
		if (template.nodeName !== 'TEMPLATE') throw 'The template should be a template element (<template>)';
		if (template.content.children.length !== 1) throw 'The template must contain one root element.';

		/** public properties */

		/** @public {element} The container element */
		this.container = container;
	
		/** @public {element} The template element */
		this.template = template;
	
		/** @public {object} The data object that is used for binding data values and methods */
		this.data = data;

		/** private properties */

		/** @private {boolean} A boolean indicating whether compilation has been initiated once */
		let _initd = false;
		this.setInitd = (initd) => {
			_initd = initd;
			return this;
		};
		this.initd = () => { return _initd; };

		/** @private {Observer} An instance of Observer that is watching data for us */
		let _observer = new Observer(this.data, this.render, this)
		this.getObserver = () => { return _observer; };

		/** @private {DirectiveContainer} The DirectiveContainer object */
		let _directiveContainer = null;
		this.setDirectiveContainer = (directiveContainer) => { _directiveContainer = directiveContainer; };
		this.getDirectiveContainer = () => { return _directiveContainer; };

		/** empty the container */
		emptyElement(this.container);
	}

	/** public methods */

	/** render out the processed template */
	render() {
		/** get the template and inner html */
		const tempDOM = createTemporaryDOM(this.template, this.data, this.getDirectiveContainer().getDirectives());

		/** set the app */
		updateDOM(this.container, virtualizeDOM(tempDOM.content.children[0]), this.initd() ? virtualizeDOM(this.container.children[0]) : undefined);
		
		/** cycle through post directives */
		parseDirectives(this.getDirectiveContainer().getDirectives().filter(dir => dir.isPost()), this.container, this.data);

		/** set initd to true */
		this.setInitd(true);
	}
}

/** export Compiler */
export { Compiler };