import { formatAsDollar } from './Utils.js';
import expect from 'expect';

describe('formatAsDollar function', () => {
	it('should return the number formatted with 2 decimal places and a dollar sign', () => {
		const formattedNumber = formatAsDollar(100.1);
		expect(formattedNumber).toBe('$100.10');
	});
    
	it('should return the value unmodified if the passed in value is not a number', () => {
		const results = formatAsDollar('Not A Number');
		expect(results).toBe('Not A Number');
	});
});