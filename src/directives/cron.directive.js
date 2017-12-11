/** import dependencies */
import { Directive } from '../classes/directive.class';
import { using } from '../functions/using.function';

/** an array of event names to look for in the crOn event directive */
const eventTypes = [
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

/** create the directive */
const crOnDirective = new Directive('crOn', eventAttach)
	.setSubSelectors(eventTypes)
	.setPre(false)
	.setPost(true)

/** export the directive */
export { crOnDirective };

/** define the directive parser function */
function eventAttach(directive, element, data) {
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