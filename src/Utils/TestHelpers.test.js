import expect from 'expect';
import SpendatureCategory from './SpendatureCategory';
import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';

const defaultSpendatures = [new SpendatureCategory('Restaurants', 200),
	new SpendatureCategory('Groceries', 300),
	new SpendatureCategory('Air Travel', 50),
	new SpendatureCategory('Other Travel', 50),
	new SpendatureCategory('Gas', 80),
	new SpendatureCategory('Amazon', 200),
	new SpendatureCategory('Misc', 800)];
const defaultMonthlyTransactions = 50;

let MockCreditCard = {
	Institution: 'Amex',
	Name: 'Everyday',
	RewardType: 'Points',
	RewardCategories: [
		{
			Name: 'Restaurants',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Groceries',
			Factor: 2,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Air Travel',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Other Travel',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Gas',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		},
		{
			Name: 'Amazon',
			Factor: 1,
			Cap: 0,
			Bonus: 0
		}
	],
	BaseFactor: 1,
	BaseBonus: 0,
	PointValue: 0.01,
	BonusReward: 20,
	BonusRewardMinTransaction: 20,
	WelcomeBonus: 100.00,
	TravelBonus: 0,
	AnnualFeeYearOne: 0,
	AnnualFeeYearOnePlus: 0,
	RewardOneYear: 0,
	RewardTwoYears: 0,
	RewardFiveYears: 0
};

const testRewardCategory = (rewardCategory, expectedValues, baseFactor, pointValue, spendatureCategory) => {

	it(`should have a factor of ${expectedValues.Factor}`, () => {
		expect(rewardCategory.Factor).toBe(expectedValues.Factor);
	});

	it(`should have a cap of ${expectedValues.Cap}`, () => {
		expect(rewardCategory.Cap).toBe(expectedValues.Cap);
	});

	it(`should calculate a bonus of ${expectedValues.Bonus}`, async () => {
		const bonus = await calcCategoryBonus(spendatureCategory.monthlyValue, spendatureCategory.yearlyValue, rewardCategory.Cap, rewardCategory.Factor,
			pointValue, baseFactor);
		expect(bonus).toBe(expectedValues.Bonus);
	});
};

const testCreditCard = (creditCard, expectedValues) => {
	it(`should have an institution named ${expectedValues.Institution}`, () => {
		expect(creditCard.Institution).toBe(expectedValues.Institution);
	});

	it(`should be named ${expectedValues.Name}`, () => {
		expect(creditCard.Name).toBe(expectedValues.Name);
	});

	it(`should have a reward type of ${expectedValues.RewardType}`, () => {
		expect(creditCard.RewardType).toBe(expectedValues.RewardType);
	});

	it(`should have a base factor of ${expectedValues.BaseFactor}`, () => {
		expect(creditCard.BaseFactor).toBe(expectedValues.BaseFactor);
	});

	it(`should have a point value of ${expectedValues.PointValue}`, () => {
		expect(creditCard.PointValue).toBe(expectedValues.PointValue);
	});

	it(`should have a bonuse reward of ${expectedValues.BonusReward}`, () => {
		expect(creditCard.BonusReward).toBe(expectedValues.BonusReward);
	});

	it(`should have a Bonus Reward Min Transaction of ${expectedValues.BonusRewardMinTransaction}`, () => {
		expect(creditCard.BonusRewardMinTransaction).toBe(expectedValues.BonusRewardMinTransaction);
	});

	it(`should have a Welcome Bonus of ${expectedValues.WelcomeBonus}`, () => {
		expect(creditCard.WelcomeBonus).toBe(expectedValues.WelcomeBonus);
	});

	it(`should have a travel bonus of ${expectedValues.TravelBonus}`, () => {
		expect(creditCard.TravelBonus).toBe(expectedValues.TravelBonus);
	});

	it(`should have an Annual Fee Year One of ${expectedValues.AnnualFeeYearOne}`, () => {
		expect(creditCard.AnnualFeeYearOne).toBe(expectedValues.AnnualFeeYearOne);
	});

	it(`should have an Annual Fee Year One Plus of ${expectedValues.AnnualFeeYearOnePlus}`, () => {
		expect(creditCard.AnnualFeeYearOnePlus).toBe(expectedValues.AnnualFeeYearOnePlus);
	});

	it(`should have a calculated base bonus of ${expectedValues.BaseBonus}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		expect(baseBonus).toBe(expectedValues.BaseBonus);
	});

	it(`should have a calculated monthly reward value of ${expectedValues.MonthlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		expect(monthlyRewardValue).toBe(expectedValues.MonthlyRewardValue);
	});

	it(`should have a calculated yearly reward value of ${expectedValues.YearlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		expect(yearlyRewardValue).toBe(expectedValues.YearlyRewardValue);
	});

	it(`should have an annual reward total of ${expectedValues.AnnualRewardTotal}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		expect(annualRewardTotal).toBe(expectedValues.AnnualRewardTotal);
	});

	it(`should have a reward year one of ${expectedValues.RewardYearOne}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		expect(rewardYearOne).toBe(expectedValues.RewardYearOne);
	});

	it(`should have a reward year two of ${expectedValues.RewardYearTwo}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		
		const rewardYearTwo = await calcRewardTwoYears(rewardYearOne, annualRewardTotal, creditCard.AnnualFeeYearOnePlus);
		expect(rewardYearTwo).toBe(expectedValues.RewardYearTwo);
	});

	it(`should have a reward year five of ${expectedValues.RewardYearFive}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(defaultSpendatures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(defaultMonthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		
		const rewardYearFive = await calcRewardFiveYears(rewardYearOne, annualRewardTotal, creditCard.AnnualFeeYearOnePlus);
		
		expect(rewardYearFive).toBe(expectedValues.RewardYearFive);
	});

	describe('Reward Categories', () => {
		
		describe('Reward Category Restaurants', () => {
			let restuarants = creditCard.RewardCategories.filter(category => category.Name === 'Restaurants')[0];
			let restaurantValues = expectedValues.RewardCategories.filter(category => category.Name === 'Restaurants')[0];
			testRewardCategory(restuarants, restaurantValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[0]);
		});
		
		describe('Reward Category Groceries', () => {
			let groceries = creditCard.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			let groceryValues = expectedValues.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			testRewardCategory(groceries, groceryValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[1]);
		});
		
		describe('Reward Category Air Travel', () => {
			let airTravel = creditCard.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			let airTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			testRewardCategory(airTravel, airTravelValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[2]);
		});
		
		describe('Reward Category Other Travel', () => {
			let otherTravel = creditCard.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			let otherTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			testRewardCategory(otherTravel, otherTravelValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[3]);
		});
		
		describe('Reward Category Gas', () => {
			let gas = creditCard.RewardCategories.filter(category => category.Name === 'Gas')[0];
			let gasValues = expectedValues.RewardCategories.filter(category => category.Name === 'Gas')[0];
			testRewardCategory(gas, gasValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[4]);
		});
		
		describe('Reward Category Amazon', () => {
			let amazon = creditCard.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			let amazonValues = expectedValues.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			testRewardCategory(amazon, amazonValues, creditCard.BaseFactor, creditCard.PointValue, defaultSpendatures[5]);
		});
	});
};

export { MockCreditCard, testCreditCard };