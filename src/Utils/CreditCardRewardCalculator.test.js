import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears, getTopCard, calcCreditCardRewards, setBestCardObject } from './CreditCardRewardCalculator';
import expect from 'expect';
import ExpenditureCategory from './ExpenditureCategory';
import { MockCreditCard, MockCreditCarList } from './TestHelpers.js';
import {defaultExpenditures, defaultMonthlyTransactions } from './Utils.js';
import CreditCards from './CreditCards.json';



    
describe('CreditCardRewardCalculator.js test', () => {
	describe('calcCategoryBonus', () => {
		it('should calculate a bonus of 2 when there is no category cap', () => {

			const categoryBonus = calcCategoryBonus(defaultExpenditures[0].monthlyValue,
				defaultExpenditures[0].yearlyValue,
				MockCreditCard.RewardCategories[0].Cap,
				MockCreditCard.RewardCategories[0].Factor,
				MockCreditCard.PointValue,
				MockCreditCard.BaseFactor);

			expect(categoryBonus).toBe(2);
			
		});
	
		it('should calculate a bonus of 2 when there is a category cap and the yearly category value is less than the cap', () => {

			const categoryCap = 15000;
			const categoryBonus = calcCategoryBonus(defaultExpenditures[0].monthlyValue,
				defaultExpenditures[0].yearlyValue,
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
			calcBaseBonus(MockCreditCard.BaseFactor, MockCreditCard.PointValue, defaultExpenditures[6].monthlyValue);
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
			const rewardCategories = setRewardCategoryBonuses(defaultExpenditures, MockCreditCard.RewardCategories, MockCreditCard.PointValue, MockCreditCard.BaseFactor)
				
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

	describe('setBestCardObject', () => {
		it('should return the correct object based on the card passed in', async () => {
			const card = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const bestCard = setBestCardObject(card[0], 'Best Overall Card', 1);

			const results = {
				"CardType": "Points", 
				"Name": "American Express - Amex EveryDay®", 
				"Rank": 1, 
				"RankWording": "Best Overall Card", 
				"RewardFiveYears": 1525.6, 
				"RewardOneYear": 385.12, 
				"RewardTwoYear": 670.24
			};
			expect(bestCard).toEqual(results);
		});
	});

	describe('getTopCard', () => {
		it('should return a top card of capital one venture for top reward card year one', async () => {
			const creditCards = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const topCard = await getTopCard(creditCards, 'RewardOneYear', 1);
			expect(topCard.Name).toBe('Capital One® - Venture®');
		});

		it('should return a top card of capital one venture for top reward card year two', async () => {
			const creditCards = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const topCard = await getTopCard(creditCards, 'RewardTwoYears', 1);
			expect(topCard.Name).toBe('Capital One® - Venture®');
		});

		it('should return a top card of capital one venture for top reward card year five', async () => {
			const creditCards = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const topCard = await getTopCard(creditCards, 'RewardFiveYears', 1);
			expect(topCard.Name).toBe('Capital One® - Venture®');
		});

		it('should return the second best card when rank 2 is passed in', async () => {
			const creditCards = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const topCard = await getTopCard(creditCards, 'RewardFiveYears', 2);
			expect(topCard.Name).toBe('American Express - Hilton Honors');
		});

		it('should return the third best card when rank 3 is passed in', async () => {
			const creditCards = await calcCreditCardRewards(MockCreditCarList, defaultExpenditures, defaultMonthlyTransactions);
			const topCard = await getTopCard(creditCards, 'RewardFiveYears', 3);
			expect(topCard.Name).toBe('American Express - Starwood Preferred Guest®');
		});
	});
});

