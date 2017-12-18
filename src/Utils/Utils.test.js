import { formatAsCurrency } from './Utils.js';
import expect from 'expect';

describe('formatAsDollar function', () => {
	it('should return the number formatted as currency', () => {
		const formattedNumber = formatAsCurrency(100000500.1);
		expect(formattedNumber).toBe('$100,000,500.10');
	});
    
	it('should return the value unmodified if the passed in value is not a number', () => {
		const results = formatAsCurrency('Not A Number');
		expect(results).toBe('Not A Number');
	});
});