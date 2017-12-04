import  SpendatureCategory from './SpendatureCategory.js';
import  expect from 'expect';

describe('Spendature Category', () => {

	it('Should have a category', () => {
		let spendature = new SpendatureCategory('category', 0);
		expect(spendature.category).toBe('category');
	});
    
	it('Should have a monthly value', () => {
		let spendature = new SpendatureCategory('category', 15);
		expect(spendature.monthlyValue).toBe(15);
	});
    
	it('Should have a yearly value', () => {
		let spendature = new SpendatureCategory('category', 15);
		expect(spendature.yearlyValue).toBe(15 * 12);
	});
});