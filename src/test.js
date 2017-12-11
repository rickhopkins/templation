import { Templation } from './';
import { data } from '../data';

/** initialize templation */
let templation = new Templation();
let component = templation.compile('app', 'user-template', data);
component.render();