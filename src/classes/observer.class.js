/**
 * @class Observer
 * Recursively observes every property on an object
 * @param {object} obj The object to setup observance on
 * @param {function} callback The callback function to execute when the data has changed
 */
class Observer {
	constructor(obj, callback, compiler) {
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
	observe(obj) {
		/** check for array and observe */
		if (Array.isArray(obj) && !obj.hasOwnProperty('push')) this.observeArray(obj);

		/** for every property on the object setup observance */
		for (let prop in obj) {
			this.observeProp(obj, prop);
			if (typeof obj[prop] === 'object') {
				this.observe(obj[prop]);
			}
		}
	}

	/** observe the value of a property on an object */
	observeProp(obj, prop) {
		/** get a reference to this */
		let self = this;

		/** create getter / setter for firing callback on change */
		let value = obj[prop];
		Object.defineProperty(obj, prop, {
			get () {
				return value;
			},
			set (newValue) {
				/** set the value to the new value */
				value = newValue;

				/** setup observance */
				if (typeof value === 'object') self.observe(value);

				/** fire callback */
				self.callback();
			}
		});
	}

	/** observe an array for changes */
	observeArray(arrayObj) {
		/** get a reference to this */
		let self = this;
		
		/** overwrite array methods */
		const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];
		arrayMethods.forEach(m => {
			const _method = Array.prototype[m];
			Object.defineProperty(arrayObj, m, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: function () {
					/** get the result of the base array function */
					let result = _method.apply(this, arguments);

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
}

/** export the class */
export { Observer };