import  ExpenditureCategory from './ExpenditureCategory.js';
import  expect from 'expect';

describe('Expenditure Category', () => {

	it('Should have a category', () => {
		let expenditure = new ExpenditureCategory('category', 0);
		expect(expenditure.category).toBe('category');
	});
    
	it('Should have a monthly value', () => {
		let expenditure = new ExpenditureCategory('category', 15);
		expect(expenditure.monthlyValue).toBe(15);
	});
    
	it('Should have a yearly value', () => {
		let expenditure = new ExpenditureCategory('category', 15);
		expect(expenditure.yearlyValue).toBe(15 * 12);
	});
});