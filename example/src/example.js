import { Templation } from '../../src';
import { data } from './data';

/** initialize templation */
let templation = new Templation();
let component = templation.compile('app', 'user-template', data);
component.render();