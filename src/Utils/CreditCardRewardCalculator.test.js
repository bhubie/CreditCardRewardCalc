import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';
import expect from 'expect';
import SpendatureCategory from './SpendatureCategory';
import { MockCreditCard } from './TestHelpers.test.js';


let spendatures = [new SpendatureCategory('Restaurants', 200),
	new SpendatureCategory('Groceries', 300),
	new SpendatureCategory('Air Travel', 50),
	new SpendatureCategory('Other Travel', 50),
	new SpendatureCategory('Gas', 80),
	new SpendatureCategory('Amazon', 200),
	new SpendatureCategory('Misc', 800)];
    
describe('CreditCardRewardCalculator.js test', () => {
	describe('calcCategoryBonus', () => {
		it('should calculate a bonus of 2 when there is no category cap', () =>

			/*
			const categoryBonus = calcCategoryBonus(spendatures[0].monthlyValue,
				spendatures[0].yearlyValue,
				MockCreditCard.RewardCategories[0].Cap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor);
            
			expect(categoryBonus).toBe(2);
			*/
			 calcCategoryBonus(spendatures[0].monthlyValue,
				spendatures[0].yearlyValue,
				MockCreditCard.RewardCategories[0].Cap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor)
				.then((categoryBonus) => {
					expect(categoryBonus).toBe(2);
				})
		);
	
		it('should calculate a bonus of 2 when there is a category cap and the yearly category value is less than the cap', () => {

			/*
			const categoryCap = 15000;
			const categoryBonus = calcCategoryBonus(spendatures[0].monthlyValue,
				spendatures[0].yearlyValue,
				categoryCap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor);
			expect(categoryBonus).toBe(2);
			*/

			const categoryCap = 15000;
			return calcCategoryBonus(spendatures[0].monthlyValue,
				spendatures[0].yearlyValue,
				categoryCap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor)
				.then((categoryBonus) => {
					expect(categoryBonus).toBe(2);
				});
		});
        
		//TODO Calcualte and fix bonus test
		it('should calculate a bonus of x when there is a category cap and the yearly category value is greater than the cap', () => {
			const categoryCap = 6000;
			const yearlyValue = 8400;
			//const categoryBonus = 
			return calcCategoryBonus(700,
				yearlyValue,
				categoryCap,
				3,
				.01,
				1)
				.then((categoryBonus) => {
					expect(categoryBonus).toBe(17);
				});
		});

	});

	describe('calcBaseBonus', () => {
		it('should return a base bonus of 8', () =>
			//const baseBonus = 
			calcBaseBonus(MockCreditCard.BaseFactor, MockCreditCard.PointValue, spendatures[6].monthlyValue)
				.then((baseBonus) => {
					expect(baseBonus).toBe(8);
				})
		);
	});

	describe('calcMonthlyRewardValue', () => {
		it('should return a value of 19.80', () => {
			const mockBonus = [1, 2, 5, .80, 0, 3];
			//const MonthlyRewardValue = 
			return calcMonthlyRewardValue(mockBonus, 8)
				.then((monthlyRewardValue) => {
					expect(monthlyRewardValue).toBe(19.80);
				});
		});
	});

	describe('calYearlyRewardValue', () => {
		it('should return a value of 237.60', () => {
			const mockBonus = [1, 2, 5, .80, 0, 3];
			//const monthlyRewardValue = 
			//const yearlyRewardValue =
			return calcMonthlyRewardValue(mockBonus, 8)
				.then((monthlyRewardValue) => calcYearlyRewardValue(monthlyRewardValue))
				.then((yearlyRewardValue) => {
					expect(yearlyRewardValue).toBe(237.60);
				});
		});
	});

	
	describe('setRewardCategoryBonuses', () => {
		it('should return an array of bonuses with the correct bonus value assigned for each reward category', () => {
			return setRewardCategoryBonuses(spendatures, MockCreditCard.RewardCategories, MockCreditCard.PointValue, MockCreditCard.BaseFactor)
				.then((rewardCategories) => {
					expect(rewardCategories[0].Bonus).toBe(2); //Restaurants
					expect(rewardCategories[1].Bonus).toBe(6); //Groceries
					expect(rewardCategories[2].Bonus).toBe(.50); //Air Travel
					expect(rewardCategories[3].Bonus).toBe(.50); //Other Travel
					expect(rewardCategories[4].Bonus).toBe(.80); //Gas
					expect(rewardCategories[5].Bonus).toBe(2); //Amazon	
				});
		});
	});

	
	describe('calcAnnualRewardValue', () => {

		it('should return an annual reward value of 285.12 when monthly transactions is greater than credit card min transactions', () => {
			//const annualRewardValue = 
			  return calcAnnualRewardValue(50, 20, 237.60, .2, 0)
				.then((annualRewardValue) => {
					expect(annualRewardValue).toBe(285.12);
				});
		});

		it('should return an annual reward value of 247.60 when monthly transactions is less than credit card min transactions', () => {
			//const annualRewardValue = 
			return  calcAnnualRewardValue(10, 20, 237.60, .2, 10)
				.then((annualRewardValue) => {
					expect(annualRewardValue).toBe(247.60);
				});
		});
	});

	
	describe('calcRewardYearOne', () => {
		it('should return an annual reward year one of 50', () => {
			//const rewardYearOne = 
			 return calcRewardOneYear(50, 50, 50)
				.then((rewardYearOne) => {
					expect(rewardYearOne).toBe(50);
				});
		});
	});

	
	describe('calcRewardTwoYears', () => {
		it('should return a reward two year value of 40', () => {
			//const rewardYearTwo = 
			return calcRewardTwoYears(50, 50, 60)
				.then((rewardYearTwo) => {
					expect(rewardYearTwo).toBe(40);
				});
			
		});
	});

	describe('calcRewardFiveYears', () => {
		it('should return a reward five year value of 40', () =>
			 calcRewardFiveYears(50, 50, 60)
				.then((rewardYearFive) => {
					expect(rewardYearFive).toBe(10);
				})
		);
	});
});

