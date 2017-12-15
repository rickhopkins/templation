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
function eventAttach(details, element, data) {
	/** create the event function */
	let eventFunc = function() {
		return using(data, details.value);
	};

	/** remove and re-add the event listener */
	element.removeEventListener(details.subSelector, eventFunc);
	element.addEventListener(details.subSelector, eventFunc);
}