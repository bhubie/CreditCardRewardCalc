import expect from 'expect';
import { calcCategoryBonus, calcMonthlyRewardValue, setRewardCategoryBonuses, calcBaseBonus, calcYearlyRewardValue, calcAnnualRewardValue, calcRewardOneYear, calcRewardTwoYears, calcRewardFiveYears } from './CreditCardRewardCalculator';

const MockCreditCard = {
	Institution: "American Express",
	Name: "Amex EveryDay®",
	RewardType: "Points",
	RewardCategories: [
		{
			Name: "Restaurants",
			Factor: 1,
			Cap: 0
		},
		{
			Name: "Groceries",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Air Travel",
			Factor: 1,
			Cap: 0
		},
		{
			Name: "Other Travel",
			Factor: 1,
			Cap: 0
		},
		{
			Name: "Gas",
			Factor: 1,
			Cap: 0
		},
		{
			Name:  "Amazon",
			Factor: 1,
			Cap: 0
		}
	],
	BaseFactor: 1,
	PointValue: 0.01,
	BonusReward: 0.20,
	BonusRewardMinTransaction: 20,
	WelcomeBonus: 100.00,
	TravelBonus: 0,
	AnnualFeeYearOne: 0,
	AnnualFeeYearOnePlus: 0
};

const MockCreditCard2 =  {
	Institution: "Capital One®",
	Name: "Venture®",
	RewardType: "Airfare",
	RewardCategories: [
		{
			Name: "Restaurants",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Groceries",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Air Travel",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Other Travel",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Gas",
			Factor: 2,
			Cap: 0
		},
		{
			Name: "Amazon",
			Factor: 2,
			Cap: 0
		}
	],
	BaseFactor: 2,
	PointValue: 0.01,
	BonusReward: 0,
	BonusRewardMinTransaction: 0,
	WelcomeBonus: 500,
	TravelBonus: 0,
	AnnualFeeYearOne: 0,
	AnnualFeeYearOnePlus: 95
}

const MockCreditCard3 =  {
	Institution: "American Express",
	Name: "Hilton Honors",
	RewardType: "Hotel",
	RewardCategories: [
		{
			Name: "Restaurants",
			Factor: 5,
			Cap: 0
		},
		{
			Name: "Groceries",
			Factor: 5,
			Cap: 0
		},
		{
			Name: "Air Travel",
			Factor: 1,
			Cap: 0
		},
		{
			Name: "Other Travel",
			Factor: 7,
			Cap: 0
		},
		{
			Name: "Gas",
			Factor: 5,
			Cap: 0
		},
		{
			Name: "Amazon",
			Factor:1,
			Cap: 0
		}
	],
	BaseFactor: 1,
	PointValue: 0.006,
	BonusReward: 0,
	BonusRewardMinTransaction: 0,
	WelcomeBonus: 500,
	TravelBonus: 0,
	AnnualFeeYearOne: 0,
	AnnualFeeYearOnePlus: 0
};

const MockCreditCarList = [MockCreditCard, MockCreditCard2, MockCreditCard3];

const testRewardCategory = (rewardCategory, expectedValues, baseFactor, pointValue, expenditureCategory) => {

	it(`should have a factor of ${expectedValues.Factor}`, () => {
		expect(rewardCategory.Factor).toBe(expectedValues.Factor);
	});

	it(`should have a cap of ${expectedValues.Cap}`, () => {
		expect(rewardCategory.Cap).toBe(expectedValues.Cap);
	});

	it(`should calculate a bonus of ${expectedValues.Bonus}`, async () => {
		const bonus = await calcCategoryBonus(expenditureCategory.monthlyValue, expenditureCategory.yearlyValue, rewardCategory.Cap, rewardCategory.Factor,
			pointValue, baseFactor);
		expect(bonus).toBe(expectedValues.Bonus);
	});
};

const testCreditCard = (creditCard, expectedValues, expenditures, monthlyTransactions) => {
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
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		expect(baseBonus).toBe(expectedValues.BaseBonus);
	});

	it(`should have a calculated monthly reward value of ${expectedValues.MonthlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		expect(monthlyRewardValue).toBe(expectedValues.MonthlyRewardValue);
	});

	it(`should have a calculated yearly reward value of ${expectedValues.YearlyRewardValue}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		expect(yearlyRewardValue).toBe(expectedValues.YearlyRewardValue);
	});

	it(`should have an annual reward total of ${expectedValues.AnnualRewardTotal}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		expect(annualRewardTotal).toBe(expectedValues.AnnualRewardTotal);
	});

	it(`should have a reward year one of ${expectedValues.RewardYearOne}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		expect(rewardYearOne).toBe(expectedValues.RewardYearOne);
	});

	it(`should have a reward year two of ${expectedValues.RewardYearTwo}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction,
			yearlyRewardValue, creditCard.BonusReward, creditCard.TravelBonus);
		
		const rewardYearOne = await calcRewardOneYear(annualRewardTotal, creditCard.WelcomeBonus,
			creditCard.AnnualFeeYearOne);
		
		const rewardYearTwo = await calcRewardTwoYears(rewardYearOne, annualRewardTotal, creditCard.AnnualFeeYearOnePlus);
		expect(rewardYearTwo).toBe(expectedValues.RewardYearTwo);
	});

	it(`should have a reward year five of ${expectedValues.RewardYearFive}`, async () => {
		const baseBonus = await calcBaseBonus(creditCard.BaseFactor, creditCard.PointValue, expenditures[6].monthlyValue);
		
		creditCard.RewardCategories = await setRewardCategoryBonuses(expenditures, creditCard.RewardCategories
			,creditCard.PointValue, creditCard.BaseFactor);

		const monthlyRewardValue = await calcMonthlyRewardValue(creditCard.RewardCategories.map(category => category.Bonus), baseBonus);

		const yearlyRewardValue = await calcYearlyRewardValue(monthlyRewardValue);

		const annualRewardTotal = await calcAnnualRewardValue(monthlyTransactions, creditCard.BonusRewardMinTransaction,
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
			testRewardCategory(restuarants, restaurantValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[0]);
		});
		
		describe('Reward Category Groceries', () => {
			let groceries = creditCard.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			let groceryValues = expectedValues.RewardCategories.filter(category => category.Name === 'Groceries')[0];
			testRewardCategory(groceries, groceryValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[1]);
		});
		
		describe('Reward Category Air Travel', () => {
			let airTravel = creditCard.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			let airTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Air Travel')[0];
			testRewardCategory(airTravel, airTravelValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[2]);
		});
		
		describe('Reward Category Other Travel', () => {
			let otherTravel = creditCard.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			let otherTravelValues = expectedValues.RewardCategories.filter(category => category.Name === 'Other Travel')[0];
			testRewardCategory(otherTravel, otherTravelValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[3]);
		});
		
		describe('Reward Category Gas', () => {
			let gas = creditCard.RewardCategories.filter(category => category.Name === 'Gas')[0];
			let gasValues = expectedValues.RewardCategories.filter(category => category.Name === 'Gas')[0];
			testRewardCategory(gas, gasValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[4]);
		});
		
		describe('Reward Category Amazon', () => {
			let amazon = creditCard.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			let amazonValues = expectedValues.RewardCategories.filter(category => category.Name === 'Amazon')[0];
			testRewardCategory(amazon, amazonValues, creditCard.BaseFactor, creditCard.PointValue, expenditures[5]);
		});
	});
};

export { MockCreditCard, testCreditCard, MockCreditCard2, MockCreditCarList };