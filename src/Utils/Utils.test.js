import { formatAsCurrency, defaultSpendatures, defaultMonthlyTransactions } from './Utils.js';
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

describe('defaultSpendatures', () => {
	it('should return the correct default categories and values', () => {
		
		expect(defaultSpendatures[0]).toEqual({"category": "Restaurants", "monthlyValue": 200, "yearlyValue": 2400});
		expect(defaultSpendatures[1]).toEqual({"category": "Groceries", "monthlyValue": 300, "yearlyValue": 3600});
		expect(defaultSpendatures[2]).toEqual({"category": "Air Travel", "monthlyValue": 50, "yearlyValue": 600});
		expect(defaultSpendatures[3]).toEqual({"category": "Other Travel", "monthlyValue": 50, "yearlyValue": 600});
		expect(defaultSpendatures[4]).toEqual({"category": "Gas", "monthlyValue": 80, "yearlyValue": 960});
		expect(defaultSpendatures[5]).toEqual({"category": "Amazon", "monthlyValue": 200, "yearlyValue": 2400});
		expect(defaultSpendatures[6]).toEqual({"category": "Misc", "monthlyValue": 800, "yearlyValue": 9600});
	});
});

describe('defaultMonthlyTransactions', () => {
	it('should return a value of 50', () => {
		expect(defaultMonthlyTransactions).toBe(50);
	});
});