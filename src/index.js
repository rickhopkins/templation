/** import dependencies */
import { DirectiveContainer } from './classes/directive-container.class';
import { Directive } from './classes/directive.class';
import { Compiler } from './classes/compiler.class';
import { crForDirective, crIfDirective, crClassDirective, crOnDirective } from './directives';

/**
 * @class Templation
 * Initializes and configures the Templation engine
 */
class Templation {
	constructor() {
		/** public properties */

		/** @public {DirectiveContainer} The directive container */
		this.directiveContainer = new DirectiveContainer();

		/** add the built-in directives */
		this.directiveContainer.addDirective(crForDirective);
		this.directiveContainer.addDirective(crIfDirective);
		this.directiveContainer.addDirective(crClassDirective);
		this.directiveContainer.addDirective(crOnDirective);
	}

	/** public methods */

	/** create new compiler */
	compile(container, template, data) {
		/** create the compiler */
		const compiler = new Compiler(container, template, data);
		compiler.setDirectiveContainer(this.directiveContainer);

		/** return the compiler */
		return compiler;
	}
}

/** export Templation */
export { Templation };