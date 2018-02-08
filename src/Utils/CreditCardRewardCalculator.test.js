import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';
import expect from 'expect';
import ExpenditureCategory from './ExpenditureCategory';
import { MockCreditCard } from './TestHelpers.js';


let expenditures = [new ExpenditureCategory('Restaurants', 200),
	new ExpenditureCategory('Groceries', 300),
	new ExpenditureCategory('Air Travel', 50),
	new ExpenditureCategory('Other Travel', 50),
	new ExpenditureCategory('Gas', 80),
	new ExpenditureCategory('Amazon', 200),
	new ExpenditureCategory('Misc', 800)];
    
describe('CreditCardRewardCalculator.js test', () => {
	describe('calcCategoryBonus', () => {
		it('should calculate a bonus of 2 when there is no category cap', () => {

			const categoryBonus = calcCategoryBonus(expenditures[0].monthlyValue,
				expenditures[0].yearlyValue,
				MockCreditCard.RewardCategories[0].Cap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor);

			expect(categoryBonus).toBe(2);
			
		});
	
		it('should calculate a bonus of 2 when there is a category cap and the yearly category value is less than the cap', () => {

			const categoryCap = 15000;
			const categoryBonus = calcCategoryBonus(expenditures[0].monthlyValue,
				expenditures[0].yearlyValue,
				categoryCap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor);
			expect(categoryBonus).toBe(2);
		});
        
		it('should calculate a bonus of x when there is a category cap and the yearly category value is greater than the cap', () => {
			const categoryCap = 6000;
			const yearlyValue = 8400;
			const categoryBonus = calcCategoryBonus(700,
				yearlyValue,
				categoryCap,
				3,
				.01,
				1);
			expect(categoryBonus).toBe(17);		
		});

	});

	describe('calcBaseBonus', () => {
		it('should return a base bonus of 8', () => {
			const baseBonus = 
			calcBaseBonus(MockCreditCard.BaseFactor, MockCreditCard.PointValue, expenditures[6].monthlyValue);
			expect(baseBonus).toBe(8);	
		});
	});

	describe('calcMonthlyRewardValue', () => {
		it('should return a value of 19.80', () => {
			const mockBonus = [1, 2, 5, .80, 0, 3];
			const monthlyRewardValue = calcMonthlyRewardValue(mockBonus, 8);
				
			expect(monthlyRewardValue).toBe(19.80);
		});
	});

	describe('calYearlyRewardValue', () => {
		it('should return a value of 237.60', () => {
			const mockBonus = [1, 2, 5, .80, 0, 3];
			const monthlyRewardValue = calcMonthlyRewardValue(mockBonus, 8);
			const yearlyRewardValue = calcYearlyRewardValue(monthlyRewardValue);
				
			expect(yearlyRewardValue).toBe(237.60);	
		});
	});

	
	describe('setRewardCategoryBonuses', () => {
		it('should return an array of bonuses with the correct bonus value assigned for each reward category', () => {
			const rewardCategories = setRewardCategoryBonuses(expenditures, MockCreditCard.RewardCategories, MockCreditCard.PointValue, MockCreditCard.BaseFactor)
				
			expect(rewardCategories[0].Bonus).toBe(2); //Restaurants
			expect(rewardCategories[1].Bonus).toBe(6); //Groceries
			expect(rewardCategories[2].Bonus).toBe(.50); //Air Travel
			expect(rewardCategories[3].Bonus).toBe(.50); //Other Travel
			expect(rewardCategories[4].Bonus).toBe(.80); //Gas
			expect(rewardCategories[5].Bonus).toBe(2); //Amazon	
				
		});
	});

	
	describe('calcAnnualRewardValue', () => {

		it('should return an annual reward value of 285.12 when monthly transactions is greater than credit card min transactions', () => {
			const annualRewardValue = calcAnnualRewardValue(50, 20, 237.60, .2, 0);
				
			expect(annualRewardValue).toBe(285.12);
		});

		it('should return an annual reward value of 247.60 when monthly transactions is less than credit card min transactions', () => {
			const annualRewardValue = calcAnnualRewardValue(10, 20, 237.60, .2, 10);
				
			expect(annualRewardValue).toBe(247.60);
		});
	});

	
	describe('calcRewardYearOne', () => {
		it('should return an annual reward year one of 50', () => {
			const rewardYearOne = calcRewardOneYear(50, 50, 50);
				
			expect(rewardYearOne).toBe(50);	
		});
	});

	
	describe('calcRewardTwoYears', () => {
		it('should return a reward two year value of 40', () => {
			const rewardYearTwo = calcRewardTwoYears(50, 50, 60);
				
			expect(rewardYearTwo).toBe(40);
		});
	});

	describe('calcRewardFiveYears', () => {
		it('should return a reward five year value of 40', () => {
			const rewardYearFive = calcRewardFiveYears(50, 50, 60);
			expect(rewardYearFive).toBe(10);
		});
	});
});

